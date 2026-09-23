export interface MortgageCalculationResult {
  propertyValue: number;
  downPayment: number;
  downPaymentPercent: number;
  loanAmount: number;
  termYears: number;
  annualRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  estimatedClosingCosts: number;
}

/**
 * Calcula la mensualidad y desglose de un crédito amortizado con pagos mensuales.
 *
 * Fórmula base:
 * P = monto del crédito
 * r = tasa anual / 12 / 100
 * n = número de pagos (años * 12)
 *
 * Mensualidad = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMortgage(
  propertyValue: number,
  downPayment: number,
  termYears: number,
  annualRate: number
): MortgageCalculationResult {
  // Validaciones de seguridad
  const safePropValue = Math.max(0, propertyValue || 0);
  const safeDownPayment = Math.min(safePropValue, Math.max(0, downPayment || 0));
  const safeYears = [5, 10, 15, 20].includes(termYears) ? termYears : 20;
  const safeRate = Math.max(1, Math.min(30, annualRate || 9.85));

  const loanAmount = Math.max(0, safePropValue - safeDownPayment);
  const downPaymentPercent =
    safePropValue > 0 ? (safeDownPayment / safePropValue) * 100 : 0;

  const n = safeYears * 12; // Número de meses
  const r = safeRate / 12 / 100; // Tasa mensual en decimal

  let monthlyPayment = 0;
  let totalPaid = 0;
  let totalInterest = 0;

  if (loanAmount > 0 && r > 0 && n > 0) {
    const factor = Math.pow(1 + r, n);
    // Mensualidad = P * [r(1+r)^n] / [(1+r)^n - 1]
    monthlyPayment = loanAmount * ((r * factor) / (factor - 1));
    totalPaid = monthlyPayment * n;
    totalInterest = Math.max(0, totalPaid - loanAmount);
  }

  // Estimación de gastos notariales, ISAI (3% en NL), avalúo y derechos (~5.5% del valor de la propiedad)
  const estimatedClosingCosts = safePropValue * 0.055;

  return {
    propertyValue: Math.round(safePropValue),
    downPayment: Math.round(safeDownPayment),
    downPaymentPercent: Number(downPaymentPercent.toFixed(1)),
    loanAmount: Math.round(loanAmount),
    termYears: safeYears,
    annualRate: Number(safeRate.toFixed(2)),
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalPaid: Math.round(totalPaid),
    estimatedClosingCosts: Math.round(estimatedClosingCosts),
  };
}

/**
 * Formatea un número a moneda mexicana MXN (ej: $2,500,000)
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return "$0";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formatea un porcentaje (ej: 20.0%)
 */
export function formatPercent(percent: number): string {
  if (isNaN(percent)) return "0%";
  return `${percent.toFixed(1)}%`;
}
