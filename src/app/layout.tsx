import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leaf Exchange Africa",
  description:
    "Leaf Exchange Africa - wholly indigenous market leader in tobacco contract growing, merchanting, manufacturing and ultimately export of all tobaccos in Zimbabwe.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  types:any;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
