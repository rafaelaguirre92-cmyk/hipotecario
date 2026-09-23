import Link from "next/link";
import {
  Check,
  X,
  Shield,
  HelpCircle,
  TrendingDown,
  Clock,
  Briefcase,
  FileCheck2,
} from "lucide-react";

export function ValueProp() {
  const comparison = [
    {
      feature: "¿Costo de la asesoría para ti?",
      broker: "Gratis (0 pesos)",
      bank: "Gratis, pero limitado a su único producto",
    },
    {
      feature: "Opciones evaluadas",
      broker: "Comparamos +10 bancos en paralelo",
      bank: "Solo el catálogo de ese banco específico",
    },
    {
      feature: "Objetividad y lealtad",
      broker: "Buscamos la opción que más te ahorre a ti",
      bank: "Su ejecutivo debe cumplir metas de su sucursal",
    },
    {
      feature: "Impacto en Buró de Crédito",
      broker: "Precalificación centralizada inteligente",
      bank: "Consultas dispersas que pueden castigar tu score",
    },
    {
      feature: "Acompañamiento en Notaría de NL",
      broker: "Revisión de proyecto de escrituras y presencia",
      bank: "Normalmente delegan a una mesa de control distante",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
            Diferenciador SOC Living
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight mt-1">
            ¿Por qué tramitar con un Asesor Hipotecario en vez de ir al banco?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            No tienes que recorrer sucursales bancarias en Monterrey. Centralizamos todo tu proceso
            con asesoría certificada y sin costo adicional.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="p-4 sm:p-5 font-bold">Aspecto</th>
                <th className="p-4 sm:p-5 font-bold text-forest-900 bg-forest-50/80">
                  Asesor Certificado SOC
                </th>
                <th className="p-4 sm:p-5 font-bold text-slate-500">
                  Ir directo a una sucursal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {comparison.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
                >
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-forest-950 bg-forest-50/40 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{row.broker}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600">
                    <span className="text-slate-700">{row.bank}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-forest-900 text-white shadow-md">
            <TrendingDown className="w-8 h-8 text-warm-400 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              Ahorro de dinero real
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Una diferencia de 0.50% en la tasa o un mejor seguro puede ahorrarte más de
              \$200,000 pesos en el costo total de tu hipoteca.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-forest-900 text-white shadow-md">
            <Clock className="w-8 h-8 text-emerald-400 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              Ahorro de tiempo
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nosotros integramos tu expediente, resolvemos aclaraciones y coordinamos con la
              notaría en Nuevo León para que no pierdas horas de trabajo.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-forest-900 text-white shadow-md">
            <Shield className="w-8 h-8 text-warm-400 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              Cero costo para ti
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Por ley y convenio, las instituciones bancarias remuneran al bróker por la originación.
              El banco te cobra exactamente lo mismo o incluso menos por promociones SOC.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
