export type OperationType =
  | "comprar_casa"
  | "comprar_terreno"
  | "construir"
  | "remodelar"
  | "mejorar_hipoteca"
  | "obtener_liquidez";

export type TimelineType =
  | "inmediatamente"
  | "1_a_3_meses"
  | "3_a_6_meses"
  | "mas_de_6_meses";

export type EmploymentType =
  | "nomina"
  | "independiente"
  | "empresario"
  | "jubilado"
  | "mixto";

export interface SimulatorState {
  propertyValue: number;
  downPayment: number;
  downPaymentPercent: number;
  loanAmount: number;
  termYears: number;
  annualRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  estimatedClosingCosts: number; // Notaría, impuestos (ISAI), avalúo aprox 5% en NL
  monthlyIncome?: number;
  employmentType?: EmploymentType;
  maxMonthlyPayment?: number;
  isFirstHome?: boolean;
  cityOrState?: string;
}

export interface LeadSubmission {
  // Datos del proyecto
  nombre: string;
  whatsapp: string;
  correo: string;
  ciudad: string;
  estado: string;
  tipoOperacion: OperationType;
  tiempoEstimado: TimelineType;

  // Datos financieros preliminares
  valorPropiedad: number;
  enganche: number;
  porcentajeEnganche: number;
  ingresoMensual?: number;
  tipoEmpleo?: EmploymentType;
  solicitaConOtraPersona: boolean;
  tieneHipotecaActual: boolean;
  mensualidadDeseada?: number;

  // Datos heredados del simulador
  plazo: number; // en años
  tasaSimulada: number;
  montoEstimadoCredito: number;
  mensualidadEstimada: number;

  // Consentimiento y tracking
  consentimiento: boolean;
  fuente?: string;
  urlOrigen?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  honeypot?: string; // campo invisible anti-spam
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  leadId?: string;
  whatsappUrl?: string;
  errors?: Record<string, string>;
}
