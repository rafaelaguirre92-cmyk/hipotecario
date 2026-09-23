"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function FloatingWhatsApp() {
  const message = "Hola, me gustaría revisar mis opciones de crédito hipotecario en Monterrey.";
  const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <aside
      aria-label="Contacto por WhatsApp"
      className="fixed bottom-6 right-5 z-40 flex items-center group"
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        ¿Dudas? Habla con el asesor SOC
      </span>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-green-500/30"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
        {/* Ping pulse badge */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
      </a>
    </aside>
  );
}
