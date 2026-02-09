import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stranica nije pronađena - 404 | Kosmos Promet",
  description: "Tražena stranica ne postoji ili je premeštena.",
  robots: {
    index: false, // Don't index 404 pages
    follow: true, // But follow links on them
  },
};

export default function NotFound() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <div className="space-y-6">
          <h1 className="text-8xl font-bold text-gray-300">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800">
            Stranica nije pronađena
          </h2>
          <p className="text-lg text-gray-600">
            Žao nam je, stranica koju tražite ne postoji ili je premeštena.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Nazad na početnu
            </Link>
            <Link
              href="/prodavnica"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Pogledaj proizvode
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
