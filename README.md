# Hipoteca MTY — MVP

Sitio web mobile-first para asesoría hipotecaria certificada (**SOC Living**) en Monterrey, San Pedro Garza García y todo Nuevo León.

El sistema cuenta con un circuito de conversión de alta eficiencia:
```
Visita → Simulador interactivo → Formulario precalificación (datos heredados) → API Serverless Vercel → Google Sheets en Google Drive → Redirección a WhatsApp con folio y mensaje precargado
```

---

## 🚀 Características Principales

1. **Simulador Hipotecario Interactivo**:
   - Fórmula matemática real de amortización mensual:
     $$M = P \cdot \frac{r(1+r)^n}{(1+r)^n - 1}$$
   - Selección dinámica de valor de la propiedad y enganche con cálculo de porcentaje en tiempo real.
   - Plazos de 5, 10, 15 y 20 años.
   - Tasa anual de referencia editable con selector de escenarios (8.80% preferencial, 9.85% promedio, 11.20% precavido).
   - Estimación aproximada de gastos iniciales de escrituración en Nuevo León (ISAI 3%, notaría, avalúo ~5.5%).
   - Alertas preventivas si el enganche es menor al 10%.
   - Botón CTA *"Quiero saber si puedo obtener este crédito"* que desplaza y transfiere los datos calculados al formulario sin volver a capturarlos.

2. **Formulario de Precalificación conectado a Google Sheets**:
   - Campos de contacto, proyecto y perfil financiero preliminar.
   - Campo honeypot anti-spam para descartar bots silenciosamente.
   - Captura de parámetros UTM (`utm_source`, `utm_medium`, `utm_campaign`) y URL de procedencia.
   - Casilla obligatoria de aceptación del Aviso de Privacidad (LFPDPPP).

3. **Backend Seguro en Vercel (`POST /api/leads`)**:
   - Conexión server-side a Google Sheets v4 mediante Cuenta de Servicio de Google Cloud.
   - **Las credenciales nunca se exponen al navegador**.
   - Sanitización contra inyección de fórmulas (`=`, `+`, `-`, `@`).
   - Modo mock para desarrollo local si aún no se configuran las credenciales en `.env.local`.

4. **Página de Confirmación y WhatsApp**:
   - Generación de folio único por prospecto (ej. `MTY-20260922-8F3A`).
   - Botón con mensaje preformateado de WhatsApp listo para enviar al asesor.

5. **Páginas de Servicios Especializadas**:
   - `/servicios/comprar-casa`: Adquisición de vivienda nueva o usada.
   - `/servicios/terreno`: Compra de lote o terreno residencial.
   - `/servicios/construccion`: Construcción en terreno propio por ministraciones.
   - `/servicios/remodelacion`: Remodelación y ampliación de vivienda.
   - `/servicios/mejora-hipoteca`: Sustitución para bajar tasa o mensualidad.
   - `/servicios/liquidez`: Liquidez con garantía hipotecaria.

6. **SEO Local y Cumplimiento**:
   - Metadatos optimizados para Monterrey y Nuevo León.
   - Schema.org JSON-LD para `FinancialService` y `LocalBusiness`.
   - `sitemap.xml` y `robots.txt` generados dinámicamente.
   - Aviso de Privacidad integral.

---

## 📋 Estructura de Columnas en Google Sheets

Crea un Google Sheet llamado **"Prospectos — Hipoteca MTY"** con una pestaña llamada **"Leads"**.

Las 29 columnas que registra la API son:
1. `Fecha y hora` (Zona horaria Monterrey / CDMX)
2. `ID del prospecto` (ej. MTY-20260922-8F3A)
3. `Nombre`
4. `WhatsApp`
5. `Correo`
6. `Ciudad`
7. `Estado`
8. `Tipo de operación`
9. `Tiempo estimado`
10. `Valor de propiedad`
11. `Enganche`
12. `Porcentaje de enganche`
13. `Ingreso mensual`
14. `Tipo de empleo`
15. `Solicita con otra persona`
16. `Tiene hipoteca actual`
17. `Plazo`
18. `Tasa simulada`
19. `Monto estimado del crédito`
20. `Mensualidad estimada`
21. `Fuente`
22. `URL de origen`
23. `UTM Source`
24. `UTM Medium`
25. `UTM Campaign`
26. `Consentimiento`
27. `Estado del prospecto` (Valor inicial: "Nuevo")
28. `Último contacto`
29. `Notas`

---

## 🔑 Configuración de Google Cloud Service Account

Para conectar la API de Vercel con tu Google Sheet:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un proyecto (ejemplo: `hipoteca-mty-crm`).
3. Habilita la **Google Sheets API** en **APIs & Services > Library**.
4. Ve a **IAM & Admin > Service Accounts** y haz clic en **Create Service Account**.
5. Asigna un nombre (ej. `leads-collector`) y presiona **Create**.
6. En la pestaña **Keys** de la Service Account creada, haz clic en **Add Key > Create new key > JSON**. Se descargará un archivo `.json`.
7. Abre tu hoja de Google Sheets en tu navegador y haz clic en **Compartir**. Añade el correo de la cuenta de servicio (`ejemplo@hipoteca-mty-crm.iam.gserviceaccount.com`) con rol de **Editor**.
8. Copia las variables correspondientes a tu archivo `.env.local` o a los Environment Variables de Vercel.

---

## ⚙️ Variables de Entorno

```env
# Google Sheets
GOOGLE_SHEET_ID=tu_spreadsheet_id_aqui
GOOGLE_SHEET_TAB=Leads
GOOGLE_CLIENT_EMAIL=ejemplo@hipoteca-mty.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Contacto y Notificaciones
NEXT_PUBLIC_WHATSAPP_NUMBER=528180000000
NOTIFICATION_EMAIL=contacto@hipotecamty.com
NEXT_PUBLIC_SITE_URL=https://hipotecamty.com
```

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (validación de TypeScript y rutas)
npm run build
```

El sitio se abrirá en [http://localhost:3000](http://localhost:3000).
