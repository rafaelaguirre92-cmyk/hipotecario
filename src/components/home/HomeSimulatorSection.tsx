"use client";

import { useState } from "react";
import { Simulator } from "@/components/calculator/Simulator";
import { LeadForm } from "@/components/forms/LeadForm";
import { MortgageCalculationResult } from "@/lib/mortgageCalculator";
import { SimulatorState } from "@/types";

export function HomeSimulatorSection() {
  const [simulatorData, setSimulatorData] = useState<Partial<SimulatorState>>({
    propertyValue: 3000000,
    downPayment: 600000,
    downPaymentPercent: 20,
    loanAmount: 2400000,
    termYears: 20,
    annualRate: 9.85,
    monthlyPayment: 22867,
  });

  const handleSelectCredit = (data: MortgageCalculationResult & Partial<SimulatorState>) => {
    setSimulatorData(data);
  };

  return (
    <>
      <Simulator onSelectCredit={handleSelectCredit} />
      <LeadForm simulatorData={simulatorData} defaultOperation="comprar_casa" />
    </>
  );
}
