import type { Metadata } from "next";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { AuthProvider } from "@/lib/authContext";
import { ThemeProvider } from "@/components/global/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "YP Gurukul | Premium Education",
  description: "Professional coaching institute website for YP Gurukul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
