import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import localFont from "next/font/local";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Rentr",
  description: "Find your next home",
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased bg-pattern flex flex-col min-h-screen`}
      >
        <Navbar session={session} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
