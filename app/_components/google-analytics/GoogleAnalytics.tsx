"use client";
import { GoogleAnalytics as NextGA } from "@next/third-parties/google";
import { ConsentOptions } from "@/app/_types";
import CookieConsent from "./CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePreferenceChange = (_preferences: ConsentOptions) => {
    // Analytics always enabled — cookie choice does not affect tracking
  };

  return (
    <>
      {GA_ID && <NextGA gaId={GA_ID} />}
      <CookieConsent onPreferenceChange={handlePreferenceChange} />
    </>
  );
}
