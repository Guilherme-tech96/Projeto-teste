import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/MotionProvider";
import { QuoteProvider } from "@/components/quote/QuoteProvider";
import { OFFICES, SITE } from "@/lib/content";

const title = "NAVA Maritime Transport — Moving the World Across the Sea";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: "%s · NAVA Maritime Transport" },
  description: SITE.description,
  applicationName: SITE.legalName,
  keywords: [
    "maritime transport",
    "ocean freight",
    "shipping company",
    "container shipping",
    "international logistics",
    "project cargo",
    "port logistics",
    "freight forwarding",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.legalName,
    title,
    description: SITE.description,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#020a18",
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  email: SITE.email,
  description: SITE.description,
  address: OFFICES.map((o) => ({ "@type": "PostalAddress", addressLocality: o.city, streetAddress: o.address })),
  sameAs: ["https://www.linkedin.com/", "https://x.com/", "https://www.instagram.com/", "https://www.youtube.com/"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-white px-5 py-3 font-semibold text-navy-900 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <QuoteProvider>{children}</QuoteProvider>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
