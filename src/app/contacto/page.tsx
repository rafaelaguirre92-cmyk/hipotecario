import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto | Asesoría Hipotecaria SOC Living Monterrey",
  description:
    "Comunícate con un asesor hipotecario certificado en Monterrey, San Pedro y NL. Atención por WhatsApp, llamada o formulario de precalificación.",
};

export default function ContactoPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hola, me gustaría recibir asesoría para tramitar un crédito hipotecario en Monterrey."
  )}`;

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
            Estamos para ayudarte
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
            Contacta a tu Asesor Hipotecario
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Platiquemos sobre tus metas inmobiliarias. Te brindamos orientación imparcial,
            cálculos personalizados y acompañamiento integral en Nuevo León.
          </p>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-forest-950 mb-1">WhatsApp Directo</h2>
            <p className="text-xs text-slate-500 mb-3">
              Respuesta rápida para dudas, corridas y precalificaciones iniciales.
            </p>
            <span className="text-sm font-bold text-emerald-700 group-hover:underline">
              Enviar mensaje →
            </span>
          </a>

          <a
            href={`tel:${siteConfig.phoneClean}`}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-forest-700 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-forest-950 mb-1">Llamada Telefónica</h2>
            <p className="text-xs text-slate-500 mb-3">
              Llámanos de lunes a sábado de 9:00 am a 7:00 pm.
            </p>
            <span className="text-sm font-bold text-forest-900 group-hover:underline">
              {siteConfig.phone}
            </span>
          </a>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-warm-50 text-warm-600 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-forest-950 mb-1">Zona de Cobertura</h2>
            <p className="text-xs text-slate-500 mb-2">
              Atención presencial y virtual en toda el área metropolitana de Monterrey y NL.
            </p>
            <span className="text-xs font-semibold text-slate-700 block">
              Monterrey, San Pedro, Guadalupe, San Nicolás, Apodaca, Santa Catarina, Santiago.
            </span>
          </div>
        </div>

        {/* Lead form on contact page */}
        <LeadForm defaultOperation="comprar_casa" />
      </div>
    </div>
  );
}
