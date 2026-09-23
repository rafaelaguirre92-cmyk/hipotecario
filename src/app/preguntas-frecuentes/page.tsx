import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FaqSection } from "@/components/home/FaqSection";
import { MessageCircle, Calculator, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes sobre Crédito Hipotecario en Monterrey",
  description:
    "Respuestas a las dudas más comunes sobre enganches, tasas de interés, trámites notariales en Nuevo León, Cofinavit y buró de crédito.",
};

const fullFaqList = [
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
  {
    q: "¿Puedo mancomunar ingresos con mi pareja o un familiar?",
    a: "Sí. Casi todos los bancos permiten mancomunar o sumar ingresos con tu cónyuge (estén o no casados por el civil en varios casos), e incluso con padres, hijos o parejas en concubinato. Esto permite alcanzar una línea de crédito mayor para adquirir una propiedad de mayor valor.",
  },
  {
    q: "¿Cuánto tiempo toma el trámite desde la solicitud hasta la firma?",
    a: "En promedio, una autorización bancaria se obtiene en 3 a 5 días hábiles una vez entregado el expediente completo. El proceso total (que involucra avalúo y la notaría pública en Nuevo León) toma típicamente entre 3 y 5 semanas hasta el día de la firma de escrituras.",
  },
  {
    q: "¿Qué seguros vienen incluidos en la mensualidad hipotecaria?",
    a: "Las mensualidades bancarias suelen integrar Seguro de Vida (que liquida el saldo en caso de fallecimiento del titular) y Seguro de Daños al inmueble (que protege la vivienda contra incendios, sismos o fenómenos hidrometeorológicos). Te explicamos el costo exacto de cada póliza al comparar los bancos.",
  },
];

export default function PreguntasFrecuentesPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hola, tengo una pregunta específica sobre créditos hipotecarios en Monterrey."
  )}`;

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100 text-forest-900 text-xs font-semibold">
            <HelpCircle className="w-4 h-4 text-forest-700" />
            <span>Centro de Respuestas Hipotecarias</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
            Preguntas Frecuentes
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hemos reunido las dudas más habituales de quienes buscan comprar casa, terreno o
            mejorar su hipoteca en Monterrey y Nuevo León.
          </p>
        </div>

        <FaqSection items={fullFaqList} />

        {/* CTA Banner */}
        <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold">
            ¿Tienes un caso especial o dudas sobre tu historial?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Cada perfil tiene alternativas viables en diferentes bancos. Platiquemos por WhatsApp
            para orientarte de manera personalizada y sin ningún costo.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-warm-500 hover:bg-warm-400 text-forest-950 font-bold text-sm shadow transition-all inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Preguntar por WhatsApp</span>
            </a>
            <Link
              href="/#simulador"
              className="px-6 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-semibold text-sm border border-forest-700 transition-all inline-flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-warm-400" />
              <span>Calcular mi mensualidad</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
