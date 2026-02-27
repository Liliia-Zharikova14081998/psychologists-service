import FavoritesView from "@/components/FavoritesView/FavoritesView";
import css from "./page.module.css"; 
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Favorites', 
  description: "Browse your favorite psychologists.",
  openGraph: {
    title: 'Favorites | Psychologists Service',
    description: 'View and manage your favorite psychologists.',
    url: `https://psychologists-service-delta.vercel.app/favorites`,
    images: [
      {
        url: '/image/Hero.jpg', 
        width: 1200,
        height: 630,
        alt: 'Psychologists Favorites',
      },
    ],
  },
};

export default function FavoritesPage() {
  return (
    <section className={css.pageSection}>
      <div className={`container ${css.catalogWrapper}`}>
        <FavoritesView />
      </div>
    </section>
  );
}