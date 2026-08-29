import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Monks — Homepage Recreation",
  description: "A faithful frontend recreation of the Design Monks homepage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
