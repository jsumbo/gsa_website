# Gayduo Sports Agency — Website

Official website for **Gayduo Sports Agency (GSA)**, representing elite African footballers. Built with Next.js 16, Firebase Firestore, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4
- **Database**: Firebase Firestore
- **Fonts**: Bebas Neue (display), Barlow Condensed (headings), DM Sans (body)
- **Deployment**: Vercel

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root of the project with the following Firebase config:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Admin panel credentials
NEXT_PUBLIC_ADMIN_USERNAME=your_admin_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

Get these values from your [Firebase Console](https://console.firebase.google.com/) → Project Settings → Your Apps.

### 3. Seed Firestore with initial data

Before running the app for the first time, seed the database:

```bash
pnpm seed
```

> **Note:** Your Firestore security rules must allow writes. During development, set them to `allow read, write: if true` in the Firebase Console. Tighten these rules before going to production.

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── (public pages)
│   ├── page.tsx          # Homepage
│   ├── athletes/         # Athlete roster + individual pages
│   ├── blog/             # Blog listing + individual posts
│   └── about/            # About + Contact
├── gsa/                  # Admin panel (athletes + blog CRUD)
├── api/                  # API routes (auth, etc.)
└── layout.tsx            # Root layout, fonts, metadata

components/               # Shared components (Header, Footer, BlogCard)
lib/
├── data.ts               # Static fallback data + TypeScript types
├── firestore.ts          # All Firestore CRUD operations
└── firebase.ts           # Firebase app initialisation

scripts/
└── seed.mjs              # Seeds Firestore with initial athletes + blog posts
```

## Admin Panel

The admin panel is available at `/gsa`. It allows you to:

- Add, edit, and delete **athletes** (name, position, team, bio, stats, gallery, etc.)
- Add, edit, and delete **blog posts** with a **Featured** toggle that controls homepage visibility
- The featured post toggle determines which posts appear on the homepage

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm seed` | Seed Firestore with initial data |

## Environment & Tooling Files

| File/Folder | Purpose |
|---|---|
| `.env.local` | Firebase config — **never commit this** |
| `.gitignore` | Excludes `.env.local`, `node_modules`, `.next`, `.DS_Store`, `.claude`, `.playwright-mcp` |
| `CLAUDE.md` | Instructions for AI coding assistants working on this project |
| `.claude/` | Claude Code local settings (permissions, hooks) — not committed |

## Firestore Data Model

### `athletes` collection
```
{
  id, name, slug, position, team, nationality, dateOfBirth,
  height, preferredFoot, number, image, gallery[], biography,
  stats: { appearances, goals, assists },
  achievements: [{ year, title }],
  socialLinks: { instagram, twitter, facebook },
  highlightVideo
}
```

### `blogPosts` collection
```
{
  id, title, slug, excerpt, content, category,
  featuredImage, publishedAt, featured (boolean)
}
```

### `admin` collection
```
{ id: "credentials", email, password }
```
