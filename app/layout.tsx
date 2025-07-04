import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from './contexts/ThemeContext'
import { Inter } from 'next/font/google'

// Load optimized font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "Sampayan Portfolio Management Solutions",
  description: "Effective Management of Large Projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
