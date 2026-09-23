function calculateMortgage(propertyValue, downPayment, termYears, annualRate) {
  const safePropValue = Math.max(0, propertyValue || 0);
  const safeDownPayment = Math.min(safePropValue, Math.max(0, downPayment || 0));
  const safeYears = [5, 10, 15, 20].includes(termYears) ? termYears : 20;
  const safeRate = Math.max(1, Math.min(30, annualRate || 9.85));

  const loanAmount = Math.max(0, safePropValue - safeDownPayment);
  const downPaymentPercent =
    safePropValue > 0 ? (safeDownPayment / safePropValue) * 100 : 0;

  const n = safeYears * 12;
  const r = safeRate / 12 / 100;

  let monthlyPayment = 0;
  let totalPaid = 0;
  let totalInterest = 0;

  if (loanAmount > 0 && r > 0 && n > 0) {
    const factor = Math.pow(1 + r, n);
    monthlyPayment = loanAmount * ((r * factor) / (factor - 1));
    totalPaid = monthlyPayment * n;
    totalInterest = Math.max(0, totalPaid - loanAmount);
  }

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

// Test 1: Baseline scenario
// Property value: $3,000,000, Down payment: $600,000 (20%), Loan: $2,400,000
// Rate: 9.85% annual, Term: 20 years (240 months)
const test1 = calculateMortgage(3000000, 600000, 20, 9.85);

console.log("=== TEST 1: Hipoteca estándar $3,000,000 ===");
console.log("Valor propiedad:", test1.propertyValue);
console.log("Enganche:", test1.downPayment, `(${test1.downPaymentPercent}%)`);
console.log("Monto crédito:", test1.loanAmount);
console.log("Mensualidad estimada:", test1.monthlyPayment);
console.log("Total intereses:", test1.totalInterest);
console.log("Total pagado:", test1.totalPaid);
console.log("Gastos notariales aprox (NL):", test1.estimatedClosingCosts);

if (test1.monthlyPayment === 22924) {
  console.log("✅ Cálculo exacto verificado: Mensualidad = $22,924 MXN.");
} else {
  console.log("Cálculo obtenido:", test1.monthlyPayment);
}

// Test 2: Low down payment ($300,000 -> 10%)
const test2 = calculateMortgage(3000000, 300000, 20, 8.80);
console.log("\n=== TEST 2: Tasa preferencial 8.80% a 20 años ===");
console.log("Monto crédito:", test2.loanAmount);
console.log("Mensualidad:", test2.monthlyPayment);
console.log("Total intereses:", test2.totalInterest);
