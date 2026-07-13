import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rhockstar Connect",
  description: "The premier hybrid professional networking and dating platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
