import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayesha Fayaz | Marketing & Admin Professional",
  description:
    "Results-driven marketing and admin professional with expertise in client engagement, real estate operations, and HR processes. Based in Dubai, UAE.",
  keywords: [
    "marketing",
    "admin",
    "HR assistant",
    "real estate",
    "client engagement",
    "social media",
    "conveyancer",
    "Dubai",
    "UAE",
    "portfolio",
  ],
  authors: [{ name: "Ayesha Fayaz" }],
  creator: "Ayesha Fayaz",
  publisher: "Ayesha Fayaz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ayeshafayyaz.me"),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon/favicon.svg", color: "#3b82f6" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayeshafayyaz.me",
    title: "Ayesha Fayaz - Marketing & Admin Professional",
    description:
      "Results-driven marketing and admin professional with expertise in client engagement, real estate operations, and HR processes. Skilled in communication, data organization, and digital content creation. Based in Dubai, UAE.",
    siteName: "Ayesha Fayaz Portfolio",
    images: [
      {
        url: "https://ayeshafayyaz.me/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "Ayesha Fayaz - Marketing & Admin Professional Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ayesha Fayaz - Marketing & Admin Professional",
    description:
      "Results-driven marketing and admin professional with expertise in client engagement, real estate operations, and HR processes. Skilled in communication, data organization, and digital content creation. Based in Dubai, UAE.",
    images: ["https://ayeshafayyaz.me/og-image-square.png"],
    creator: "@ayeshafayaz",
    site: "@ayeshafayaz",
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
  alternates: {
    canonical: "https://ayeshafayyaz.me",
  },
  other: {
    "msapplication-TileColor": "#3b82f6",
    "theme-color": "#3b82f6",
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
        <link rel='canonical' href='https://ayeshafayyaz.me' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='theme-color' content='#3b82f6' />
        <meta name='msapplication-TileColor' content='#3b82f6' />
        <meta name='msapplication-config' content='/browserconfig.xml' />
        
        {/* WhatsApp and Meta specific meta tags */}
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='1200' />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:alt' content='Ayesha Fayaz - Marketing & Admin Professional Portfolio' />
        
        {/* Additional social media meta tags */}
        <meta name='twitter:image:alt' content='Ayesha Fayaz - Marketing & Admin Professional Portfolio' />
        <meta name='twitter:site' content='@ayeshafayaz' />
        
        {/* WhatsApp specific */}
        <meta property='og:image:secure_url' content='https://ayeshafayyaz.me/og-image-square.png' />
        
        {/* LinkedIn specific */}
        <meta property='og:image:url' content='https://ayeshafayyaz.me/og-image-square.png' />
        
        {/* Additional OG tags for better sharing */}
        <meta property='og:description' content='Results-driven marketing and admin professional with expertise in client engagement, real estate operations, and HR processes. Skilled in communication, data organization, and digital content creation. Based in Dubai, UAE.' />
        <meta property='og:title' content='Ayesha Fayaz - Marketing & Admin Professional' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://ayeshafayyaz.me' />
        <meta property='og:site_name' content='Ayesha Fayaz Portfolio' />
        
        {/* Twitter specific additional tags */}
        <meta name='twitter:description' content='Results-driven marketing and admin professional with expertise in client engagement, real estate operations, and HR processes. Skilled in communication, data organization, and digital content creation. Based in Dubai, UAE.' />
        <meta name='twitter:title' content='Ayesha Fayaz - Marketing & Admin Professional' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ayesha Fayaz",
              jobTitle: "Marketing & Admin Professional",
              description:
                "Results-driven marketing and admin professional with expertise in client engagement, real estate operations, and HR processes.",
              url: "https://ayeshafayyaz.me",
              email: "ayeshafayaz97@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "UAE"
              },
              sameAs: [
                "https://linkedin.com/in/ayesha-fayaz-42717524a",
              ],
              knowsAbout: [
                "Marketing",
                "Administration", 
                "HR Processes",
                "Real Estate Operations",
                "Client Engagement",
                "Social Media Management",
                "Data Organization",
                "Digital Content Creation"
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance Professional"
              }
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
