import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ShieldCheck, ArrowLeft, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Aviso de Privacidad Integral | Hipoteca MTY",
  description:
    "Aviso de Privacidad de Hipoteca MTY en cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).",
};

export default function AvisoDePrivacidadPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-md border border-slate-200 space-y-8">
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-forest-900 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al inicio</span>
            </Link>
            <div className="flex items-center gap-2 text-forest-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Protección y Legalidad</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
              Aviso de Privacidad Integral
            </h1>
            <p className="text-xs text-slate-500">
              Última actualización: Septiembre de 2026 • Conforme a la Ley Federal de Protección
              de Datos Personales en Posesión de los Particulares (LFPDPPP).
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest-950">
                1. Identidad y Domicilio del Responsable
              </h2>
              <p>
                <strong>Hipoteca MTY</strong>, operado por el asesor hipotecario certificado{" "}
                <strong>{siteConfig.advisorName}</strong>, adscrito a la red de intermediación
                financiera <strong>SOC Living</strong>, con domicilio en Monterrey, Nuevo León,
                México, es el responsable del tratamiento y salvaguarda de sus datos personales.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest-950">
                2. Datos Personales Recabados
              </h2>
              <p>
                Para las finalidades de prospección y cálculo orientativo, únicamente recabamos:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nombre completo</li>
                <li>Teléfono celular o WhatsApp</li>
                <li>Correo electrónico</li>
                <li>Ciudad o municipio de residencia o interés</li>
                <li>
                  Datos financieros y patrimoniales orientativos: valor estimado del inmueble,
                  enganche proyectado, ingreso mensual aproximado y régimen laboral.
                </li>
              </ul>
              <div className="p-3.5 bg-forest-50 border border-forest-200 rounded-xl flex items-start gap-2 text-xs text-forest-900 mt-2">
                <Lock className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Seguridad garantizada:</strong> En este sitio web{" "}
                  <strong>NUNCA solicitamos</strong> fotografías de identificación oficial (INE),
                  estados de cuenta completos, números de tarjeta bancaria, contraseñas ni
                  documentos sensibles.
                </p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest-950">
                3. Finalidades del Tratamiento de Datos
              </h2>
              <p>Los datos que usted nos proporciona son utilizados estrictamente para:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Calcular y proyectar escenarios de crédito hipotecario acordes a sus necesidades.
                </li>
                <li>
                  Contactarlo vía WhatsApp, llamada telefónica o correo electrónico para presentarle
                  las opciones de financiamiento disponibles ante los bancos.
                </li>
                <li>
                  Orientarlo y resolver sus dudas sobre requisitos, enganches y notarías en Nuevo
                  León.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest-950">
                4. Transferencia de Datos
              </h2>
              <p>
                Sus datos personales preliminares no son vendidos, alquilados ni transferidos a
                terceros con fines comerciales o mercadológicos. Solo se remitirán a una
                institución financiera (banco) cuando usted formalice su interés de iniciar un
                trámite y otorgue su consentimiento expreso mediante la firma de las solicitudes
                bancarias oficiales.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest-950">
                5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
              </h2>
              <p>
                Usted tiene derecho a conocer qué datos tenemos de usted, para qué los utilizamos
                y las condiciones de su uso (Acceso). Asimismo, puede solicitar su corrección
                (Rectificación), que los eliminemos de nuestros registros cuando considere que no
                están siendo utilizados adecuadamente (Cancelación), u oponerse al uso de los mismos
                para fines específicos (Oposición).
              </p>
              <p>
                Para ejercer sus derechos ARCO, envíe un correo electrónico a{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-forest-800 font-semibold underline"
                >
                  {siteConfig.email}
                </a>{" "}
                especificando su solicitud y folio de registro.
              </p>
            </section>

            <section className="space-y-2 border-t border-slate-200 pt-4">
              <h2 className="text-base font-bold text-forest-950">
                6. Consentimiento
              </h2>
              <p>
                Al enviar el formulario de precalificación o comunicarse a través de los canales
                dispuestos en este sitio web, usted confirma que ha leído y consiente el tratamiento
                de sus datos personales conforme a los términos de este Aviso de Privacidad.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
