import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  ShieldCheck,
  Calculator,
  MessageCircle,
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function Hero() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hola, me gustaría revisar opciones para tramitar un crédito hipotecario en Monterrey."
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-500/10 via-forest-700/20 to-warm-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800/80 border border-forest-700/80 text-xs sm:text-sm font-medium text-emerald-300 shadow-sm backdrop-blur-sm">
            <Award className="w-4 h-4 text-warm-400 shrink-0" />
            <span>Asesor Certificado SOC Living • Monterrey y Área Metropolitana</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Encuentra el mejor{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-warm-300">
              crédito hipotecario
            </span>{" "}
            para tu próximo hogar en Monterrey
          </h1>

          {/* Value Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Comparamos las tasas y condiciones de los principales bancos de México para que elijas
            la opción que más te conviene.{" "}
            <strong className="text-white font-semibold">
              Nuestra asesoría y gestión es 100% gratuita para ti.
            </strong>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="#simulador"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-400 hover:to-warm-500 text-forest-950 font-bold text-base shadow-xl hover:shadow-warm-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              <span>Quiero saber cuánto crédito puedo obtener</span>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-forest-800/80 hover:bg-forest-800 text-white font-semibold text-base border border-forest-700 hover:border-emerald-500/50 shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Hablar por WhatsApp</span>
            </a>
          </div>

          {/* Mini Highlights */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-forest-900/60 p-2.5 rounded-xl border border-forest-800/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sin costo para el cliente (el banco cubre honorarios)</span>
            </div>
            <div className="flex items-center gap-2 bg-forest-900/60 p-2.5 rounded-xl border border-forest-800/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Comparamos +10 bancos en una sola solicitud</span>
            </div>
            <div className="flex items-center gap-2 bg-forest-900/60 p-2.5 rounded-xl border border-forest-800/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Acompañamiento hasta la firma de escrituras</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
