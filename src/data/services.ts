import {
  Building2,
  Trees,
  Hammer,
  Paintbrush,
  RefreshCw,
  Coins,
} from "lucide-react";
import { OperationType } from "@/types";

export interface ServiceData {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  heroText: string;
  icon: typeof Building2;
  highlights: string[];
  requirements: string[];
  operationType: OperationType;
  faqs: { q: string; a: string }[];
}

export const servicesData: Record<string, ServiceData> = {
  "comprar-casa": {
    slug: "comprar-casa",
    title: "Crédito Hipotecario para Comprar Casa o Departamento",
    metaTitle: "Crédito Hipotecario para Comprar Casa en Monterrey | Asesoría SOC",
    description:
      "Financia la compra de tu casa o departamento nuevo o usado en Monterrey y Nuevo León con las tasas bancarias más competitivas.",
    heroText:
      "Haz realidad tu nuevo hogar. Comparamos las opciones de Santander, Scotiabank, Banorte, HSBC y Citibanamex para conseguirte el mayor aforo y la menor mensualidad.",
    icon: Building2,
    highlights: [
      "Financiamiento de hasta el 90% (o hasta 100% combinando con Cofinavit)",
      "Plazos flexibles a 5, 10, 15 y 20 años con tasa fija",
      "Posibilidad de mancomunar ingresos con tu cónyuge o coacreditado",
      "Asesoría y trámite 100% gratuito para ti",
    ],
    requirements: [
      "Edad entre 21 y 75 años (al sumar el plazo del crédito)",
      "Buen historial crediticio en Buró de Crédito",
      "Comprobante de ingresos (nómina o declaraciones SAT)",
      "Enganche mínimo a partir del 10%",
    ],
    operationType: "comprar_casa",
    faqs: [
      {
        q: "¿Puedo comprar casa nueva o usada?",
        a: "Sí, los créditos de adquisición aplican tanto para vivienda nueva en preventa o entrega inmediata, como para casas y departamentos usados en cualquier municipio de Nuevo León.",
      },
      {
        q: "¿Puedo usar mi saldo de la Subcuenta de Vivienda Infonavit?",
        a: "Sí, a través de Cofinavit o Apoyo Infonavit puedes utilizar tu saldo para pagar el enganche o amortizar capital y reducir tu mensualidad bancaria.",
      },
    ],
  },
  terreno: {
    slug: "terreno",
    title: "Crédito Hipotecario para Compra de Terreno",
    metaTitle: "Crédito para Terreno Residencial en Monterrey | Asesoría SOC",
    description:
      "Consigue financiamiento para comprar lotes o terrenos residenciales urbanizados en Monterrey, Santiago, San Pedro y Carretera Nacional.",
    heroText:
      "Asegura la tierra para tu futuro patrimonio. Te orientamos sobre los bancos que financian terrenos residenciales en las zonas de mayor plusvalía de Nuevo León.",
    icon: Trees,
    highlights: [
      "Financiamiento de hasta el 70% u 80% del valor del lote",
      "Plazos de 5 a 15 años",
      "Aplica para lotes residenciales urbanizados o en fraccionamientos autorizados",
      "Opción a futuro de financiamiento complementario para construcción",
    ],
    requirements: [
      "El terreno debe contar con servicios a pie de lote (agua, luz, drenaje)",
      "Ubicado en zona urbana o fraccionamiento formalmente registrado",
      "Escritura pública libre de gravamen del vendedor",
      "Buen score en Buró de Crédito",
    ],
    operationType: "comprar_terreno",
    faqs: [
      {
        q: "¿Se puede financiar un terreno campestre o ejidal?",
        a: "Los bancos solo financian terrenos urbanos y residenciales con escritura pública inscrita en el Registro Público. Las tierras ejidales o comunales no son sujetas a crédito bancario hipotecario.",
      },
      {
        q: "¿Cuánto enganche necesito para un terreno en NL?",
        a: "Típicamente entre el 20% y el 30% del valor del terreno, ya que el aforo bancario máximo suele ser del 70% al 80%.",
      },
    ],
  },
  construccion: {
    slug: "construccion",
    title: "Crédito Hipotecario para Construcción",
    metaTitle: "Crédito para Construcción en Terreno Propio Monterrey | SOC",
    description:
      "Construye la casa de tus sueños en tu propio terreno con financiamiento bancario entregado por ministraciones de avance de obra.",
    heroText:
      "Diseña y construye a tu medida. Los bancos financian hasta el 100% del presupuesto de construcción mediante ministraciones conforme avanza la edificación.",
    icon: Hammer,
    highlights: [
      "Financiamiento de hasta el 100% del presupuesto de obra (según el valor del terreno)",
      "Entregas de dinero por ministraciones según visitas de avance de obra",
      "Periodo de gracia de capital durante los meses de edificación",
      "También existe el esquema combinado 'Terreno + Construcción' en un solo crédito",
    ],
    requirements: [
      "Terreno escriturado a tu nombre (o en trámite de compra simultánea)",
      "Proyecto arquitectónico ejecutivo y presupuesto paramétrico de obra",
      "Licencia o permiso de construcción municipal vigente en NL",
      "Contrato con constructor o arquitecto responsable",
    ],
    operationType: "construir",
    faqs: [
      {
        q: "¿Qué pasa si aún no termino de pagar el terreno?",
        a: "Existe un esquema especial llamado 'Adquisición de Terreno + Construcción' o sustitución con ampliación que permite liquidar el saldo del terreno y financiar la obra.",
      },
      {
        q: "¿Cómo entrega el banco el dinero?",
        a: "El banco realiza un primer anticipo y luego un perito valuador inspecciona el avance físico para autorizar las siguientes ministraciones.",
      },
    ],
  },
  remodelacion: {
    slug: "remodelacion",
    title: "Crédito para Remodelación y Ampliación de Vivienda",
    metaTitle: "Crédito para Remodelar tu Casa en Monterrey | Asesoría SOC",
    description:
      "Amplía tu casa, renueva cocina, baños, acabados o construye un piso adicional con respaldo de una garantía hipotecaria a tasa baja.",
    heroText:
      "Moderniza tu hogar actual sin descapitalizarte. Consigue tasas hipotecarias mucho más bajas que un préstamo personal o tarjeta de crédito.",
    icon: Paintbrush,
    highlights: [
      "Financiamiento de hasta el 30% o 50% del valor actual de tu vivienda",
      "Tasas fijas hipotecarias significativamente más bajas que créditos personales",
      "Plazos amplios de 5 a 20 años para mensualidades muy cómodas",
      "Aumenta la plusvalía y confort de tu propiedad en Monterrey",
    ],
    requirements: [
      "Vivienda propia libre de gravamen o con hipoteca al corriente",
      "Presupuesto de remodelación y descripción de obras a realizar",
      "Comprobación de ingresos estable",
      "Buró de crédito sano",
    ],
    operationType: "remodelar",
    faqs: [
      {
        q: "¿Puedo pedir el crédito si mi casa todavía tiene hipoteca?",
        a: "Sí, es posible consolidarlo en una 'Mejora de hipoteca con remodelación', unificando tu saldo actual con el presupuesto de obra.",
      },
    ],
  },
  "mejora-hipoteca": {
    slug: "mejora-hipoteca",
    title: "Mejora o Sustitución de Hipoteca (Baja tu Mensualidad)",
    metaTitle: "Mejora y Sustitución de Hipoteca en Monterrey | Ahorra Intereses",
    description:
      "Transfiere tu hipoteca actual a otro banco con menor tasa de interés, reduce tu mensualidad o acorta años de tu deuda.",
    heroText:
      "¿Contrataste tu crédito hace años con una tasa alta? Te ayudamos a transferirla al banco con mejores condiciones actuales para que ahorres miles de pesos.",
    icon: RefreshCw,
    highlights: [
      "Reducción directa de tu tasa de interés anual",
      "Ahorro de hasta cientos de miles de pesos en el costo financiero total",
      "Opción de reducir tu mensualidad o acortar el plazo remanente",
      "Muchos bancos absorben los gastos notariales de subrogación",
      "Opción de solicitar liquidez adicional sobre el mismo inmueble",
    ],
    requirements: [
      "Tener al menos 12 meses pagando puntualmente tu hipoteca actual",
      "No presentar atrasos en Buró de Crédito",
      "Comprobantes de ingresos vigentes",
      "Estados de cuenta del crédito hipotecario vigente",
    ],
    operationType: "mejorar_hipoteca",
    faqs: [
      {
        q: "¿Cuánto puedo ahorrar al cambiarme de banco?",
        a: "Dependiendo de tu saldo y plazo remanente, una reducción de 1 a 2 puntos porcentuales en tu tasa puede significar ahorros superiores a $150,000 - $300,000 pesos.",
      },
      {
        q: "¿Quién paga los gastos notariales del cambio?",
        a: "Varios bancos en México cuentan con promociones donde financian o subsidian el 100% de los gastos notariales de sustitución de hipoteca.",
      },
    ],
  },
  liquidez: {
    slug: "liquidez",
    title: "Crédito de Liquidez con Garantía Hipotecaria",
    metaTitle: "Crédito de Liquidez con Garantía Hipotecaria en Monterrey | SOC",
    description:
      "Obtén capital para invertir en tu negocio, pagar deudas caras o emprender proyectos dejando tu inmueble como garantía a tasa hipotecaria.",
    heroText:
      "Convierte el valor de tu propiedad en capital líquido con tasas mucho más accesibles que cualquier préstamo personal o bancario comercial.",
    icon: Coins,
    highlights: [
      "Préstamos de hasta el 50% al 70% del valor comercial de tu inmueble",
      "Tasas mucho menores que préstamos personales o líneas de crédito de negocio",
      "Plazos de pago de hasta 10, 15 o 20 años",
      "Destino libre: inversiones, capital de trabajo o consolidación de pasivos",
    ],
    requirements: [
      "Inmueble propio totalmente pagado y libre de gravamen",
      "Escritura pública debidamente inscrita en el Registro Público de NL",
      "Comprobación de ingresos fiscales o bancarios",
      "Historial crediticio regular",
    ],
    operationType: "obtener_liquidez",
    faqs: [
      {
        q: "¿En qué puedo usar el dinero obtenido?",
        a: "El destino es totalmente libre: consolidar deudas con intereses altos, expandir tu empresa, financiar estudios, emergencias o proyectos de inversión.",
      },
    ],
  },
};
