# LEXHAPHOTOGRAPHY Website - WEDE5020 Part 3

**GitHub Repository:** https://github.com/EMGPSD/wede5020-2026-part-3-zoebobelo

## Student Information
- **Student Number:** ST10530562
- **Email:** st10530562@myemeris.edu.za
- **Module:** WEDE5020 - Web Development
- **Project:** LEXHAPHOTOGRAPHY - Small Business Website

## Project Overview
LEXHAPHOTOGRAPHY is a real, operating small business owned by Liliso Ntloko, based in Komani, Queenstown (Eastern Cape) and Sandton. The business specialises in Matric Dance shoots, Nature photography, and Model Shoots. Currently has no website and relies on Instagram @lexhaphotography and WhatsApp 072 390 8908. This project creates a 5-page professional website to centralise portfolio and increase bookings.

## Website Goals
- Increase bookings by 40% in 12 months
- Centralise portfolio: Nature (4), Matric Dance (4), Model (4) = 12 images
- Enable bookings via enquiry form
- Build luxury brand with charcoal #2B2B2B and gold #D4AF37

**KPIs:** Enquiry submissions 10/month, time on Gallery >2 mins, Instagram clicks, bounce rate <60%

## Key Features - Actual Implementation
- **index.html (Home):** Business introduction and booking link
- **about.html (About Us):** Liliso Ntloko's biography, the business story, mission, and vision
- **gallery.html (Gallery):** Nature, Matric Dance, and model portfolio images with search, sorting, and a keyboard-operable lightbox
- **enquiry.html (Enquiry):** Validated session enquiry form for service, date, location, and client details; responses explain availability and quote follow-up
- **contact.html (Contact Us):** Business contact information, interactive Komani map, and a separate validated general-message form
- **Shared styling:** All pages use `css/styles.css`, including responsive layouts for mobile and tablet screens.

**Consistent Elements:** Gold Lexhaphotography logo and header, navigation across all five pages, and a footer with the business email.

## Sitemap

- `index.html` — Home 
- `about.html` — About Us
- `gallery.html` — Image Gallery
- `enquiry.html` — Enquiry
- `contact.html` — Contact Us

## Content Sourcing
- No existing website - N/A
- Instagram @lexhaphotography - original portfolio images
- Original content - all photos by Liliso Ntloko

## Changelog
- 2026-09-01: Built 5 pages as per screenshots, pushed to https://github.com/EMGPSD/wede5020-2026-wede5020-part-1-zoebobelo

-2026-11-05: Renamed o1-home.html to index.html 

-2026-11-06: Merged css style sheets

- 2026-11-09: Improved Part 2 feedback and Part 3 functionality

- 2026-11-09: Added accessible portfolio search and A–Z sorting, dynamic result counts, gallery image lazy loading, and kept the keyboard-operable lightbox and responsive navigation. Added a mobile-friendly embedded Komani map.

- 2026-11-09: Added a distinct general-contact form and photography enquiry form with required fields, email/phone/date/length validation, accessible status messages, character counts, service selection, and recipient-addressed email composition. Enquiry guidance tells clients availability and pricing are confirmed individually; no unverified prices or availability are promised.
- 2026-11-09: Added `robots.txt`, `sitemap.xml`

- 2026-11-09: Renamed the secondary pages to clean `about.html`, `gallery.html`, `enquiry.html`, and `contact.html` URLs and updated navigation, canonical/social URLs, sitemap entries, and deployment file lists. Resized the header logo from 1328×1184 to 300×268 and optimized the largest nature image from 2048×1365 to 1600×1066. 

- 2026-11-09: Simplified the README sitemap to a list of the five pages and removed optional frequency and priority fields from `sitemap.xml`.



## Forms and deployment limitations

Both forms use browser-side HTML validation and JavaScript validation, then prepare a message addressed to `Lexhaphotography@gmail.com` in the visitor's default email application. The visitor must review and send the message. This static website has no server or configured form provider, so it cannot deliver messages asynchronously with AJAX; a real AJAX submission needs a backend or a selected third-party form service, plus its recipient verification and privacy disclosure. Do not treat client-side validation as a substitute for server-side validation if a backend is added.

The deployment workflow publishes only the website HTML, CSS, JavaScript, and image assets; course documents and source materials are excluded. The site has no database, login, or server-side form processing, uses no third-party JavaScript, and opens external links with `noopener noreferrer`. Use HTTPS through GitHub Pages. These controls reduce the static site's exposure, but form validation is client-side only and is not server security.

Backlinks, social promotion, and search-engine registration are off-page actions and cannot be created by website code alone. Submit the published sitemap to search-engine webmaster tools, share the live site through the business's social accounts, and seek relevant local business/photography directory links. Google Maps, email, phone, and social links are provided for local discovery and contact.

The site-wide stylesheet is located at `css/styles.css`.

## References
Instagram. (2026). LEXHAPHOTOGRAPHY (@lexhaphotography) • Instagram photos and videos. Available at: https://www.instagram.com/lexhaphotography/   [Accessed 6 August 2026].

Lerissa Kemp Photography. (2021). Photographer Johannesburg | Photography Gauteng | Lerissa Kemp. Available at: https://lerissakemp.co.za/  [Accessed 20 August 2026].

Rounding an image in CSS. (2026). Mimo.Org. https://mimo.org/glossary/css/rounding-an-image [Accessed  30 August 2026].

Supriya Shashivasan. (2021, March 23). How to build a Curved UI header. DEV Community. https://dev.to/omeal/how-to-build-a-curved-ui-header-51dm [Accessed  30 August 2026].


Warncke, S. (2020). Erik Forster Photography - For all your photographic needs. Available at: https://peach.co.za/  [Accessed 20 August 2026].

Cruz Palacios, E. (2026). CSS architecture. Available at: https://dev.to/ [Accessed 3 November 2026].

Mozilla Developer Network. (2026). CSS layout - Learn web development. Available at: https://developer.mozilla.org/ [Accessed 4 November 2026].

Mozilla Developer Network. (2026). KeyboardEvent: key property - Web APIs. Available at: https://developer.mozilla.org/ [Accessed 7 November 2026].

Mozilla Developer Network. (2026). MDN Web Docs. Available at: https://developer.mozilla.org/ [Accessed 6 November 2026].

World Wide Web Consortium. (2020). CSS Grid Layout Module Level 1. Available at: https://www.w3.org/ [Accessed 5 November 2026].

World Wide Web Consortium. (2026). Media Queries Level 5. Available at: https://www.w3.org/ [Accessed 5 November 2026].

World Wide Web Consortium. (2026). W3C standards. Available at: https://www.w3.org/ [Accessed 8 November 2026].
