import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import { Toaster } from 'react-hot-toast';
import Script from "next/script";
import { FaceHoverProvider } from "./context/FaceHoverContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shubham Gaikwad | Full Stack Developer & Designer",
  description:
    "I'm Shubham Gaikwad, a full stack developer crafting immersive web experiences.",
  keywords: [
    "Shubham Gaikwad",
    "Portfolio",
    "Full Stack Developer",
    "React Developer",
    "MERN Stack",
    "JavaScript",
    "Frontend Developer",
    "GSAP",
    "Node.js",
    "Web Developer India",
    "Freelancer",
    "UI UX Designer",
    "Data Sturctures",
    "Algorithms",
    "DSA"
  ],
  authors: [{ name: "Shubham Gaikwad", url: "https://shubhamgaikwad.vercel.app" }],
  creator: "Shubham Gaikwad",
  metadataBase: new URL("https://shubhamgaikwad.vercel.app"),
  openGraph: {
    title: "Shubham Gaikwad | Portfolio",
    description:
      "Explore my portfolio showcasing modern projects, creative UI, animations, and professional experiences.",
    url: "https://shubhamgaikwad.vercel.app",
    siteName: "Shubham Gaikwad Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shubham Gaikwad Portfolio Screenshot",
      },
    ],
    type: "website",
  },
  themeColor: "#f3ead2",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics script via next/script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9RPJP4PMVR"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9RPJP4PMVR');
            `,
          }}
        />

        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>


      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <FaceHoverProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <CustomCursor />
          <LoadingScreen>{children}</LoadingScreen>
        </FaceHoverProvider>
      </body>


    </html>
  );
}
