import { siteConfig } from "@/config/site";
import { Building, ShieldCheck } from "lucide-react";

export function BankPartners() {
  return (
    <section className="py-10 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-forest-800">
            Alianzas Estratégicas de Financiamiento
          </p>
          <h3 className="text-sm sm:text-base font-semibold text-slate-700 mt-1">
            Tramitamos tu crédito con las principales instituciones bancarias de México
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 items-center justify-center">
          {siteConfig.partnerBanks.map((bank) => (
            <div
              key={bank.slug}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-forest-700 hover:bg-forest-50/50 transition-colors text-center group"
            >
              <Building className="w-5 h-5 text-slate-400 group-hover:text-forest-800 transition-colors mb-1" />
              <span className="text-xs font-bold text-slate-800 tracking-tight">
                {bank.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 text-center">
          <p className="text-xs text-slate-500 inline-flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
            <span>
              Un solo trámite para comparar ofertas simultáneas sin afectar tu Buró de Crédito
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
