# Contact form backend — Google Sheets + email

The website is static, so the contact form posts to a **Google Apps Script web app**
that lives inside your own Google account. It appends each enquiry as a row to a Google
Sheet and emails you a notification. No server, no hosting cost, no third-party service
holding your data.

```
  website form  ──POST──►  Apps Script /exec  ──►  Google Sheet (row appended)
                                             └──►  email notification to you
```

## One-time setup (about 5 minutes)

### 1. Create the Sheet

Make a new Google Sheet — call it something like *Green Matrix — Website Enquiries*.
The script creates and formats the `Enquiries` tab itself, so leave it empty.

### 2. Add the script

In that Sheet: **Extensions → Apps Script**. Delete the placeholder `myFunction`, paste
the whole of [`Code.gs`](./Code.gs), and save.

### 3. Set the script properties

**Project Settings** (gear icon) → **Script Properties** → *Add script property*:

| Property | Value |
| --- | --- |
| `NOTIFY_EMAIL` | the address that should receive enquiries |
| `SHARED_SECRET` | *(optional)* any random string — see [Locking it down](#locking-it-down) |

Without `NOTIFY_EMAIL` the row is still written, but no email goes out.

### 4. Authorise it

Back in the editor, pick `setup` from the function dropdown and press **Run**. Google will
ask for permission to manage the spreadsheet and send mail as you — that prompt is the
authorisation step, and it only appears once.

> Google shows *"This app isn't verified"* because it is your own private script. Choose
> **Advanced → Go to (project name)** to continue.

### 5. Deploy it

**Deploy → New deployment → Web app**:

| Setting | Value |
| --- | --- |
| Execute as | **Me** |
| Who has access | **Anyone** |

"Anyone" means anyone can POST to the URL — it does **not** make your Sheet public. The
script is the only thing that touches the Sheet, and it writes nothing but form fields.

Copy the **Web app URL** (it ends in `/exec`). Paste it into a browser: you should see
`{"ok":true,"service":"greenmatrix-contact"}`.

### 6. Point the site at it

Local development — create `.env` in the project root:

```
PUBLIC_FORM_ENDPOINT=https://script.google.com/macros/s/AKfy.../exec
```

GitHub Pages — **Settings → Secrets and variables → Actions → Variables**, add a variable
named `PUBLIC_FORM_ENDPOINT` with the same URL. The deploy workflow passes it into the build.

Then submit the form once and check that the row appears and the email arrives.

## Locking it down

The `/exec` URL is public, so anyone who finds it could POST to it. Three defences are
already in place:

- a **honeypot** field (`_gotcha`) that bots fill and people never see;
- a **duplicate guard** that drops the same message from the same address within two minutes;
- required-field and email-format validation, server side.

For one more layer, set a `SHARED_SECRET` script property and a matching
`PUBLIC_FORM_TOKEN` build variable. The script then rejects any POST without it. Note this
is obfuscation, not real authentication — the token ships in the page source, so it stops
drive-by spam, not a determined attacker. If you start getting junk, the better fix is a
CAPTCHA or moving to a managed form service.

## After changing `Code.gs`

A deployment is pinned to a version. Edits do not go live until you
**Deploy → Manage deployments → ✏️ → Version: New version → Deploy**. The URL stays the same.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Row appears, no email | `NOTIFY_EMAIL` not set, or you hit the daily `MailApp` quota (100/day on a free account, 1,500 on Workspace) |
| Nothing happens at all | Deployment access is not **Anyone**, or you edited the code without re-deploying |
| "Could not confirm" message on the site | The browser blocked reading the response. The row still lands — check the Sheet; it is a display issue, not a lost enquiry |
| `unauthorised` in the response | `SHARED_SECRET` is set but `PUBLIC_FORM_TOKEN` is missing or different |

Execution logs are under **Executions** in the Apps Script editor — every POST shows up
there with its result.
