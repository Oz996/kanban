import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./SessionProvider";
import Header from "@/components/Header";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Task Manager",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={plusJakarta.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SessionProvider session={session}>
            <Providers>
              <Header />
              {children}
            </Providers>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
