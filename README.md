# Portfolio Website

A responsive, single-page portfolio with a strong focus on **responsive design** and optimal performance across devices. Use it as a template and replace all text and images with your own content.

## What’s included

- **Hero** – Headline, short intro, and call-to-action buttons  
- **About** – Photo, bio, and stats (experience, projects, clients)  
- **Skills** – Skill cards and technology tags  
- **Projects** – Featured work with images and tech stack  
- **Contact** – Contact info, image, and a simple form  
- **Responsive layout** – Mobile-first CSS with breakpoints for tablet and desktop  
- **Images** – Placeholder images from Unsplash (replace with your own)

## How to run

1. Open the project folder in your editor.
2. Serve the site locally (so images and links work correctly):
   - **VS Code / Cursor:** Install the “Live Server” extension and right-click `index.html` → “Open with Live Server”.
   - **Node:** Run `npx serve .` in the project root and open the URL shown.
   - **Python:** Run `python -m http.server 8000` and open `http://localhost:8000`.
3. Or open `index.html` directly in a browser (some features may be limited without a server).

## Replacing content

- **Text:** Edit `index.html` – update “Your Name”, about copy, project titles/descriptions, skills, and contact details.
- **Images:** Replace the `src` URLs in `index.html` with your own image paths or URLs. Current images are from Unsplash (free to use; you can keep or swap them).
- **Links:** Set real URLs for project links, LinkedIn, GitHub, and email in the Contact section and footer.
- **Form:** The contact form currently shows an alert on submit. Connect it to your backend, Formspree, Netlify Forms, or another service when you’re ready.

## File structure

```
portfolio/
├── index.html      # Main page structure and content
├── css/
│   └── styles.css  # Responsive styles
├── js/
│   └── script.js   # Mobile menu, smooth scroll, form
└── README.md       # This file
```

## Tech stack

- HTML5  
- CSS3 (custom properties, Grid, Flexbox, responsive breakpoints)  
- Vanilla JavaScript (no frameworks)

You can change colors, fonts, and spacing in `css/styles.css` via the `:root` variables at the top.
