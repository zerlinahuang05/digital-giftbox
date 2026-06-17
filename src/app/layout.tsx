import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lovebox",
  description: "A little package, just for you. Send a digital gift across the miles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
