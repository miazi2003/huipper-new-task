import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: "Huipper — Digital Product Design Agency",
  description: "Huipper designs digital products and experiences that drive meaningful results.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
