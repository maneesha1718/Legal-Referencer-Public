import { Inter } from "next/font/google";

import "./globals.css";
import MainHeader from "@/components/main-header/main-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Legal Referencer",
  description: "Legal Practice Management for Attorneys & Firms",
  
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
      <meta name="viewport" title={metadata.title} description={metadata.description} content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>

      </head>
      <body className={inter.className}>
          <MainHeader />
          {children}
      </body>
    </html>
  );
}
