import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Giftbox",
  description: "A sweet little digital gift builder for someone you love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
