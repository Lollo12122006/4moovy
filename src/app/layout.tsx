import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "4Moovy — Noleggio Auto Lungo Termine | Confronta e Risparmia",
  description:
    "Confronta il noleggio lungo termine con l'acquisto tradizionale. Scopri quanto puoi risparmiare su assicurazione, manutenzione e svalutazione. Preventivo gratuito in 60 secondi.",
  openGraph: {
    title: "4Moovy — Noleggio Auto Lungo Termine",
    description:
      "Confronta noleggio e acquisto auto. Risparmia su assicurazione, manutenzione e svalutazione.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${GeistSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0A0A0A]">
        {children}
      </body>
    </html>
  );
}
