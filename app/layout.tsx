import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayesha Fayyaz | Portfolio",
  description:
    "Experienced full-stack developer specializing in React, Node.js, and modern web technologies. View my projects and get in touch.",
  keywords: [
    "developer",
    "full stack",
    "react",
    "nodejs",
    "typescript",
    "web development",
    "portfolio",
  ],
  authors: [{ name: "Ayesha Fayyaz" }],
  creator: "Ayesha Fayyaz",
  publisher: "Ayesha Fayyaz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://thinhtran.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:8080",
    title: "Ayesha Fayyaz",
    description:
      "Experienced full-stack developer specializing in React, Node.js, and modern web technologies.",
    siteName: "Ayesha Fayyaz Portfolio",
    images: [
      {
        url: "/images/avatar.png",
        width: 1200,
        height: 630,
        alt: "Ayesha Fayyaz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayesha Fayyaz",
    description:
      "Experienced full-stack developer specializing in React, Node.js, and modern web technologies.",
    images: ["/images/avatar.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <head>
        <link rel='canonical' href='https://thinhtran.dev' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ayesha Fayyaz",
              jobTitle: "Full Stack Developer",
              description:
                "Experienced full-stack developer specializing in React, Node.js, and modern web technologies.",
              url: "https://thinhtran.dev",
              sameAs: [
                "https://linkedin.com/in/thinhtran",
                "https://github.com/thinhtran",
                "https://twitter.com/thinhtran",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          forcedTheme='dark'
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
