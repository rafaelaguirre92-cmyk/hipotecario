export const siteConfig = {
  name: "Hipoteca MTY",
  legalName: "Asesoría Hipotecaria Certificada SOC Living",
  advisorName: "Rafael Aguirre",
  advisorTitle: "Asesor Hipotecario Certificado SOC Living",
  description:
    "Asesoría hipotecaria profesional, imparcial y sin costo para ti en Monterrey, San Pedro y todo Nuevo León. Comparamos las opciones de los principales bancos para encontrar tu hipoteca ideal.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hipotecamty.com",
  phone: "81 8000 0000",
  phoneClean: "528180000000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "528180000000",
  email: process.env.NOTIFICATION_EMAIL || "contacto@hipotecamty.com",
  location: "Monterrey, Nuevo León, México",
  coverage: [
    "Monterrey",
    "San Pedro Garza García",
    "San Nicolás de los Garza",
    "Guadalupe",
    "Apodaca",
    "Santa Catarina",
    "Carretera Nacional",
    "Santiago",
    "García",
    "Juárez",
  ],
  rates: {
    minReference: 8.8, // Tasa ilustrativa piso del mercado
    defaultReference: 9.85, // Tasa promedio de mercado
    scenarios: [
      { label: "Tasa preferencial", value: 8.8, desc: "Perfiles con excelente score y enganche > 20%" },
      { label: "Tasa promedio", value: 9.85, desc: "Tasa estándar competitiva de la banca" },
      { label: "Tasa conservadora", value: 11.2, desc: "Para presupuestar con un escenario precavido" },
    ],
  },
  partnerBanks: [
    { name: "Scotiabank", slug: "scotiabank" },
    { name: "Santander", slug: "santander" },
    { name: "Banorte", slug: "banorte" },
    { name: "HSBC", slug: "hsbc" },
    { name: "Citibanamex", slug: "citibanamex" },
    { name: "Afirme", slug: "afirme" },
    { name: "Banregio", slug: "banregio" },
    { name: "Hey Banco", slug: "heybanco" },
  ],
  navLinks: [
    { name: "Inicio", href: "/" },
    {
      name: "Servicios",
      href: "/#servicios",
      children: [
        { name: "Comprar casa", href: "/servicios/comprar-casa" },
        { name: "Comprar terreno", href: "/servicios/terreno" },
        { name: "Construcción", href: "/servicios/construccion" },
        { name: "Remodelación", href: "/servicios/remodelacion" },
        { name: "Mejorar hipoteca", href: "/servicios/mejora-hipoteca" },
        { name: "Liquidez hipotecaria", href: "/servicios/liquidez" },
      ],
    },
    { name: "Simulador", href: "/#simulador" },
    { name: "Sobre el Asesor", href: "/sobre-el-asesor" },
    { name: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
    { name: "Contacto", href: "/contacto" },
  ],
  disclaimer:
    "Esta simulación es orientativa y con fines ilustrativos. No representa una oferta formal de crédito, autorización ni cotización bancaria definitiva. La tasa, mensualidad y condiciones finales dependerán del perfil crediticio del solicitante, la institución financiera seleccionada, el valor de la propiedad y las políticas vigentes al momento del dictamen. Como bróker hipotecario certificado SOC Living, orientamos y tramitamos las opciones ante los bancos; no prestamos dinero directamente.",
};
