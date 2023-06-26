"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Container } from "react-bootstrap";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS Pokedex",
  description: "Pokedex App created using NextJS and swr",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <main>
          <Container className="py-5">{children}</Container>
        </main>
      </body>
    </html>
  );
}
