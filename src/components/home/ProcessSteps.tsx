import {
  Calculator,
  FileSearch,
  CheckCircle,
  KeyRound,
  ArrowRight,
} from "lucide-react";

export function ProcessSteps() {
  const steps = [
    {
      number: "01",
      title: "Simula tu crédito",
      desc: "Usa nuestro simulador interactivo para estimar mensualidad, enganche necesario y plazo que mejor se adapte a tu bolsillo.",
      icon: Calculator,
    },
    {
      number: "02",
      title: "Diagnóstico multibanco",
      desc: "Analizamos tu perfil ante Santander, Scotiabank, Banorte, HSBC, Citibanamex y más para seleccionar la tasa y condiciones más favorables.",
      icon: FileSearch,
    },
    {
      number: "03",
      title: "Aprobación y autorización",
      desc: "Integramos tu expediente completo y gestionamos la carta de aprobación formal ante la institución bancaria elegida.",
      icon: CheckCircle,
    },
    {
      number: "04",
      title: "Firma y entrega de llaves",
      desc: "Coordinamos el avalúo y la notaría en Nuevo León para el día de la firma de escrituras. Te acompañamos personalmente en cada paso.",
      icon: KeyRound,
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
            Paso a Paso
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight mt-1">
            ¿Cómo funciona nuestro acompañamiento?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Olvídate de hacer filas o negociar con bancos que buscan venderte su único producto.
            Nosotros velamos por tu conveniencia de inicio a fin sin cobrarte honorarios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-forest-900/20">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center border border-forest-100">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-forest-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-forest-800">
                  <span>Paso {idx + 1} de 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
