import { Baloo_2, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { GiftProvider } from "@/components/GiftProvider";

// Rounded, friendly font for normal text
const round = Baloo_2({
  variable: "--font-round",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Chunky pixel font for cute video-game style headings & buttons
const pixel = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Lovebox — a surprise, just for you",
  description: "A cute digital gift, packed with love.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fff6ec",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${round.variable} ${pixel.variable} h-full`}>
      <body className="min-h-full">
        {/* GiftProvider remembers the gift you are building across pages */}
        <GiftProvider>{children}</GiftProvider>
      </body>
    </html>
  );
}
