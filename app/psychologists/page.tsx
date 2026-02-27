import PsychologistsView from "@/components/PsychologistsView/PsychologistsView";
import css from "./page.module.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Psychologists Catalog', 
  description: "Browse our extensive catalog of psychologists.",
  openGraph: {
    title: 'Catalog | Psychologists Service',
    description: 'Find the best psychologists for your mental health needs.',
    url: `https://psychologists-service.vercel.app/psychologists`,
    images: [
      {
        url: '/image/Hero.jpg', 
        width: 1200,
        height: 630,
        alt: 'Psychologists Catalog',
      },
    ],
  },
};

export default function PsychologistsPage() {
  return (
    <section className={css.pageSection}>
    <div className={`container ${css.catalogWrapper}`}>
         < PsychologistsView />
    </div>
    </section>
  );
}