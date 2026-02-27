import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Psychologists Service",
    template: '%s | Psychologists Service',
  },
  description:
    "A platform to connect psychologists with clients seeking mental health support.",
  openGraph: {
    title: 'Psychologists Service',
    description: 'Find your perfect psychologist and start your journey today.',
    url: 'https://psychologists-service-delta.vercel.app/',
    images: [
      {
        url: '/image/Hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Psychologists Service',
      },
    ],
     locale: 'en-US',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <TanStackProvider>
          <AuthProvider>
          <Header />
          <main>
            {children}
          </main>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
