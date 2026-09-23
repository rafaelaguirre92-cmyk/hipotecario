"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Menu,
  X,
  Calculator,
  ChevronDown,
  Phone,
  ShieldCheck,
  Home,
} from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-forest-800/10 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-forest-950 text-white text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-warm-400" />
        <span>
          Asesoría hipotecaria certificada <strong>SOC Living</strong> en Monterrey y NL • Nuestro servicio no tiene costo para ti
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-forest-900 text-white flex items-center justify-center shadow-md group-hover:bg-forest-800 transition-colors">
              <Home className="w-5 h-5 text-warm-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-forest-950 leading-none">
                Hipoteca <span className="text-forest-700">MTY</span>
              </span>
              <span className="text-[10px] tracking-wider font-semibold text-slate-500 uppercase mt-0.5">
                Asesoría SOC Living
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-700 hover:text-forest-800 transition-colors"
            >
              Inicio
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-forest-800 transition-colors py-2"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Servicios</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-forest-800 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 py-3 z-50">
                <Link
                  href="/servicios/comprar-casa"
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-forest-50 hover:text-forest-900 rounded-lg font-medium transition-colors"
                >
                  Comprar casa
                </Link>
                <Link
                  href="/servicios/terreno"
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-forest-50 hover:text-forest-900 rounded-lg font-medium transition-colors"
                >
                  Comprar terreno
                </Link>
                <Link
                  href="/servicios/construccion"
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-forest-50 hover:text-forest-900 rounded-lg font-medium transition-colors"
                >
                  Construcción en terreno
                </Link>
                <Link
                  href="/servicios/remodelacion"
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-forest-50 hover:text-forest-900 rounded-lg font-medium transition-colors"
                >
                  Remodelación de vivienda
                </Link>
                <Link
                  href="/servicios/mejora-hipoteca"
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-forest-50 hover:text-forest-900 rounded-lg font-medium transition-colors"
                >
                  Mejora o sustitución de hipoteca
                </Link>
                <Link
                  href="/servicios/liquidez"
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-forest-50 hover:text-forest-900 rounded-lg font-medium transition-colors"
                >
                  Liquidez con garantía hipotecaria
                </Link>
              </div>
            </div>

            <Link
              href="/#simulador"
              className="text-sm font-medium text-slate-700 hover:text-forest-800 transition-colors"
            >
              Simulador
            </Link>
            <Link
              href="/sobre-el-asesor"
              className="text-sm font-medium text-slate-700 hover:text-forest-800 transition-colors"
            >
              Sobre el Asesor
            </Link>
            <Link
              href="/preguntas-frecuentes"
              className="text-sm font-medium text-slate-700 hover:text-forest-800 transition-colors"
            >
              Preguntas Frecuentes
            </Link>
            <Link
              href="/contacto"
              className="text-sm font-medium text-slate-700 hover:text-forest-800 transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                "Hola, me gustaría recibir asesoría para un crédito hipotecario en Monterrey."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-forest-900 transition-colors px-3 py-2"
            >
              <Phone className="w-3.5 h-3.5 text-forest-700" />
              <span>{siteConfig.phone}</span>
            </a>

            <Link
              href="/#simulador"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-forest-900 text-white hover:bg-forest-800 shadow-sm hover:shadow transition-all"
            >
              <Calculator className="w-4 h-4 text-warm-400" />
              <span>Simular Crédito</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/#simulador"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-forest-900 text-white inline-flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5 text-warm-400" />
              <span>Simular</span>
            </Link>

            <button
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-forest-50 rounded-lg"
            >
              Inicio
            </Link>
            <div className="border-l-2 border-forest-600 pl-3 my-2 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-3 pt-1">
                Servicios
              </span>
              <Link
                href="/servicios/comprar-casa"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm text-slate-700 hover:text-forest-900"
              >
                Comprar casa
              </Link>
              <Link
                href="/servicios/terreno"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm text-slate-700 hover:text-forest-900"
              >
                Comprar terreno
              </Link>
              <Link
                href="/servicios/construccion"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm text-slate-700 hover:text-forest-900"
              >
                Construcción
              </Link>
              <Link
                href="/servicios/remodelacion"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm text-slate-700 hover:text-forest-900"
              >
                Remodelación
              </Link>
              <Link
                href="/servicios/mejora-hipoteca"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm text-slate-700 hover:text-forest-900"
              >
                Mejorar hipoteca
              </Link>
              <Link
                href="/servicios/liquidez"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-sm text-slate-700 hover:text-forest-900"
              >
                Liquidez hipotecaria
              </Link>
            </div>

            <Link
              href="/#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-forest-50 rounded-lg"
            >
              Simulador Hipotecario
            </Link>
            <Link
              href="/sobre-el-asesor"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-forest-50 rounded-lg"
            >
              Sobre el Asesor SOC
            </Link>
            <Link
              href="/preguntas-frecuentes"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-forest-50 rounded-lg"
            >
              Preguntas Frecuentes
            </Link>
            <Link
              href="/contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-forest-50 rounded-lg"
            >
              Contacto
            </Link>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                "Hola, quiero asesoría para un crédito hipotecario en Monterrey."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-4 rounded-xl bg-forest-900 text-white font-semibold text-sm shadow hover:bg-forest-800"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
