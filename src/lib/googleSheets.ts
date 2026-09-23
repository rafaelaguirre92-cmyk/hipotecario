import { google } from "googleapis";
import { LeadSubmission } from "@/types";

/**
 * Sanitiza valores para evitar inyección de fórmulas en hojas de cálculo (=, +, -, @)
 */
function sanitizeCellValue(value: unknown): string | number | boolean {
  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (!value) return "";
  const str = String(value).trim();
  if (str.startsWith("=") || str.startsWith("+") || str.startsWith("-") || str.startsWith("@")) {
    return `'${str}`;
  }
  return str;
}

/**
 * Genera un ID legible y único para el prospecto (ej: MTY-20260922-8F3A)
 */
export function generateLeadId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MTY-${year}${month}${day}-${randomSuffix}`;
}

/**
 * Formatea la fecha y hora actual en la zona horaria de Monterrey / Ciudad de México
 */
export function getMonterreyTimestamp(): string {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone: "America/Monterrey",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

/**
 * Mapeo legible de tipos de operación
 */
const operationLabels: Record<string, string> = {
  comprar_casa: "Comprar casa",
  comprar_terreno: "Comprar terreno",
  construir: "Construir",
  remodelar: "Remodelar",
  mejorar_hipoteca: "Mejorar hipoteca",
  obtener_liquidez: "Obtener liquidez",
};

/**
 * Mapeo legible de tiempo estimado
 */
const timelineLabels: Record<string, string> = {
  inmediatamente: "Inmediatamente",
  "1_a_3_meses": "1 a 3 meses",
  "3_a_6_meses": "3 a 6 meses",
  mas_de_6_meses: "Más de 6 meses",
};

/**
 * Mapeo legible de tipo de empleo
 */
const employmentLabels: Record<string, string> = {
  nomina: "Nómina",
  independiente: "Independiente / Honorarios",
  empresario: "Empresario / Negocio propio",
  jubilado: "Jubilado / Pensionado",
  mixto: "Mixto",
};

/**
 * Agrega un nuevo prospecto a la hoja de Google Sheets configurada
 */
export async function appendLeadToSheet(
  lead: LeadSubmission,
  leadId: string
): Promise<{ success: boolean; error?: string; mock?: boolean }> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetTab = process.env.GOOGLE_SHEET_TAB || "Leads";
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  // Verificación de credenciales en entorno
  if (!sheetId || !clientEmail || !privateKey) {
    console.warn(
      "⚠️ [Hipoteca MTY Google Sheets] Variables no configuradas en entorno. Modo Mock activo."
    );
    console.log("Datos del lead simulado:", {
      leadId,
      nombre: lead.nombre,
      whatsapp: lead.whatsapp,
      montoEstimadoCredito: lead.montoEstimadoCredito,
      mensualidadEstimada: lead.mensualidadEstimada,
    });
    return { success: true, mock: true };
  }

  // Normalizar saltos de línea de la clave privada si vienen escapados (\n -> real newline)
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const timestamp = getMonterreyTimestamp();

    // Mapeo exacto de las 29 columnas
    const rowValues = [
      sanitizeCellValue(timestamp), // 1. Fecha y hora
      sanitizeCellValue(leadId), // 2. ID del prospecto
      sanitizeCellValue(lead.nombre), // 3. Nombre
      sanitizeCellValue(lead.whatsapp), // 4. WhatsApp
      sanitizeCellValue(lead.correo), // 5. Correo
      sanitizeCellValue(lead.ciudad || "Monterrey"), // 6. Ciudad
      sanitizeCellValue(lead.estado || "Nuevo León"), // 7. Estado
      sanitizeCellValue(operationLabels[lead.tipoOperacion] || lead.tipoOperacion), // 8. Tipo de operación
      sanitizeCellValue(timelineLabels[lead.tiempoEstimado] || lead.tiempoEstimado), // 9. Tiempo estimado
      lead.valorPropiedad || 0, // 10. Valor de propiedad
      lead.enganche || 0, // 11. Enganche
      lead.porcentajeEnganche ? `${lead.porcentajeEnganche}%` : "0%", // 12. Porcentaje de enganche
      lead.ingresoMensual || 0, // 13. Ingreso mensual
      sanitizeCellValue(
        lead.tipoEmpleo ? employmentLabels[lead.tipoEmpleo] || lead.tipoEmpleo : "No especificado"
      ), // 14. Tipo de empleo
      lead.solicitaConOtraPersona ? "Sí" : "No", // 15. Solicita con otra persona
      lead.tieneHipotecaActual ? "Sí" : "No", // 16. Tiene hipoteca actual
      lead.plazo ? `${lead.plazo} años` : "20 años", // 17. Plazo
      lead.tasaSimulada ? `${lead.tasaSimulada}%` : "", // 18. Tasa simulada
      lead.montoEstimadoCredito || 0, // 19. Monto estimado del crédito
      lead.mensualidadEstimada || 0, // 20. Mensualidad estimada
      sanitizeCellValue(lead.fuente || "Sitio Web"), // 21. Fuente
      sanitizeCellValue(lead.urlOrigen || "/"), // 22. URL de origen
      sanitizeCellValue(lead.utmSource || ""), // 23. UTM Source
      sanitizeCellValue(lead.utmMedium || ""), // 24. UTM Medium
      sanitizeCellValue(lead.utmCampaign || ""), // 25. UTM Campaign
      lead.consentimiento ? "Aceptado" : "No", // 26. Consentimiento
      "Nuevo", // 27. Estado del prospecto (Estado inicial)
      "", // 28. Último contacto
      lead.mensualidadDeseada ? `Mensualidad deseada: $${lead.mensualidadDeseada}` : "", // 29. Notas
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetTab}!A:AC`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowValues],
      },
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("❌ Error guardando lead en Google Sheets:", errorMsg);
    return { success: false, error: errorMsg };
  }
}
