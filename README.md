# ArtSphere

ArtSphere is a modern creative marketplace where artists can showcase their work, build polished portfolios, and connect with clients who want to hire them. The experience combines a premium landing page with creator-focused tools for profile management, portfolio building, uploads, and hiring.

## ✨ Features

- Landing page with hero, feature highlights, testimonials, and FAQ sections
- Creator discovery through the explore experience
- Authenticated dashboard for creators
- Portfolio builder for adding projects and links
- Artwork upload flow for showcasing new work
- Hiring and checkout experience for clients
- Firebase-backed authentication and profile persistence

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- React Router
- Tailwind CSS
- Firebase Auth, Firestore, and Analytics
- Zustand for state management
- Framer Motion for UI animation

## 📁 Project Structure

- src/pages: main application pages such as landing, explore, dashboard, profile, and checkout
- src/components: reusable UI sections and navigation/footer
- src/store: app state management
- src/firebase.ts: Firebase initialization and authentication helpers

## ▶️ Getting Started

1. Open the app folder:
   ```bash
   cd Artspeher
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local URL shown in the terminal, usually http://localhost:5173

## 🧪 Available Scripts

- npm run dev – start the Vite development server
- npm run build – build the production bundle
- npm run lint – run ESLint checks
- npm run preview – preview the production build locally

## 🔐 Firebase Setup

The app uses Firebase for authentication and data storage. The project configuration is already included in src/firebase.ts for local development, but for production deployment you should use your own Firebase project credentials.

## 📄 License

This project is intended for learning, demo, and portfolio purposes.
