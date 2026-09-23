import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f382a",
};

export const metadata: Metadata = {
  title: {
    default: "Simulador de Crédito Hipotecario Monterrey | Asesoría SOC Living",
    template: "%s | Hipoteca MTY",
  },
  description:
    "Simula tu crédito hipotecario en Monterrey y Nuevo León. Asesoría hipotecaria certificada SOC Living sin costo. Comparamos Scotiabank, Santander, Banorte, HSBC y más.",
  keywords: [
    "crédito hipotecario Monterrey",
    "asesor hipotecario Monterrey",
    "simulador hipotecario Nuevo León",
    "bróker hipotecario San Pedro",
    "comprar casa Monterrey crédito",
    "crédito para terreno Monterrey",
    "mejora de hipoteca Monterrey",
    "SOC Living Monterrey",
  ],
  authors: [{ name: siteConfig.advisorName }],
  creator: siteConfig.advisorName,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Simulador Hipotecario Monterrey | Hipoteca MTY",
    description:
      "Calcula tu mensualidad, compara las mejores tasas de los bancos y precalifica con un asesor certificado de SOC Living en Monterrey.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_MX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["FinancialService", "LocalBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Monterrey",
      addressRegion: "Nuevo León",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.6866,
      longitude: -100.3161,
    },
    areaServed: siteConfig.coverage,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
  };

  return (
    <html lang="es" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased selection:bg-forest-100 selection:text-forest-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
