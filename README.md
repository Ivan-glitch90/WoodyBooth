# Woody Booth

A multi-page website for Woody Booth, a vintage-trailer-turned-mobile-photo-booth business. It showcases the service, lays out the packages, lets visitors build a price estimate, and sends their event details straight to the owner's inbox.

Built as a redesign of the business's existing site, with a focus on a more polished look, a clearer path from "interested" to "booked," and a gallery that shows off the product.

## Live Site

🔗 **[woodybooth-preview.netlify.app](https://woodybooth-preview.netlify.app)**

## Screenshots

| Home | Quote estimator |
|---|---|
| ![Home page](screenshots/home.png) | ![Quote estimator](screenshots/estimator.png) |

| Gallery | Contact form |
|---|---|
| ![Gallery with filters](screenshots/gallery.png) | ![Contact page](screenshots/contact.png) |

## Features

- **Quote estimator** – visitors pick booth hours, extras and travel distance and watch a photo-strip-style receipt update live. "Request this quote" opens the contact page with the estimate already attached.
- **Contact form with Netlify Forms** – no backend needed. Includes spam protection (honeypot), calendar date pickers, and a unique email subject per request so every inquiry arrives as its own email conversation.
- **Custom thank-you page** after the form is sent.
- **Photo gallery** – category filters, masonry-style layout, a lightbox with swipe and arrow-key support, a photo counter, and descriptive alt text. Printed photo strips are shown in full instead of being cropped.
- **"Peek inside" video** in the About section that starts when scrolled into view, with a pause button. Respects the visitor's "reduce motion" setting.
- **Packages and testimonials** – three package tiers and a testimonial carousel with real client quotes.
- **FAQ** accordion, plus Instagram and email links in the footer on every page.
- **Responsive** layout built mobile-first with Bootstrap.

## Built With

- HTML5
- CSS3 (custom styling on top of Bootstrap)
- [Bootstrap 5](https://getbootstrap.com/)
- Vanilla JavaScript (gallery, lightbox, filters, form helpers, video controls)
- [React 18](https://react.dev/) loaded from a CDN, used only for the quote estimator (no build step)
- [Netlify Forms](https://docs.netlify.com/forms/setup/) for the contact form
- Google Fonts (Bricolage Grotesque, Rye)

## Project Structure

```
WoodyBooth/
├── index.html        Home: hero, about, packages, gallery preview, testimonials, estimator
├── contact.html      Contact form (receives the estimate from the home page)
├── gallery.html      Full photo gallery
├── faq.html          Frequently asked questions
├── thank-you.html    Shown after the form is submitted
├── style.css         All custom styles
├── js/
│   └── gallery.js    Gallery data, filters and lightbox
├── img/              Logo, hero image, video poster
│   └── gallery/      Optimized event photos
├── video/            "Inside the booth" clip
└── screenshots/      Images used in this README
```

## Running It Locally

This is a static site, so there's no build step:

1. Clone the repo
   ```bash
   git clone https://github.com/Ivan-glitch90/WoodyBooth.git
   ```
2. Open `index.html` in your browser (or use the VS Code "Live Server" extension for auto-reload)

> **Note:** The contact form only works once deployed on Netlify, since that's what makes `data-netlify="true"` function. Locally, submitting the form won't send anything.

## Design Decisions

- **Palette:** warm walnut browns with a muted brass accent, plus a parchment tone for lighter sections. This keeps the vintage-wood feel without the heavy, saturated orange the first version used.
- **Typography:** the Rye display font is reserved for the hero and a few accents, with Bricolage Grotesque everywhere else, so the site feels professional and not themed-party.
- **Tone:** copy rewritten to be warm and clear instead of playful, since the audience includes weddings and corporate clients.
- **Performance and privacy:** gallery photos are cropped and compressed (a 2.6 MB strip became about 330 KB), and location metadata is stripped from every image before upload.
- **Accessibility:** descriptive alt text, keyboard-friendly gallery and form controls, visible focus styles, and reduced-motion support for the video and scrolling.

## Notes

- The prices in the quote estimator are **sample rates** for demonstration and are labeled that way on the page. They live in one clearly marked block at the bottom of `index.html` and are meant to be swapped for the real rates.
- Adding gallery photos takes two steps: drop the file in `img/gallery/` and add one entry to the list at the top of `js/gallery.js`.

## What I Learned

- Structuring a small multi-page marketing site with Bootstrap and customizing it with my own CSS
- Setting up a serverless contact form with Netlify Forms, including spam protection, a custom success page and per-submission email subjects
- Passing data between pages (the estimate) through the URL, and filling hidden form fields from it
- Using React for one interactive component in an otherwise static site, with no build tooling
- Building an accessible gallery with filtering, a lightbox and touch support in plain JavaScript
- Preparing images and video for the web: cropping, compressing, and removing embedded location data
- Debugging deployment problems such as files in the wrong folder, missing assets and 404s with the browser's developer tools

## What I'm Working On Next

- [x] Add a real image gallery
- [x] Add real testimonials
- [x] Deploy to Netlify and link the live site above
- [ ] Replace the sample estimator rates with the real ones
- [ ] Add click and visit analytics
- [ ] Add more event photos, especially guests using the booth

## Contact

- [GitHub](https://github.com/Ivan-glitch90)
- [LinkedIn](https://www.linkedin.com/in/ivan-robles-943967b6/)
