import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { appendLeadToSheet, generateLeadId } from "@/lib/googleSheets";
import { calculateMortgage, formatCurrency } from "@/lib/mortgageCalculator";
import { siteConfig } from "@/config/site";
import { LeadSubmission } from "@/types";

const leadSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  whatsapp: z
    .string()
    .min(10, "El número de WhatsApp debe tener al menos 10 dígitos")
    .regex(/^[0-9+\s()-]+$/, "Formato de teléfono no válido"),
  correo: z.string().email("Correo electrónico no válido"),
  ciudad: z.string().min(2, "Ingresa tu ciudad").default("Monterrey"),
  estado: z.string().default("Nuevo León"),
  tipoOperacion: z.enum([
    "comprar_casa",
    "comprar_terreno",
    "construir",
    "remodelar",
    "mejorar_hipoteca",
    "obtener_liquidez",
  ]),
  tiempoEstimado: z.enum([
    "inmediatamente",
    "1_a_3_meses",
    "3_a_6_meses",
    "mas_de_6_meses",
  ]),
  valorPropiedad: z.number().positive("El valor de la propiedad debe ser mayor a 0"),
  enganche: z.number().min(0, "El enganche no puede ser negativo"),
  ingresoMensual: z.number().optional(),
  tipoEmpleo: z
    .enum(["nomina", "independiente", "empresario", "jubilado", "mixto"])
    .optional(),
  solicitaConOtraPersona: z.boolean().default(false),
  tieneHipotecaActual: z.boolean().default(false),
  mensualidadDeseada: z.number().optional(),
  plazo: z.number().int().min(5).max(30).default(20),
  tasaSimulada: z.number().min(5).max(30).default(siteConfig.rates.defaultReference),
  consentimiento: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar el aviso de privacidad para continuar",
  }),
  fuente: z.string().optional(),
  urlOrigen: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  honeypot: z.string().optional(), // Si tiene valor, es un bot
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Protección Anti-Spam: Honeypot invisible
    if (body.honeypot && body.honeypot.trim().length > 0) {
      console.warn("🛡️ Spam bloqueado por trampa honeypot:", body.honeypot);
      // Retornar éxito falso para confundir al bot
      return NextResponse.json({
        success: true,
        message: "Solicitud procesada con éxito",
      });
    }

    // 2. Validación estricta con Zod
    const parseResult = leadSchema.safeParse(body);
    if (!parseResult.success) {
      const formattedErrors: Record<string, string> = {};
      parseResult.error.errors.forEach((err) => {
        const path = err.path.join(".");
        formattedErrors[path] = err.message;
      });
      return NextResponse.json(
        { success: false, errors: formattedErrors },
        { status: 400 }
      );
    }

    const validatedData = parseResult.data;

    // 3. Reglas de negocio financieras
    if (validatedData.enganche >= validatedData.valorPropiedad) {
      return NextResponse.json(
        {
          success: false,
          errors: {
            enganche: "El enganche no puede ser igual o mayor al valor total de la propiedad",
          },
        },
        { status: 400 }
      );
    }

    // 4. Calcular o verificar los valores con la fórmula oficial
    const calc = calculateMortgage(
      validatedData.valorPropiedad,
      validatedData.enganche,
      validatedData.plazo,
      validatedData.tasaSimulada
    );

    // 5. Generar ID único del prospecto
    const leadId = generateLeadId();

    const leadToSave: LeadSubmission = {
      ...validatedData,
      porcentajeEnganche: calc.downPaymentPercent,
      montoEstimadoCredito: calc.loanAmount,
      mensualidadEstimada: calc.monthlyPayment,
    };

    // 6. Almacenar en Google Sheets (server-side seguro)
    const sheetResult = await appendLeadToSheet(leadToSave, leadId);

    if (!sheetResult.success) {
      console.error("Fallo al escribir en Google Sheets:", sheetResult.error);
      // No frenamos al usuario si Google Sheets falla temporalmente, pero registramos el error
    }

    // 7. Generar URL de WhatsApp con mensaje precargado según especificación
    const operationNames: Record<string, string> = {
      comprar_casa: "Comprar casa",
      comprar_terreno: "Comprar terreno",
      construir: "Construir",
      remodelar: "Remodelar",
      mejorar_hipoteca: "Mejorar hipoteca",
      obtener_liquidez: "Obtener liquidez",
    };

    const whatsappMessage = [
      `¡Hola! Quiero revisar mis opciones de crédito hipotecario.`,
      ``,
      `*Folio:* ${leadId}`,
      `*Nombre:* ${validatedData.nombre}`,
      `*Operación:* ${operationNames[validatedData.tipoOperacion] || validatedData.tipoOperacion}`,
      `*Valor de propiedad:* ${formatCurrency(validatedData.valorPropiedad)}`,
      `*Enganche:* ${formatCurrency(validatedData.enganche)} (${calc.downPaymentPercent}%)`,
      `*Monto estimado:* ${formatCurrency(calc.loanAmount)}`,
      `*Mensualidad estimada:* ${formatCurrency(calc.monthlyPayment)} (${validatedData.plazo} años)`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    return NextResponse.json({
      success: true,
      leadId,
      whatsappUrl,
      calculation: calc,
      message: "Lead registrado exitosamente",
    });
  } catch (error: unknown) {
    console.error("Error en POST /api/leads:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor al procesar la solicitud" },
      { status: 500 }
    );
  }
}
