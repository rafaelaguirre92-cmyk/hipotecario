"use client";

import { useState, useEffect, useId, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  OperationType,
  TimelineType,
  EmploymentType,
  SimulatorState,
} from "@/types";
import { formatCurrency } from "@/lib/mortgageCalculator";
import {
  UserCheck,
  Send,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lock,
} from "lucide-react";

interface LeadFormProps {
  simulatorData?: Partial<SimulatorState>;
  defaultOperation?: OperationType;
}

// Componente aislado dentro de Suspense para leer UTM sin romper el render estático de Next.js
function UtmParamsReader({
  onParams,
}: {
  onParams: (utm: { source: string; medium: string; campaign: string }) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      onParams({
        source: searchParams.get("utm_source") || "",
        medium: searchParams.get("utm_medium") || "",
        campaign: searchParams.get("utm_campaign") || "",
      });
    }
  }, [searchParams, onParams]);

  return null;
}

export function LeadForm({
  simulatorData,
  defaultOperation = "comprar_casa",
}: LeadFormProps) {
  const router = useRouter();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [correo, setCorreo] = useState("");
  const [ciudad, setCiudad] = useState("Monterrey");
  const [estado, setEstado] = useState("Nuevo León");
  const [tipoOperacion, setTipoOperacion] = useState<OperationType>(defaultOperation);
  const [tiempoEstimado, setTiempoEstimado] = useState<TimelineType>("1_a_3_meses");

  // Datos financieros
  const [ingresoMensual, setIngresoMensual] = useState<string>("");
  const [tipoEmpleo, setTipoEmpleo] = useState<EmploymentType>("nomina");
  const [solicitaConOtraPersona, setSolicitaConOtraPersona] = useState(false);
  const [tieneHipotecaActual, setTieneHipotecaActual] = useState(false);
  const [mensualidadDeseada, setMensualidadDeseada] = useState<string>("");

  // Consentimiento, UTM y Honeypot anti-spam
  const [consentimiento, setConsentimiento] = useState(true);
  const [honeypot, setHoneypot] = useState("");
  const [utmData, setUtmData] = useState({ source: "", medium: "", campaign: "" });

  // Estado de envío
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const nombreInputId = useId();
  const whatsappInputId = useId();
  const correoInputId = useId();
  const ciudadInputId = useId();
  const estadoInputId = useId();
  const operacionInputId = useId();
  const tiempoInputId = useId();
  const ingresoInputId = useId();
  const empleoInputId = useId();
  const mensualidadInputId = useId();
  const consentimientoInputId = useId();

  // Si simulatorData cambia, pre-llenar si estaban vacíos
  useEffect(() => {
    if (simulatorData?.cityOrState) {
      setCiudad(simulatorData.cityOrState);
    }
    if (simulatorData?.monthlyIncome) {
      setIngresoMensual(String(simulatorData.monthlyIncome));
    }
    if (simulatorData?.employmentType) {
      setTipoEmpleo(simulatorData.employmentType);
    }
    if (simulatorData?.maxMonthlyPayment) {
      setMensualidadDeseada(String(simulatorData.maxMonthlyPayment));
    }
  }, [simulatorData]);

  // Valores calculados por el simulador (o predeterminados si entra directo al form)
  const valorPropiedad = simulatorData?.propertyValue || 3000000;
  const enganche = simulatorData?.downPayment || 600000;
  const plazo = simulatorData?.termYears || 20;
  const tasaSimulada = simulatorData?.annualRate || 9.85;
  const mensualidadEstimada = simulatorData?.monthlyPayment || 22867;
  const montoEstimadoCredito = simulatorData?.loanAmount || 2400000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setGlobalError(null);

    // Validación básica en cliente
    const errors: Record<string, string> = {};
    if (!nombre.trim() || nombre.trim().length < 2) {
      errors.nombre = "Por favor ingresa tu nombre completo";
    }
    const cleanPhone = whatsapp.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.whatsapp = "Ingresa un número celular válido a 10 dígitos";
    }
    if (!correo.trim() || !correo.includes("@")) {
      errors.correo = "Ingresa un correo electrónico válido";
    }
    if (!consentimiento) {
      errors.consentimiento = "Debes aceptar el aviso de privacidad para continuar";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const urlOrigen = typeof window !== "undefined" ? window.location.pathname : "/";

      const payload = {
        nombre: nombre.trim(),
        whatsapp: cleanPhone,
        correo: correo.trim(),
        ciudad: ciudad.trim(),
        estado: estado.trim(),
        tipoOperacion,
        tiempoEstimado,
        valorPropiedad,
        enganche,
        ingresoMensual: ingresoMensual ? Number(ingresoMensual) : undefined,
        tipoEmpleo,
        solicitaConOtraPersona,
        tieneHipotecaActual,
        mensualidadDeseada: mensualidadDeseada ? Number(mensualidadDeseada) : undefined,
        plazo,
        tasaSimulada,
        consentimiento,
        fuente: "Sitio Web Hipoteca MTY",
        urlOrigen,
        utmSource: utmData.source,
        utmMedium: utmData.medium,
        utmCampaign: utmData.campaign,
        honeypot,
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          setFormErrors(data.errors);
        } else {
          setGlobalError(
            data.message || "Ocurrió un error al enviar tu información. Intenta de nuevo."
          );
        }
        setIsSubmitting(false);
        return;
      }

      // Redirigir a página de confirmación con datos para el WhatsApp pre-llenado
      const queryParams = new URLSearchParams({
        leadId: data.leadId || "",
        nombre: nombre.trim(),
        operacion: tipoOperacion,
        valor: String(valorPropiedad),
        enganche: String(enganche),
        mensualidad: String(mensualidadEstimada),
        whatsappUrl: data.whatsappUrl || "",
      });

      router.push(`/confirmacion?${queryParams.toString()}`);
    } catch (err: unknown) {
      console.error("Error al enviar el formulario:", err);
      setGlobalError(
        "No fue posible conectar con el servidor. Por favor verifica tu conexión o contáctanos por WhatsApp."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="formulario-prospecto"
      className="scroll-mt-20 py-12 md:py-16 bg-slate-100/70 border-t border-slate-200"
    >
      {/* Lector seguro de parámetros UTM en Suspense */}
      <Suspense fallback={null}>
        <UtmParamsReader
          onParams={(params) => {
            setUtmData(params);
          }}
        />
      </Suspense>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner de datos heredados del simulador */}
        <div className="bg-forest-900 text-white rounded-2xl p-5 sm:p-6 mb-8 shadow-md border border-forest-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Datos de tu simulación guardados
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Precalificación para tu crédito
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                No tienes que volver a capturar estos valores. Ya están vinculados a tu expediente inicial.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-forest-800/90 px-3 py-1.5 rounded-lg border border-forest-700">
                Valor: <strong>{formatCurrency(valorPropiedad)}</strong>
              </span>
              <span className="bg-forest-800/90 px-3 py-1.5 rounded-lg border border-forest-700">
                Enganche: <strong>{formatCurrency(enganche)}</strong>
              </span>
              <span className="bg-forest-800/90 px-3 py-1.5 rounded-lg border border-forest-700 text-emerald-300">
                Mensualidad: <strong>{formatCurrency(mensualidadEstimada)}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Card Principal del Formulario */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-200">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
              Precalifica y compara los bancos
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Un asesor hipotecario certificado revisará tu perfil preliminar para presentarte
              las opciones con mejores tasas y condiciones.{" "}
              <strong className="text-forest-900">
                Nuestra asesoría es 100% gratuita para ti.
              </strong>
            </p>
          </div>

          {globalError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
              <span>{globalError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Honeypot Oculto para bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_url_check">No llenar este campo</label>
              <input
                id="website_url_check"
                type="text"
                name="website_url_check"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* SECCIÓN 1: Datos de Contacto */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-forest-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <UserCheck className="w-4 h-4 text-forest-700" />
                1. Datos de contacto
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                  <label htmlFor={nombreInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={nombreInputId}
                    type="text"
                    required
                    placeholder="Ej. Carlos Garza Martínez"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
                      formErrors.nombre
                        ? "border-red-400 ring-1 ring-red-400"
                        : "border-slate-300 focus:ring-2 focus:ring-forest-700"
                    }`}
                  />
                  {formErrors.nombre && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.nombre}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor={whatsappInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={whatsappInputId}
                    type="tel"
                    required
                    placeholder="81 1234 5678"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
                      formErrors.whatsapp
                        ? "border-red-400 ring-1 ring-red-400"
                        : "border-slate-300 focus:ring-2 focus:ring-forest-700"
                    }`}
                  />
                  {formErrors.whatsapp && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.whatsapp}</p>
                  )}
                </div>

                {/* Correo */}
                <div>
                  <label htmlFor={correoInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={correoInputId}
                    type="email"
                    required
                    placeholder="carlos.garza@ejemplo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
                      formErrors.correo
                        ? "border-red-400 ring-1 ring-red-400"
                        : "border-slate-300 focus:ring-2 focus:ring-forest-700"
                    }`}
                  />
                  {formErrors.correo && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.correo}</p>
                  )}
                </div>

                {/* Ciudad y Estado */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor={ciudadInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                      Municipio / Ciudad
                    </label>
                    <input
                      id={ciudadInputId}
                      type="text"
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor={estadoInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                      Estado
                    </label>
                    <input
                      id={estadoInputId}
                      type="text"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN 2: Proyecto Hipotecario */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-forest-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <HelpCircle className="w-4 h-4 text-forest-700" />
                2. Detalles de tu proyecto
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tipo de Operación */}
                <div>
                  <label htmlFor={operacionInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                    Tipo de operación
                  </label>
                  <select
                    id={operacionInputId}
                    value={tipoOperacion}
                    onChange={(e) => setTipoOperacion(e.target.value as OperationType)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white outline-none"
                  >
                    <option value="comprar_casa">Comprar casa o departamento</option>
                    <option value="comprar_terreno">Comprar terreno</option>
                    <option value="construir">Construir en terreno propio</option>
                    <option value="remodelar">Remodelar vivienda</option>
                    <option value="mejorar_hipoteca">Mejorar o sustituir hipoteca actual</option>
                    <option value="obtener_liquidez">Obtener liquidez con garantía hipotecaria</option>
                  </select>
                </div>

                {/* Tiempo Estimado */}
                <div>
                  <label htmlFor={tiempoInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                    ¿Cuándo planeas realizar la operación?
                  </label>
                  <select
                    id={tiempoInputId}
                    value={tiempoEstimado}
                    onChange={(e) => setTiempoEstimado(e.target.value as TimelineType)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white outline-none"
                  >
                    <option value="inmediatamente">Inmediatamente (tengo una propiedad vista)</option>
                    <option value="1_a_3_meses">En 1 a 3 meses</option>
                    <option value="3_a_6_meses">En 3 a 6 meses</option>
                    <option value="mas_de_6_meses">Más de 6 meses / Solo explorando</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECCIÓN 3: Datos Financieros Preliminares */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-forest-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Lock className="w-4 h-4 text-forest-700" />
                3. Perfil financiero preliminar (estrictamente confidencial)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Ingreso Mensual */}
                <div>
                  <label htmlFor={ingresoInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                    Ingreso mensual neto comprobable
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                      $
                    </span>
                    <input
                      id={ingresoInputId}
                      type="number"
                      placeholder="Ej. 65000"
                      value={ingresoMensual}
                      onChange={(e) => setIngresoMensual(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Suma tus ingresos y los de tu cónyuge o coacreditado si aplica
                  </span>
                </div>

                {/* Tipo de Empleo */}
                <div>
                  <label htmlFor={empleoInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                    Tipo de empleo / ingresos
                  </label>
                  <select
                    id={empleoInputId}
                    value={tipoEmpleo}
                    onChange={(e) => setTipoEmpleo(e.target.value as EmploymentType)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white outline-none"
                  >
                    <option value="nomina">Nómina / Asalariado</option>
                    <option value="independiente">Independiente / Honorarios (RESICO/PFAE)</option>
                    <option value="empresario">Empresario / Negocio Propio / Moral</option>
                    <option value="jubilado">Jubilado / Pensionado</option>
                    <option value="mixto">Mixto (Nómina + Honorarios/Comisiones)</option>
                  </select>
                </div>

                {/* Mensualidad deseada */}
                <div className="sm:col-span-2">
                  <label htmlFor={mensualidadInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                    Mensualidad máxima que te gustaría pagar (opcional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                      $
                    </span>
                    <input
                      id={mensualidadInputId}
                      type="number"
                      placeholder={`Calculada: ${mensualidadEstimada}`}
                      value={mensualidadDeseada}
                      onChange={(e) => setMensualidadDeseada(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Checkboxes de Coacreditado e Hipoteca actual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={solicitaConOtraPersona}
                    onChange={(e) => setSolicitaConOtraPersona(e.target.checked)}
                    className="rounded border-slate-300 text-forest-800 focus:ring-forest-700 h-4 w-4"
                  />
                  <span>¿Solicitarás el crédito junto con otra persona (coacreditado)?</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={tieneHipotecaActual}
                    onChange={(e) => setTieneHipotecaActual(e.target.checked)}
                    className="rounded border-slate-300 text-forest-800 focus:ring-forest-700 h-4 w-4"
                  />
                  <span>¿Actualmente tienes un crédito hipotecario vigente?</span>
                </label>
              </div>
            </div>

            {/* Consentimiento de Aviso de Privacidad */}
            <div className="pt-4 border-t border-slate-100">
              <label htmlFor={consentimientoInputId} className="flex items-start gap-2.5 cursor-pointer">
                <input
                  id={consentimientoInputId}
                  type="checkbox"
                  required
                  checked={consentimiento}
                  onChange={(e) => setConsentimiento(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-forest-800 focus:ring-forest-700 h-4 w-4 shrink-0"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  He leído y acepto el{" "}
                  <a
                    href="/aviso-de-privacidad"
                    target="_blank"
                    className="text-forest-800 font-semibold underline hover:text-forest-950"
                  >
                    Aviso de Privacidad
                  </a>
                  . Autorizo a que un asesor hipotecario certificado se comunique conmigo
                  únicamente para dar seguimiento a mi solicitud de crédito.
                </span>
              </label>
              {formErrors.consentimiento && (
                <p className="text-xs text-red-500 mt-1">{formErrors.consentimiento}</p>
              )}
            </div>

            {/* Botón de Envío */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-base shadow-lg hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-warm-400" />
                    <span>Conectando con asesor...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-warm-400" />
                    <span>Quiero saber si puedo obtener este crédito</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-forest-700" />
                <span>
                  No compartimos tu información. No solicitamos estados de cuenta ni INE en esta etapa.
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
