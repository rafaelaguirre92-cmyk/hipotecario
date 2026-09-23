"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

export const defaultFaqs: FaqItem[] = [
  {
    q: "¿Por qué el servicio de asesoría hipotecaria no tiene costo para mí?",
    a: "Las instituciones bancarias aliadas cubren los honorarios del bróker hipotecario bajo convenios oficiales establecidos. El banco te otorgará exactamente la misma tasa y condiciones (o incluso mejores promociones exclusivas) que si acudieras directamente a una sucursal.",
  },
  {
    q: "¿Cuánto enganche necesito como mínimo para comprar una casa en Monterrey?",
    a: "La mayoría de los bancos comerciales solicitan al menos el 10% del valor de la propiedad como enganche. No obstante, si cuentas con saldo en tu Subcuenta de Vivienda Infonavit mediante esquemas como Cofinavit o Apoyo Infonavit, es posible financiar hasta el 95% o 100% del valor del inmueble.",
  },
  {
    q: "¿Cuánto se paga de gastos de escrituración y notaría en Nuevo León?",
    a: "En Monterrey y su área metropolitana, los gastos notariales oscilan típicamente entre el 4.5% y el 6% del valor total de la propiedad. Esto incluye el Impuesto Sobre Adquisición de Inmuebles (ISAI, que en NL es del 3%), honorarios notariales, derechos de inscripción en el Registro Público de la Propiedad y avalúo comercial.",
  },
  {
    q: "¿Qué tasa de interés puedo conseguir en 2026?",
    a: "Actualmente las tasas del mercado bancario mexicano van desde el 8.80% hasta el 11.50% anual fija, dependiendo de tu perfil crediticio, monto financiado, enganche aportado y la institución elegida. Nuestro trabajo es colocarte en el banco que te brinde la tasa más competitiva para tu situación particular.",
  },
  {
    q: "¿Puedo tramitar un crédito si trabajo por honorarios, RESICO o tengo negocio propio?",
    a: "¡Sí, totalmente! Existen bancos con políticas muy flexibles para personas físicas con actividad empresarial (PFAE), profesionistas independientes en RESICO y accionistas de empresas. Analizamos tus estados de cuenta y declaraciones ante el SAT para comprobar tu flujo de ingresos.",
  },
  {
    q: "¿Simular en este sitio afecta mi score de Buró de Crédito?",
    a: "No. El simulador de nuestro sitio realiza cálculos matemáticos y proyecciones orientativas sin consultar tu historial crediticio. Solo se realiza una consulta formal cuando decides iniciar el expediente y otorgas tu autorización por escrito.",
  },
];

export function FaqSection({ items = defaultFaqs }: { items?: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-forest-700" />
            Resolvemos tus dudas
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight mt-1">
            Preguntas Frecuentes sobre Créditos Hipotecarios
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Todo lo que necesitas saber antes de solicitar tu financiamiento en Monterrey y NL.
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-forest-950 hover:text-forest-800"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-forest-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
