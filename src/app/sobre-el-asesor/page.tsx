import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Award,
  ShieldCheck,
  Building,
  CheckCircle2,
  FileText,
  Users,
  MessageCircle,
  Phone,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre el Asesor Hipotecario Certificado SOC Living",
  description:
    "Conoce a tu asesor hipotecario certificado SOC Living en Monterrey y Nuevo León. Asesoría integral, transparente e imparcial sin costo para ti.",
};

export default function SobreElAsesorPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hola, me gustaría agendar una llamada con el asesor hipotecario."
  )}`;

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Profile Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Advisor Avatar / Portrait Card */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 p-1 shadow-xl flex items-center justify-center">
                <div className="w-full h-full rounded-2xl bg-forest-950 flex flex-col items-center justify-center text-white p-4">
                  <div className="w-20 h-20 rounded-full bg-forest-800 flex items-center justify-center mb-3 border-2 border-emerald-400">
                    <Award className="w-10 h-10 text-warm-400" />
                  </div>
                  <span className="text-base font-bold text-white leading-tight">
                    {siteConfig.advisorName}
                  </span>
                  <span className="text-[11px] text-emerald-300 mt-1 uppercase tracking-wider font-semibold">
                    Asesor Certificado SOC
                  </span>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs text-forest-900 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
                <span>Certificación Vigente SOC Living</span>
              </div>
            </div>

            {/* Bio Info */}
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
                Tu Aliado Financiero en Monterrey
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-forest-950 tracking-tight">
                Asesoría Hipotecaria Imparcial y Cercana
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Comprar una casa o adquirir un crédito hipotecario es probablemente una de las
                decisiones patrimoniales más importantes de tu vida. Mi labor como asesor
                certificado de la red <strong>SOC Living</strong> en Nuevo León es acompañarte
                desde el primer número en el simulador hasta la firma de escrituras en la notaría.
              </p>

              <div className="p-4 rounded-xl bg-forest-50/60 border border-forest-200 text-xs sm:text-sm text-forest-950 space-y-1">
                <strong className="block text-forest-900 font-bold">
                  ¿Cómo funciona mi intervención?
                </strong>
                <p className="text-slate-700 leading-relaxed">
                  No presto dinero de manera directa ni soy empleado de un solo banco. Soy un
                  intermediario profesional avalado por las instituciones financieras más sólidas del
                  país. Analizo tu situación particular, comparo los productos del mercado y gestiono
                  tu expediente ante el banco que te ofrezca la tasa más conveniente.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-forest-900 text-white font-bold text-xs sm:text-sm hover:bg-forest-800 transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-warm-400" />
                  <span>Platicar por WhatsApp</span>
                </a>
                <Link
                  href="/#simulador"
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm hover:bg-slate-200 transition-colors"
                >
                  Ir al simulador
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Compromisos del Asesor */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-forest-950">
              Mis 4 compromisos contigo
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Principios que rigen cada expediente que gestionamos en Monterrey y Nuevo León.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-forest-950 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Sin Costo de Honorarios</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                El banco al que tú decidas ir cubre nuestra remuneración por convenio institucional.
                Tú nunca pagarás un solo peso extra por nuestra asesoría y trámite.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-forest-950 text-sm">
                <Building className="w-4 h-4 text-emerald-600" />
                <span>Comparativa Multibanco Real</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Te mostramos corridas financieras transparentes de Scotiabank, Santander, Banorte,
                HSBC, Citibanamex y Afirme, para que tomes una decisión fundamentada con datos reales.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-forest-950 text-sm">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Protección de tu Buró de Crédito</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evitamos que tu score se deteriore ingresando solicitudes a ciegas. Evaluamos tu
                capacidad primero con un dictamen preliminar antes de cualquier consulta formal.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-forest-950 text-sm">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Acompañamiento hasta Notaría</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Coordinamos avalúos, certificados de libertad de gravamen y la redacción del proyecto
                notarial en Nuevo León para que el día de la firma no haya sorpresas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
