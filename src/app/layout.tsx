import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mineria Chile - SERNAGEOMIN | NewCooltura Informada",
  description: "Oficinas SERNAGEOMIN, concesiones mineras, calculadora de patentes y recursos para mineros",
  keywords: ["mineria Chile", "SERNAGEOMIN", "concesiones mineras", "patentes mineras", "exploracion"],
  openGraph: {
    title: "Mineria Chile - NewCooltura Informada",
    description: "Concesiones, patentes y tramites mineros",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
