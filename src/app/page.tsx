import { Hero } from "@/components/home/Hero";
import { BankPartners } from "@/components/home/BankPartners";
import { HomeSimulatorSection } from "@/components/home/HomeSimulatorSection";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ValueProp } from "@/components/home/ValueProp";
import { FaqSection } from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BankPartners />
      <HomeSimulatorSection />
      <ProcessSteps />
      <ValueProp />
      <FaqSection />
    </>
  );
}
