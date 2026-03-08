import type { Metadata } from "next";
import { Manrope, Meddon } from "next/font/google";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { AuthProvider } from "@/lib/authContext";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/global/ThemeProvider";
import { SmoothScrollProvider } from "@/components/global/SmoothScrollProvider";
import { PageTransition } from "@/components/animations/PageTransition";
import { GlobalCanvasWrapper } from "@/components/global/GlobalCanvasWrapper";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const meddon = Meddon({
  subsets: ["latin"],
  variable: "--font-meddon",
  weight: "400",
});

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
      <body className={`${manrope.variable} ${meddon.variable} flex flex-col min-h-screen relative font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SmoothScrollProvider>
            <PageTransition>
              <AuthProvider>
                <GlobalCanvasWrapper />
                <Navbar />
                <main className="flex-grow relative z-10">
                  {children}
                </main>
                <Footer />
              </AuthProvider>
            </PageTransition>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
