import Link from 'next/link';
import css from './not-found.module.css';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Psychologists Service",
  description: "The page you are looking for does not exist in Psychologists Service.",
  openGraph: {
    title: "Page not found | Psychologists Service",
    description: "The page you are looking for does not exist.",
    images: [
      {
        url: '/images/Hero.jpg', 
        width: 1200,
        height: 630,
        alt: "Psychologists Service 404 Page",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.container}>
      <div className={css.content}>
        <h1 className={css.title}>404</h1>
        <h2 className={css.subtitle}>Oops! Page not found</h2>
        <p className={css.text}>
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link href="/psychologists" className={`${css.errorBtn} button`}>
          Back to Catalog
        </Link>
      </div>
    </main>
  );
}