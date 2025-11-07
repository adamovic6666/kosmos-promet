import "./globals.css";
import Header from "./_components/header/Header";
import Footer from "./_components/footer/Footer";
import type { Metadata } from "next";
import ogImage from "../public/images/og.webp";
import GoogleAnalytics from "./_components/google-analytics/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kosmospromet.com/"),
  applicationName: "Kosmos Promet",
  title: "Delovi za prskalice i atomizere | Kosmos Promet",
  description:
    "Širok asortiman delova za prskalice i atomizere po povoljnim cenama. Dostupni odmah uz brzu isporuku i stručnu tehničku podršku Kosmos Promet.",
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Kosmos Promet | Delovi za prskalice i atomizere",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
