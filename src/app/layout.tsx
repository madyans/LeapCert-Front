import { ContextWrapper } from "@/src/context/ContextWrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeapCert - Plataforma de Ensino",
  description: "O proximo nivel do seu conhecimento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextWrapper>
      <html lang="pt_BR">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen text-black`}>
          <ContextWrapper>
            <Toaster richColors theme="light" />
            {children}
          </ContextWrapper>
        </body>
      </html>
    </ContextWrapper>
  );
}
