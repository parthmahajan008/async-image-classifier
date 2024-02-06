import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "../provider/convexprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Async Image Classifier",
  description: "A web-based application that allows users to upload images for classification",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}

