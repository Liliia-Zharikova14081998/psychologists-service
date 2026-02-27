![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![React](https://img.shields.io/badge/React-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?logo=cssmodules&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

# 🧠 Psychologists Services Platform

## 📌 Project Overview

A high-performance web application designed to connect users with professional psychologists. Built with Next.js 16, React 19, and Firebase, featuring a fully responsive design and a dynamic theme-switching system.

## 🚀 Demo

🔗 [Live Demo Link](https://psychologists-service-delta.vercel.app/)

## 🚀 Key Features

- **Advanced Auth:** Secure registration and login powered by Firebase Auth.

- **Psychologist Catalog:** Comprehensive list of professionals with detailed profiles and peer reviews.

- **Favorite Management:** Authenticated users can save psychologists to a personal "Favorites" list with real-time state persistence via Zustand.

- **Appointment Booking:** Integrated scheduling form via interactive modals.

- **Dynamic Theming:** Three distinct color schemes (Green, Blue, Orange) with persistence across sessions using localStorage.

- **Modern UX:** Optimized with React Query for efficient data fetching and React Hot Toast for themed notifications.

## 🛠 Tech Stack

- **Framework:** Next.js 16.1 (App Router)

- **UI Library:** React 19

- **Data Fetching:** TanStack React Query v5

- **State Management:** Zustand

- **Backend & Auth:** Firebase 12

- **Form Handling:** React Hook Form + Yup (Validation)

- **Styling:** CSS Modules with Global Theme Variables

- **Notifications:** React Hot Toast

- **Loaders:** React Spinners

## 📦 Installation & Setup

**1. Clone the repository:**

```bash
git clone https://github.com/Liliia-Zharikova14081998/psychologists-service.git
cd psychologists-service
```

**2. Install dependencies:**

```bash
npm install
```

**3. Configure Environment Variables:**

Create a `.env` file in the root directory and add your Firebase configuration:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**4. Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📂 Project Structure

- **`/app:`** Next.js App Router pages, layouts, and global styles.

- **`/components:`** Reusable UI elements (Modals, Auth Forms, Navigation).

- **`/lib:`** Core logic including Firebase config, Zustand stores, and validation schemas.

- **`/types:`** TypeScript interfaces for psychologists and user data.

## 📫 Author

Liliia Zharikova

[Git Hub](https://github.com/Liliia-Zharikova14081998)
