import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { HomeSimulatorSection } from "@/components/home/HomeSimulatorSection";
import { BankPartners } from "@/components/home/BankPartners";
import { FaqSection } from "@/components/home/FaqSection";
import { CheckCircle2, FileCheck } from "lucide-react";

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = servicesData[params.slug];
  if (!service) return { title: "Servicio Hipotecario" };

  return {
    title: service.metaTitle,
    description: service.description,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug];
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <div className="space-y-0">
      {/* Service Hero */}
      <section className="bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800/80 border border-forest-700 text-xs font-semibold text-emerald-300">
            <Icon className="w-4 h-4 text-warm-400" />
            <span>Asesoría Hipotecaria SOC Living Monterrey</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {service.heroText}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#simulador"
              className="px-6 py-3.5 rounded-xl bg-warm-500 hover:bg-warm-400 text-forest-950 font-bold text-sm shadow-lg transition-all"
            >
              Simular este crédito
            </a>
            <Link
              href="/contacto"
              className="px-6 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-semibold text-sm border border-forest-700 transition-all"
            >
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights and Requirements */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ventajas */}
            <div className="p-6 sm:p-8 rounded-2xl bg-forest-50/70 border border-forest-100">
              <h2 className="text-lg sm:text-xl font-bold text-forest-950 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-forest-700" />
                <span>Beneficios del crédito</span>
              </h2>
              <ul className="space-y-3 text-sm text-slate-700">
                {service.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-700 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requisitos */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-forest-950 mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-forest-700" />
                <span>Requisitos habituales</span>
              </h2>
              <ul className="space-y-3 text-sm text-slate-700">
                {service.requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BankPartners />

      {/* Embedded Simulator & Lead Form configured for this service */}
      <HomeSimulatorSection />

      {/* FAQs specific to this service */}
      <FaqSection items={service.faqs} />
    </div>
  );
}
