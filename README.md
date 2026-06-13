# ethiopiancommunitysf.org

Website for Ethiopian Community San Francisco.

Modern React frontend for a San Francisco Ethiopian community website. The current site is a polished static frontend with CMS-ready content sections for mission, about/history, events, membership, programs, donation, and contact.

## Local Admin Dashboard

Open the dashboard at:

```text
http://localhost:5173/#admin
```

Demo password:

```text
admin123
```

The admin can edit homepage copy, mission/about/history text, values, posts/events, programs, donation/contact information, pictures, videos, the color design, and the website layout template. Changes are saved in browser local storage, so no WordPress installation is required for the local demo.

Available color designs:

- Heritage Gold
- Modern Light
- Night Green

Available layout templates:

- Classic Community
- Split Story
- Magazine Cards
- Media First

Media uploads support images and videos. For the local demo, keep each uploaded file under 4MB because files are stored in browser local storage.

Posts support draft and publish status. Draft posts do not appear on the public site. Editing a published post creates unpublished changes in the dashboard, and the public site keeps showing the last published version until the admin clicks Publish.

For production, replace the demo password/local storage with real authentication and a database or API.

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Recommended Headless WordPress Setup

Use WordPress as the content admin and this React app as the public website.

1. Install WordPress on a managed host or VPS.
2. Install these WordPress plugins:
   - WPGraphQL
   - Advanced Custom Fields
   - WPGraphQL for ACF
   - Custom Post Type UI, optional for Events and Programs
3. Create content types:
   - Events
   - Programs
   - Membership Levels
   - Pages for About, Mission, and Donation content
4. Add a frontend environment variable:

```bash
VITE_WORDPRESS_GRAPHQL_URL=https://your-wordpress-site.com/graphql
```

5. Replace the local content arrays in `src/App.jsx` with GraphQL queries from WordPress.

The design and layout are already prepared for dynamic CMS content.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
