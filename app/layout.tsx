import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from './contexts/ThemeContext'
// import { AuthProvider } from './contexts/AuthContext'

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
    <html lang="en">
      <body className=''>
        {/* <AuthProvider> */}
          <ThemeProvider >
            {children}
          </ ThemeProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
