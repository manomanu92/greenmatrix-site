/**
 * Green Matrix — contact form backend.
 *
 * Receives a POST from the website's contact form, appends it as a row to the
 * bound Google Sheet, and emails a notification. No server required: Apps
 * Script runs inside the Google account that owns the Sheet.
 *
 * SETUP — see google-apps-script/README.md for the illustrated version.
 *   1. Create a Google Sheet, then Extensions → Apps Script.
 *   2. Paste this file over Code.gs and save.
 *   3. Project Settings → Script Properties, add:
 *        NOTIFY_EMAIL   the address that should receive enquiries
 *        SHARED_SECRET  (optional) any random string; see below
 *   4. Run `setup` once from the editor and accept the permission prompts.
 *   5. Deploy → New deployment → Web app
 *        Execute as:        Me
 *        Who has access:    Anyone
 *      Copy the /exec URL — that is PUBLIC_FORM_ENDPOINT.
 *
 * Re-deploy ("Manage deployments" → edit → Version: New) after any code change,
 * or the live URL keeps serving the old version.
 */

var SHEET_NAME = 'Enquiries';

var HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Subject',
  'Message',
  'Page',
  'User agent',
];

/**
 * Run this once from the editor to create the sheet, write the header row and
 * trigger the authorisation prompts.
 */
function setup() {
  var sheet = getSheet_();
  SpreadsheetApp.getUi === undefined
    ? null
    : Logger.log('Sheet ready: ' + sheet.getName());
  Logger.log('Notify email: ' + getProp_('NOTIFY_EMAIL', '(not set)'));
}

/** Health check — opening the /exec URL in a browser should show this. */
function doGet() {
  return json_({ ok: true, service: 'greenmatrix-contact' });
}

function doPost(e) {
  try {
    var data = parseBody_(e);

    // Honeypot: the form ships a hidden `_gotcha` field. Humans leave it empty.
    if (data._gotcha) {
      return json_({ ok: true, skipped: 'spam' });
    }

    // Optional shared secret, so only our own site can write rows.
    var secret = getProp_('SHARED_SECRET', '');
    if (secret && data.token !== secret) {
      return json_({ ok: false, error: 'unauthorised' }, 401);
    }

    var name = trim_(data.name);
    var email = trim_(data.email);
    var subject = trim_(data.subject);
    var message = trim_(data.message);

    if (!name || !email || !message) {
      return json_({ ok: false, error: 'missing required fields' }, 400);
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json_({ ok: false, error: 'invalid email' }, 400);
    }

    // Guard against a double submit (impatient click, browser retry) writing
    // the same enquiry twice.
    if (isDuplicate_(email, message)) {
      return json_({ ok: true, skipped: 'duplicate' });
    }

    var now = new Date();
    getSheet_().appendRow([
      now,
      name,
      email,
      subject,
      message,
      trim_(data.page),
      trim_(data.ua).slice(0, 300),
    ]);

    notify_({
      name: name,
      email: email,
      subject: subject,
      message: message,
      page: trim_(data.page),
      when: now,
    });

    return json_({ ok: true });
  } catch (err) {
    // Log the failure so a dropped enquiry is at least traceable.
    console.error(err && err.stack ? err.stack : err);
    return json_({ ok: false, error: 'server error' }, 500);
  }
}

/* -------------------------------------------------------------------------- */

function parseBody_(e) {
  if (!e) return {};

  // multipart/form-data and application/x-www-form-urlencoded land here.
  if (e.parameter && Object.keys(e.parameter).length) {
    return e.parameter;
  }

  // text/plain carrying JSON (used to dodge a CORS preflight).
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      return {};
    }
  }

  return {};
}

/**
 * True if the same sender sent the same message within DEDUPE_WINDOW_MS.
 * Uses the cache rather than re-reading the sheet, so it stays cheap.
 */
var DEDUPE_WINDOW_MS = 2 * 60 * 1000;

function isDuplicate_(email, message) {
  var cache = CacheService.getScriptCache();
  var key = 'dupe_' + Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, email + '|' + message)
  );

  if (cache.get(key)) return true;

  cache.put(key, '1', Math.round(DEDUPE_WINDOW_MS / 1000));
  return false;
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#22349E')
      .setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(5, 420);
  }

  return sheet;
}

function notify_(d) {
  var to = getProp_('NOTIFY_EMAIL', '');
  if (!to) {
    console.warn('NOTIFY_EMAIL script property is not set — no email sent.');
    return;
  }

  var subject = 'New website enquiry: ' + (d.subject || '(no subject)');

  var text = [
    'A new enquiry came in through greenmatrixsolar.com.',
    '',
    'Name:    ' + d.name,
    'Email:   ' + d.email,
    'Subject: ' + (d.subject || '—'),
    'Page:    ' + (d.page || '—'),
    'Time:    ' + d.when,
    '',
    'Message:',
    d.message,
    '',
    'Sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ].join('\n');

  var html =
    '<div style="font-family:Inter,Arial,sans-serif;color:#0E1424;line-height:1.6">' +
    '<p style="margin:0 0 16px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#747C93">New website enquiry</p>' +
    '<h2 style="margin:0 0 18px;color:#22349E">' + esc_(d.subject || '(no subject)') + '</h2>' +
    '<table cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:18px">' +
    row_('Name', esc_(d.name)) +
    row_('Email', '<a href="mailto:' + esc_(d.email) + '">' + esc_(d.email) + '</a>') +
    row_('Page', esc_(d.page || '—')) +
    row_('Time', esc_(String(d.when))) +
    '</table>' +
    '<div style="padding:14px 16px;background:#F7F8FC;border-left:4px solid #F5C400;border-radius:6px;white-space:pre-wrap">' +
    esc_(d.message) +
    '</div>' +
    '<p style="margin:20px 0 0;font-size:13px">' +
    '<a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '">Open the enquiries sheet</a></p>' +
    '</div>';

  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: text,
    htmlBody: html,
    name: 'Green Matrix website',
    replyTo: d.email,
  });
}

function row_(label, value) {
  return (
    '<tr><td style="padding:3px 18px 3px 0;color:#747C93">' + label +
    '</td><td style="padding:3px 0;font-weight:600">' + value + '</td></tr>'
  );
}

function getProp_(key, fallback) {
  var v = PropertiesService.getScriptProperties().getProperty(key);
  return v === null || v === '' ? fallback : v;
}

function trim_(v) {
  return v === undefined || v === null ? '' : String(v).trim();
}

function esc_(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json_(obj, status) {
  // Apps Script web apps always answer 200; the status rides in the payload.
  if (status) obj.status = status;
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
