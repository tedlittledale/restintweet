import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rest In Tweet",
  description: "An archive of Ted's tweets, indexed using AI embeddings.",
  openGraph: {
    title: "Rest In Tweet",
    description: "An archive of Ted's tweets, indexed using AI embeddings.",
    url: "https://restintweet.tedspace.dev",
    siteName: "Rest In Tweet",
    images: [
      {
        url: "https://restintweet.tedspace.dev/og.jpg",
        width: 791,
        height: 415,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
