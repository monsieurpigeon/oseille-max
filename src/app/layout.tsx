import Navigation from "@/components/navigation";
import {
  ClerkProvider,
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Oseille max",
  description: "La nouvelle version de Oseille",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col bg-gradient-to-t from-primary/10 to-background`}
        >
          <div className=" shadow-lg pb-1 bg-gradient-to-r from-sky-300 via-white to-yellow-300">
            <div className="bg-background flex justify-between items-center py-2 px-4">
              <Link href="/">
                <div className="text-2xl flex items-center gap-1">
                  <div>✌️ Oseille</div>
                  <div className="italic text-sm font-light px-2 border rounded-full bg-gradient-to-tr from-primary/80 via-primary to-primary/80 text-primary-foreground shadow-2xl">
                    Max
                  </div>
                </div>
              </Link>
              <div className="flex gap-4">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <OrganizationSwitcher />
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
          <div className="flex p-4 gap-4 grow justify-stretch">
            <div>
              <Navigation />
            </div>
            <div className="w-full">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
