import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Home, ShieldCheck, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-forest-950 text-slate-300 border-t border-forest-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-forest-900/60">
          {/* Column 1: Brand & Disclaimer summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-white flex items-center justify-center border border-forest-700/50">
                <Home className="w-5 h-5 text-warm-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Hipoteca <span className="text-forest-400">MTY</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Asesoría hipotecaria integral y personalizada en Monterrey y Nuevo León.
              Respaldados por la red de intermediación financiera más grande de México:{" "}
              <strong className="text-white">SOC Líderes en Asesoría Financiera</strong>.
            </p>

            <div className="flex items-center gap-2 text-xs text-warm-300 bg-forest-900/60 p-2.5 rounded-lg border border-forest-800">
              <ShieldCheck className="w-4 h-4 shrink-0 text-warm-400" />
              <span>Nuestra asesoría y trámite no tiene ningún costo para ti.</span>
            </div>
          </div>

          {/* Column 2: Servicios */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Tipos de Crédito
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/servicios/comprar-casa"
                  className="hover:text-white transition-colors"
                >
                  Adquisición de Casa o Depto
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/terreno"
                  className="hover:text-white transition-colors"
                >
                  Crédito para Terreno
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/construccion"
                  className="hover:text-white transition-colors"
                >
                  Construcción en Terreno Propio
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/remodelacion"
                  className="hover:text-white transition-colors"
                >
                  Remodelación y Ampliación
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/mejora-hipoteca"
                  className="hover:text-white transition-colors"
                >
                  Mejora / Sustitución de Hipoteca
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/liquidez"
                  className="hover:text-white transition-colors"
                >
                  Liquidez con Garantía Hipotecaria
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Enlaces de Interés & Cobertura */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Cobertura en NL
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Atención presencial y digital en toda la zona metropolitana de Monterrey:
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-300">
              {siteConfig.coverage.map((city) => (
                <span
                  key={city}
                  className="bg-forest-900/80 px-2 py-1 rounded text-slate-300 border border-forest-800/40"
                >
                  {city}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-forest-900">
              <Link
                href="/aviso-de-privacidad"
                className="text-xs text-slate-400 hover:text-white underline block"
              >
                Aviso de Privacidad (LFPDPPP)
              </Link>
            </div>
          </div>

          {/* Column 4: Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contacto Directo
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-forest-400 shrink-0 mt-0.5" />
                <span>Monterrey, San Pedro Garza García y Zona Metropolitana de NL</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-forest-400 shrink-0" />
                <a
                  href={`tel:${siteConfig.phoneClean}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-forest-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            <div className="mt-5">
              <Link
                href="/#simulador"
                className="inline-block text-xs font-semibold bg-forest-800 text-white hover:bg-forest-700 px-4 py-2.5 rounded-lg border border-forest-700 transition-colors w-full text-center"
              >
                Iniciar Simulación de Crédito
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Compliance */}
        <div className="pt-8 text-xs text-slate-400 space-y-3 leading-relaxed">
          <p>
            <strong className="text-slate-300">Aviso legal y regulatorio:</strong>{" "}
            {siteConfig.disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-forest-900/60 text-slate-400 text-xs">
            <p>
              © {new Date().getFullYear()} Hipoteca MTY. Todos los derechos reservados.
              Asesoría hipotecaria certificada vinculada a la red SOC Living.
            </p>
            <div className="flex gap-4">
              <Link href="/aviso-de-privacidad" className="hover:text-white">
                Privacidad
              </Link>
              <Link href="/preguntas-frecuentes" className="hover:text-white">
                FAQ
              </Link>
              <Link href="/contacto" className="hover:text-white">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
