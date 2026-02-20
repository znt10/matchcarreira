import Bar from "@/components/NavBar/Search_bar";
import Rodape from "@/components/Rodape";
import AuthProvider from "@/providers/AuthProvider"; // <--- 1. Importe aqui
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "MatchCarreira",
  description: "Plataforma que conecta candidatos e empresas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. Envolva tudo que precisa de acesso ao login (Bar e children) */}
        <AuthProvider>
            <Bar />
            <main className="min-h-screen">
              {children}
            </main>
            <Rodape />
        </AuthProvider>
      </body>
    </html>
  );
}