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
  title: "Oseille MAX",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
        >
          <div className="flex justify-between items-center py-2 px-4 shadow">
            <Link href="/">
              <div>Oseille MAX</div>
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
          <div className="flex p-4 gap-4 grow justify-stretch">
            <div>
              <Navigation />
            </div>
            <div className="">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
