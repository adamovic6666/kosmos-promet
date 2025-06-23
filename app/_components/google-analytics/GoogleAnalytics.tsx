"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { ConsentOptions } from "@/app/_types";
import CookieConsent from "./CookieConsent";

export default function GoogleAnalytics() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreferenceChange = (preferences: ConsentOptions) => {
    setAnalyticsEnabled(preferences.analytics);
  };

  if (!mounted) {
    // Don't render anything during server-side rendering to avoid hydration issues
    return null;
  }

  return (
    <>
      {analyticsEnabled && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-1B95DXE85C"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-1B95DXE85C');
            `}
          </Script>
        </>
      )}
      <CookieConsent onPreferenceChange={handlePreferenceChange} />
    </>
  );
}
