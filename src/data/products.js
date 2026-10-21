// Product copy transcribed verbatim from the WordPress Products page.
// `image` pairings follow the order the photos appeared in the original
// Elementor layout; `datasheet` links point at the same PDFs as before.
export const products = [
  {
    slug: 'edge-grab',
    name: 'EdgeGrab',
    family: 'PVKIT® 2.0 / S-5! Clamps',
    image: '/img/p1-13.jpg',
    datasheet: '/docs/pvkit-2-0-brochure.pdf',
    features: [
      'Pre-assembled components – quick and easy',
      'Versatile: same kit for 30-46 mm module frames',
      'Only one tool needed for installation',
      '80% less weight',
      '25% better load distribution',
      'Installs with module, reducing lay out time',
      '100% aluminum & stainless components',
      'Single-piece EdgeGrab installs with ease',
      'UL-listed ground path; nothing else needed',
      'Multiple slots for wire ties',
      'Low profile hardware for flush, clean finish',
      'Available in black',
      'Allows load reduction per ASCE-7',
      'UL 2703 listed',
    ],
  },
  {
    slug: 'mid-grab',
    name: 'MidGrab',
    family: 'PVKIT® 2.0 / S-5! Clamps',
    image: '/img/p1-9.jpg',
    datasheet: '/docs/pvkit-2-0-brochure.pdf',
    features: [
      'Pre-assembled components – quick and easy',
      'Versatile: same kit for 30-46 mm module frames',
      'Only one tool needed for installation',
      '80% less weight',
      '25% better load distribution',
      'Installs with module, reducing lay out time',
      '100% aluminum & stainless components',
      'Single-piece EdgeGrab installs with ease',
      'UL-listed ground path; nothing else needed',
      'Multiple slots for wire ties',
      'Low profile hardware for flush, clean finish',
      'Available in black',
      'Allows load reduction per ASCE-7',
      'UL 2703 listed S-5 Clamps',
    ],
  },
  {
    slug: 's-5-v',
    name: 'S-5-V™ & Mini',
    family: 'S-5! Seam Clamps',
    image: '/img/p1-10.jpg',
    datasheet: '/docs/s-5-v-clamps-brochure.pdf',
    features: [
      'Fits the same vertically-oriented seams as the S-5-U',
      'Less versatile but more cost-effective than the S-5-U',
      'Specifically designed for vertical machine-folded seams',
      'S-5 Clamps',
    ],
  },
  {
    slug: 's-5-z',
    name: 'S-5-Z™ & Mini',
    family: 'S-5! Seam Clamps',
    image: '/img/p1-11.jpg',
    datasheet: '/docs/s-5-z-clamps-brochure.pdf',
    features: [
      'Specially designed to fit Zip-Rib®, BEMO, Kalzip® and similar profiles with a round “bulb” seam configuration and seam diameters of ≤ ¾” (19 mm).',
      'Two-piece clamp design allows for ease of installation anywhere along length of the rib.',
    ],
  },
  {
    slug: 'protea-bracket',
    name: 'Protea™ Bracket',
    family: 'S-5! Brackets',
    image: '/img/p1-12.jpg',
    datasheet: '/docs/proteabracket-brochure.pdf',
    features: [
      'L-Foot allows for side-mount rails, bottom-mount rails or PVKIT',
      'Load-tested for engineered applications',
      'Adjustable – fits trapezoidal rib profiles up to 3” (76 mm) wide',
      'Peel-and-stick EPDM surface prevents accidental shifting during installation',
      'Stainless-capped, self-piercing screws specifically designed to prevent swarf; EPDM sealing washer',
    ],
  },
  {
    slug: 'ribbracket',
    name: 'RibBracket™ I-V',
    family: 'S-5! Brackets',
    image: '/img/p1-7.jpg',
    datasheet: '/docs/S5-Product-Sheet-RibBracket-I-V-FINAL.pdf',
    features: [
      'Flex-to-fit legs endure proper fit',
      'Large channel above rib can be used for wire management',
      'Sheeting-only attachment can be placed anywhere along roof ribs',
      'Stainless-capped, self piercing screws specifically designed to maximize holding strength & prevent swarf',
      'EPDM sealing washer',
      'Bracket allows for 4” (100 mm) of air space above rib',
      '4 self-penetrating screws and 1 M8 Nut Included',
    ],
    variants: [
      {
        name: 'RibBracket I',
        text: 'Designed for popular Hawaiian profiles, such as HPM Custom 4-Rib, HPM Custom 6-Rib, and similarly-dimensioned narrow ribs.',
      },
      {
        name: 'RibBracket II',
        text: 'Designed for popular African and Australian profiles, such as Lysaght Trimdek® 1015, Safintra Trimflute 1015, and similarly dimensioned profiles.',
      },
      {
        name: 'RibBracket III',
        text: 'Designed for popular North American and Indian profiles, such as PBR Panel, R-Panel, Kirby Roof (KR), and similarly dimensioned profiles.',
      },
      {
        name: 'RibBracket IV',
        text: 'Designed for popular African and North American profiles, such as Safintra IBR, KingSpan® KS1000, and similarly-dimensioned profiles.',
      },
      {
        name: 'RibBracket V',
        text: 'Designed for Ternium TR and similarly-dimensioned profiles.',
      },
    ],
  },
  {
    slug: 'wind-clamp',
    name: 'WindClamp',
    family: 'S-5! Seam Clamps',
    image: '/img/p1-14.jpg',
    datasheet: '/docs/S5-Product-Sheet-WindClamp-FINAL-Web.pdf',
    features: [
      'Proven effective for more than 25 years',
      "Preserves roof's thermal cycling integrity",
      'Preserves roof warranties',
      'Costs only pennies per square foot – More cost-effective than other alternatives',
    ],
    alternatives: [
      'adding clips',
      'adding structural elements',
      'increasing panel gauge',
      'decreasing panel width (seam spacing)',
      'partial roof replacement',
      'total roof replacement',
    ],
  },
];

// From the "What We Offer" list on the About page.
export const categories = [
  {
    name: 'Solar Panels',
    text: 'High-efficiency modules designed for various applications',
    icon: 'panel',
  },
  {
    name: 'Mounting Systems',
    text: 'Durable and innovative racking solutions for secure installation',
    icon: 'mount',
  },
  {
    name: 'Inverters',
    text: 'Grid-tied and off-grid options to ensure optimal energy conversion',
    icon: 'inverter',
  },
  {
    name: 'Energy Storage',
    text: 'Reliable batteries & backup systems for uninterrupted power',
    icon: 'battery',
  },
  {
    name: 'Balance of System (BOS) Components',
    text: 'Cables, connectors, junction boxes, and more for a complete setup',
    icon: 'bos',
  },
];
