"use client";

import { useState, useId } from "react";
import {
  calculateMortgage,
  formatCurrency,
  formatPercent,
  MortgageCalculationResult,
} from "@/lib/mortgageCalculator";
import { siteConfig } from "@/config/site";
import { EmploymentType } from "@/types";
import {
  Calculator,
  ArrowRight,
  Info,
  Sliders,
  ChevronDown,
  ChevronUp,
  Percent,
  AlertTriangle,
  Building2,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

interface SimulatorProps {
  initialPropertyValue?: number;
  initialDownPayment?: number;
  initialTerm?: number;
  initialRate?: number;
  onSelectCredit?: (data: MortgageCalculationResult & {
    monthlyIncome?: number;
    employmentType?: EmploymentType;
    maxMonthlyPayment?: number;
    isFirstHome?: boolean;
    cityOrState?: string;
  }) => void;
}

export function Simulator({
  initialPropertyValue = 3000000,
  initialDownPayment = 600000,
  initialTerm = 20,
  initialRate = 9.85,
  onSelectCredit,
}: SimulatorProps) {
  // Inputs obligatorios
  const [propertyValue, setPropertyValue] = useState<number>(initialPropertyValue);
  const [downPayment, setDownPayment] = useState<number>(initialDownPayment);
  const [termYears, setTermYears] = useState<number>(initialTerm);
  const [annualRate, setAnnualRate] = useState<number>(initialRate);
  const [rateScenario, setRateScenario] = useState<string>("media");

  // Inputs opcionales
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<EmploymentType>("nomina");
  const [maxMonthlyPayment, setMaxMonthlyPayment] = useState<string>("");
  const [isFirstHome, setIsFirstHome] = useState<boolean>(true);
  const [cityOrState, setCityOrState] = useState<string>("Monterrey, NL");

  const propValueInputId = useId();
  const downPaymentInputId = useId();
  const annualRateInputId = useId();
  const monthlyIncomeInputId = useId();
  const employmentTypeInputId = useId();
  const maxPaymentInputId = useId();
  const cityInputId = useId();

  // Cálculo en tiempo real
  const calc = calculateMortgage(propertyValue, downPayment, termYears, annualRate);

  // Manejo de cambio de porcentaje directo de enganche
  const handlePercentChange = (percent: number) => {
    const newDownPayment = Math.round((propertyValue * percent) / 100);
    setDownPayment(newDownPayment);
  };

  // Manejo de escenarios de tasa
  const handleScenarioSelect = (scenario: "baja" | "media" | "alta" | "custom") => {
    setRateScenario(scenario);
    if (scenario === "baja") setAnnualRate(8.8);
    if (scenario === "media") setAnnualRate(9.85);
    if (scenario === "alta") setAnnualRate(11.2);
  };

  const handleProceed = () => {
    if (onSelectCredit) {
      onSelectCredit({
        ...calc,
        monthlyIncome: monthlyIncome ? Number(monthlyIncome) : undefined,
        employmentType,
        maxMonthlyPayment: maxMonthlyPayment ? Number(maxMonthlyPayment) : undefined,
        isFirstHome,
        cityOrState,
      });
    }

    // Smooth scroll to lead form
    const formElement = document.getElementById("formulario-prospecto");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isLowDownPayment = calc.downPaymentPercent < 10;
  const isHighDownPayment = calc.downPayment >= propertyValue;

  return (
    <section
      id="simulador"
      className="scroll-mt-20 py-12 md:py-16 bg-gradient-to-b from-slate-50 via-forest-50/30 to-slate-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100/80 text-forest-900 text-xs font-semibold mb-3 border border-forest-200">
            <Calculator className="w-4 h-4 text-forest-700" />
            <span>Simulador Financiero 2026 • Monterrey y NL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-forest-950 tracking-tight">
            Calcula tu mensualidad hipotecaria
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Ajusta el valor de la propiedad, tu enganche y el plazo deseado. Esta simulación
            es orientativa y te permite proyectar tu presupuesto antes de tramitar con los bancos.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Input Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-6">
            {/* Input 1: Valor de la propiedad */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label
                  htmlFor={propValueInputId}
                  className="text-sm font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <Building2 className="w-4 h-4 text-forest-700" />
                  <span>Valor de la propiedad</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                    $
                  </span>
                  <input
                    id={propValueInputId}
                    type="number"
                    min={500000}
                    max={30000000}
                    step={50000}
                    value={propertyValue}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPropertyValue(val);
                      if (downPayment > val) setDownPayment(Math.round(val * 0.2));
                    }}
                    className="w-36 sm:w-44 text-right pr-3 pl-7 py-1.5 text-sm sm:text-base font-bold text-forest-950 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-700 focus:border-forest-700 outline-none"
                  />
                </div>
              </div>

              <input
                type="range"
                min={800000}
                max={15000000}
                step={50000}
                value={propertyValue}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setPropertyValue(val);
                  if (downPayment > val) setDownPayment(Math.round(val * 0.2));
                }}
                className="w-full accent-forest-800"
                aria-label="Ajustar valor de propiedad"
              />

              <div className="flex justify-between text-xs text-slate-500">
                <span>$800,000</span>
                <span className="font-semibold text-forest-800">
                  {formatCurrency(propertyValue)}
                </span>
                <span>$15,000,000+</span>
              </div>
            </div>

            {/* Input 2: Enganche disponible */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <label
                    htmlFor={downPaymentInputId}
                    className="text-sm font-bold text-slate-800 flex items-center gap-1.5"
                  >
                    <Percent className="w-4 h-4 text-forest-700" />
                    <span>Enganche disponible</span>
                  </label>
                  <span className="text-xs text-slate-500">
                    Aportas el{" "}
                    <strong className="text-forest-800">
                      {calc.downPaymentPercent}%
                    </strong>{" "}
                    del inmueble
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                    $
                  </span>
                  <input
                    id={downPaymentInputId}
                    type="number"
                    min={0}
                    max={propertyValue}
                    step={25000}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-36 sm:w-44 text-right pr-3 pl-7 py-1.5 text-sm sm:text-base font-bold text-forest-950 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-700 focus:border-forest-700 outline-none"
                  />
                </div>
              </div>

              <input
                type="range"
                min={propertyValue * 0.05}
                max={propertyValue * 0.7}
                step={25000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-forest-800"
                aria-label="Ajustar enganche"
              />

              {/* Botones rápidos de porcentaje */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Sugerido:</span>
                {[10, 15, 20, 30].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handlePercentChange(pct)}
                    className={`text-xs px-2.5 py-1 rounded-md border font-semibold transition-colors ${
                      Math.abs(calc.downPaymentPercent - pct) < 1
                        ? "bg-forest-900 text-white border-forest-900"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>

              {isLowDownPayment && (
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 text-amber-800 text-xs border border-amber-200">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>
                    La mayoría de las instituciones bancarias en México requieren un enganche
                    mínimo del <strong>10%</strong> (salvo con esquemas Cofinavit o Apoyo Infonavit).
                  </span>
                </div>
              )}

              {isHighDownPayment && (
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-red-50 text-red-800 text-xs border border-red-200">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  <span>
                    El enganche no puede ser igual o mayor al valor de la propiedad para solicitar un crédito.
                  </span>
                </div>
              )}
            </div>

            {/* Input 3: Plazo en años */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-sm font-bold text-slate-800 block">
                Plazo del crédito
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[5, 10, 15, 20].map((years) => (
                  <button
                    key={years}
                    type="button"
                    onClick={() => setTermYears(years)}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all ${
                      termYears === years
                        ? "bg-forest-900 text-white border-forest-900 shadow-sm font-bold"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium"
                    }`}
                  >
                    <span className="block text-sm sm:text-base">{years} años</span>
                    <span className="block text-[11px] opacity-80">{years * 12} pagos</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input 4: Tasa anual de referencia y Escenarios */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <label
                    htmlFor={annualRateInputId}
                    className="text-sm font-bold text-slate-800 block"
                  >
                    Tasa de referencia anual
                  </label>
                  <span className="text-xs text-slate-500">
                    Tasa ilustrativa orientativa
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    id={annualRateInputId}
                    type="number"
                    min={6}
                    max={22}
                    step={0.05}
                    value={annualRate}
                    onChange={(e) => {
                      setAnnualRate(Number(e.target.value));
                      setRateScenario("custom");
                    }}
                    className="w-20 text-right pr-2 pl-2 py-1.5 text-sm sm:text-base font-bold text-forest-950 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-700 outline-none"
                  />
                  <span className="text-sm font-bold text-slate-600">%</span>
                </div>
              </div>

              {/* Escenarios de tasa */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleScenarioSelect("baja")}
                  className={`p-2 rounded-lg border text-left text-xs transition-colors ${
                    rateScenario === "baja"
                      ? "border-forest-700 bg-forest-50/70 text-forest-950 font-semibold"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block font-bold">Desde 8.80%</span>
                  <span className="text-[10px] text-slate-500">Tasa preferencial</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleScenarioSelect("media")}
                  className={`p-2 rounded-lg border text-left text-xs transition-colors ${
                    rateScenario === "media"
                      ? "border-forest-700 bg-forest-50/70 text-forest-950 font-semibold"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block font-bold">Promedio 9.85%</span>
                  <span className="text-[10px] text-slate-500">Estándar mercado</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleScenarioSelect("alta")}
                  className={`p-2 rounded-lg border text-left text-xs transition-colors ${
                    rateScenario === "alta"
                      ? "border-forest-700 bg-forest-50/70 text-forest-950 font-semibold"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block font-bold">11.20%</span>
                  <span className="text-[10px] text-slate-500">Escenario precavido</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                * Tasa ilustrativa desde 8.80% anual, sujeta a perfil, institución, monto, plazo y condiciones vigentes.
              </p>
            </div>

            {/* Campos Opcionales Desplegables */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full py-2 text-xs font-semibold text-slate-600 hover:text-forest-900"
              >
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-forest-700" />
                  Personalizar perfil financiero (opcional)
                </span>
                {showAdvanced ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showAdvanced && (
                <div className="mt-3 p-4 bg-slate-50 rounded-xl space-y-4 border border-slate-200 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={monthlyIncomeInputId} className="font-semibold text-slate-700 block mb-1">
                        Ingreso mensual comprobable
                      </label>
                      <input
                        id={monthlyIncomeInputId}
                        type="number"
                        placeholder="Ej: 60,000"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label htmlFor={employmentTypeInputId} className="font-semibold text-slate-700 block mb-1">
                        Tipo de empleo
                      </label>
                      <select
                        id={employmentTypeInputId}
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                      >
                        <option value="nomina">Nómina / Asalariado</option>
                        <option value="independiente">Independiente / Honorarios</option>
                        <option value="empresario">Empresario / Negocio propio</option>
                        <option value="jubilado">Jubilado / Pensionado</option>
                        <option value="mixto">Mixto</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={maxPaymentInputId} className="font-semibold text-slate-700 block mb-1">
                        Mensualidad máxima deseada
                      </label>
                      <input
                        id={maxPaymentInputId}
                        type="number"
                        placeholder="Ej: 25,000"
                        value={maxMonthlyPayment}
                        onChange={(e) => setMaxMonthlyPayment(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label htmlFor={cityInputId} className="font-semibold text-slate-700 block mb-1">
                        Municipio o Ciudad en NL
                      </label>
                      <input
                        id={cityInputId}
                        type="text"
                        value={cityOrState}
                        onChange={(e) => setCityOrState(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isFirstHome"
                      checked={isFirstHome}
                      onChange={(e) => setIsFirstHome(e.target.checked)}
                      className="rounded border-slate-300 text-forest-800 focus:ring-forest-700 h-4 w-4"
                    />
                    <label htmlFor="isFirstHome" className="text-slate-700 cursor-pointer">
                      ¿Es tu primera compra de vivienda?
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right / Calculation Results Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-forest-800 relative overflow-hidden flex flex-col justify-between">
            {/* Background pattern accent */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
                  Resultado de la Simulación
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Tu mensualidad estimada
                </h3>
              </div>

              {/* Main Highlight: Monthly payment */}
              <div className="bg-forest-900/90 border border-emerald-500/30 p-5 rounded-2xl">
                <span className="text-xs text-slate-300 block">Pago mensual estimado</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 flex items-baseline gap-2">
                  <span>{formatCurrency(calc.monthlyPayment)}</span>
                  <span className="text-xs font-normal text-slate-300">MXN / mes*</span>
                </div>
                <span className="text-[11px] text-emerald-300 mt-1 block">
                  Amortización mensual a {calc.termYears} años con tasa {calc.annualRate}%
                </span>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3 pt-2 text-sm border-t border-forest-800/80">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Valor de la propiedad:</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(calc.propertyValue)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Enganche aportado ({formatPercent(calc.downPaymentPercent)}):</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(calc.downPayment)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Monto estimado del crédito:</span>
                  <span className="font-bold text-emerald-400">
                    {formatCurrency(calc.loanAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Total estimado de intereses:</span>
                  <span className="font-semibold text-slate-200">
                    {formatCurrency(calc.totalInterest)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Total estimado a pagar:</span>
                  <span className="font-semibold text-slate-200">
                    {formatCurrency(calc.totalPaid)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-forest-800/60 text-xs">
                  <span className="flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 text-warm-400" />
                    Gastos iniciales aprox. (Notaría/ISAI):
                  </span>
                  <span className="font-semibold text-warm-300">
                    ~{formatCurrency(calc.estimatedClosingCosts)}
                  </span>
                </div>
              </div>

              {/* Requirements & Checklist Preview */}
              <div className="bg-forest-900/50 rounded-xl p-3.5 border border-forest-800 text-xs space-y-2 text-slate-300">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sin comisiones de asesoría ni letras chiquitas</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Te conseguimos condiciones bancarias preferenciales sin costo para ti.
                  Los bancos cubren nuestros honorarios.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-forest-800/80 relative z-10 space-y-3">
              <button
                type="button"
                onClick={handleProceed}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-warm-500 to-warm-600 text-forest-950 font-bold text-base shadow-lg hover:from-warm-400 hover:to-warm-500 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
              >
                <span>Quiero saber si puedo obtener este crédito</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-start gap-1.5 text-[11px] text-slate-400 leading-tight">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                <span>
                  * Simulación orientativa. No incluye seguros de vida o daños, comisión por
                  apertura ni CAT bancario final.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
