import "./globals.css";
import Header from "./_components/header/Header";
import Footer from "./_components/footer/Footer";
import type { Metadata } from "next";
import ogImage from "../public/images/og.webp";
import GoogleAnalytics from "./_components/google-analytics/GoogleAnalytics";
import { CartProvider } from "./_context/CartContext";
import TopBar from "./_components/top-bar/TopBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kosmospromet.com/"),
  applicationName: "Kosmos Promet",
  title: "Delovi za prskalice i atomizere | Kosmos Promet",
  description:
    "Prodaja regulatora, pumpi, dizni i ostale opreme za prskalice i atomizere. Najveći lager rezervnih delova. Provereni kvalitet i brza isporuka. Poruči online!",
  keywords: [
    "prskalice",
    "atomizeri",
    "delovi za prskalice",
    "regulatori",
    "pumpe za prskalice",
    "dizne",
    "oprema za poljoprivredu",
    "rezervni delovi",
    "Kosmos Promet",
  ],
  authors: [{ name: "Kosmos Promet" }],
  creator: "Kosmos Promet",
  publisher: "Kosmos Promet",
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Delovi za prskalice i atomizere | Kosmos Promet",
    description:
      "Širok asortiman delova za prskalice i atomizere po povoljnim cenama. Dostupni odmah uz brzu isporuku i stručnu tehničku podršku Kosmos Promet.",
    url: "https://www.kosmospromet.com/",
    siteName: "Kosmos Promet",
    images: [
      {
        url: ogImage.src,
        width: 1200,
        height: 630,
        alt: "Kosmos Promet",
      },
    ],
    locale: "sr_RS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delovi za prskalice i atomizere | Kosmos Promet",
    description:
      "Širok asortiman delova za prskalice i atomizere po povoljnim cenama. Dostupni odmah uz brzu isporuku.",
    images: [ogImage.src],
  },
  alternates: {
    canonical: "https://www.kosmospromet.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization JSON-LD Schema for AI Crawlers
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kosmos Promet",
    url: "https://www.kosmospromet.com",
    logo: "https://www.kosmospromet.com/images/og.webp",
    description:
      "Prodaja regulatora, pumpi, dizni i ostale opreme za prskalice i atomizere. Najveći lager rezervnih delova.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["Serbian"],
    },
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kosmos Promet",
    url: "https://www.kosmospromet.com",
    description:
      "Prodaja regulatora, pumpi, dizni i ostale opreme za prskalice i atomizere. Najveći lager rezervnih delova.",
    publisher: {
      "@type": "Organization",
      name: "Kosmos Promet",
    },
  };

  return (
    <html lang="sr">
      <head>
        {/* JSON-LD Structured Data for AI Crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <CartProvider>
          <TopBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
