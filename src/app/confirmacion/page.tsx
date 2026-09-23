"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { formatCurrency } from "@/lib/mortgageCalculator";
import {
  CheckCircle2,
  MessageCircle,
  PhoneCall,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Calendar,
} from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const leadId = searchParams?.get("leadId") || "MTY-PENDIENTE";
  const nombre = searchParams?.get("nombre") || "Estimado cliente";
  const operacion = searchParams?.get("operacion") || "comprar_casa";
  const valor = Number(searchParams?.get("valor") || 3000000);
  const enganche = Number(searchParams?.get("enganche") || 600000);
  const mensualidad = Number(searchParams?.get("mensualidad") || 22867);
  const rawWhatsappUrl = searchParams?.get("whatsappUrl");

  const operationLabels: Record<string, string> = {
    comprar_casa: "Comprar casa o departamento",
    comprar_terreno: "Comprar terreno",
    construir: "Construcción en terreno",
    remodelar: "Remodelación de vivienda",
    mejorar_hipoteca: "Mejorar o sustituir hipoteca",
    obtener_liquidez: "Liquidez hipotecaria",
  };

  const operationName = operationLabels[operacion] || operacion;

  // Si no venía URL en searchParams, construirla
  const fallbackMessage = [
    `¡Hola! Quiero revisar mis opciones de crédito hipotecario.`,
    ``,
    `*Folio:* ${leadId}`,
    `*Nombre:* ${nombre}`,
    `*Operación:* ${operationName}`,
    `*Valor de propiedad:* ${formatCurrency(valor)}`,
    `*Enganche:* ${formatCurrency(enganche)}`,
    `*Mensualidad estimada:* ${formatCurrency(mensualidad)}`,
  ].join("\n");

  const whatsappUrl =
    rawWhatsappUrl ||
    `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(fallbackMessage)}`;

  return (
    <div className="min-h-[80vh] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 text-center space-y-6">
        {/* Success Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Title and Confirmation Notice */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Folio de Registro: {leadId}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
            Recibimos tu información correctamente
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            ¡Gracias, <strong>{nombre}</strong>! Un asesor hipotecario certificado revisará tus
            datos iniciales y se pondrá en contacto contigo para entender mejor tu caso y
            presentarte la mejor estrategia crediticia.
          </p>
        </div>

        {/* Resumen del perfil registrado */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left text-xs sm:text-sm space-y-2">
          <div className="font-bold text-forest-950 border-b border-slate-200 pb-2 mb-2 flex items-center justify-between">
            <span>Resumen de tu proyecto</span>
            <span className="text-emerald-700 text-xs font-medium">{operationName}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-slate-700">
            <div>
              <span className="text-slate-500 block text-[11px]">Valor de propiedad:</span>
              <span className="font-semibold">{formatCurrency(valor)}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Enganche contemplado:</span>
              <span className="font-semibold">{formatCurrency(enganche)}</span>
            </div>
            <div className="col-span-2 pt-1 border-t border-slate-200/60">
              <span className="text-slate-500 block text-[11px]">Mensualidad estimada calculada:</span>
              <span className="font-bold text-forest-900 text-base">
                {formatCurrency(mensualidad)} / mes*
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer orientativo */}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 text-left flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            Recuerda que la simulación es <strong>orientativa</strong> y no representa una
            aprobación ni cotización oficial. La tasa y condiciones definitivas dependen del
            dictamen de crédito de la institución seleccionada.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Button 1: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base shadow-lg hover:shadow-green-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Enviar mensaje por WhatsApp ahora</span>
          </a>

          {/* Button 2: Call or Schedule */}
          <a
            href={`tel:${siteConfig.phoneClean}`}
            className="w-full py-3.5 px-6 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm shadow active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-warm-400" />
            <span>Llamar al Asesor ({siteConfig.phone})</span>
          </a>

          {/* Button 3: Return to simulator */}
          <div className="pt-2">
            <Link
              href="/#simulador"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-forest-900 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al simulador hipotecario</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
          Cargando confirmación...
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
