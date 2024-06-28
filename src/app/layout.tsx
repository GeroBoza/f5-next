import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "../components/navBar/navBar";

import SessionAuthProvider from "@/context/SessionAuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "F5 Teams - App",
  description: "Votá a tus compañeros para enorgullecerlos con su promedio!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionAuthProvider>
          <NavBar></NavBar>
          <div data-theme="light">{children}</div>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
