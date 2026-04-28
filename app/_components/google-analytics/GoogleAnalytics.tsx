"use client";
import { GoogleAnalytics as NextGA } from "@next/third-parties/google";
import CookieConsent from "./CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  return (
    <>
      {GA_ID && <NextGA gaId={GA_ID} />}
      <CookieConsent onPreferenceChange={() => {}} />
    </>
  );
}
