# OutgrowLK website (Next.js, static)

## Run it on your computer
    npm install
    npm run dev          # http://localhost:3000

## Put it on Netlify

### Option A: drag and drop (quickest)
1. Run `npm install` then `npm run build`. This creates a folder called `out`.
2. In Netlify go to Sites, then "Add new site", then "Deploy manually".
3. Drag the `out` folder (or a zip of its contents) onto the page.

### Option B: from GitHub (updates itself on every push)
1. Push this project to a GitHub repository.
2. In Netlify choose "Add new site", then "Import an existing project", and pick the repo.
3. Netlify reads `netlify.toml`: build command `npm run build`, publish folder `out`.

## What to edit
- `data/site.js`      Instagram links
- `data/projects.js`  Selected work
- `data/packages.js`  Packages and prices
- `data/faq.js`       FAQ answers
- `app/page.jsx`      page text and section order
- `app/globals.css`   colours (top of the file) and all styling
- `public/_headers`   security headers Netlify adds to every page

The font (Poppins, the font in your logo) is stored in `app/fonts`, so building never needs the internet.
