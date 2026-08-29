import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: "Design Monks — Homepage Recreation",
  description: "A faithful frontend recreation of the Design Monks homepage.",
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
