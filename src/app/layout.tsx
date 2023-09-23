import Navigation from "@/components/navigation/Navigation";
import "./globals.scss";
import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import Providers from "@/utils/ReactQueryProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ecommerce Platform",
  description: "Online Test - Senior Frontend Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <div className="w-screen min-h-screen flex xl:flex-row flex-col bg-n-300">
            <Navigation />
            <div className="w-full p-[24px]">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
