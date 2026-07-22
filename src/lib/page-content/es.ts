import type { BaseRoutePagesCopy } from "@/lib/page-copy";

export const esPages: BaseRoutePagesCopy = {
  product: {
    meta: {
      title: "El dispositivo SismoSmart",
      description:
        "Un pequeño dispositivo de monitoreo sísmico para casa u oficina. Detecta temblores y registra cómo se comporta el edificio después de un terremoto.",
    },
    eyebrow: "Producto",
    title: "El dispositivo",
    description:
      "Un dispositivo de pared, alimentado por USB-C, de 100 x 100 x 27 mm. Diseñado para medir movimiento de forma fija y cuidadosa en casas y edificios pequeños.",
    deviceDescription:
      "En la caja vienen el dispositivo, un cable USB-C y una tira adhesiva de montaje. No necesitas ninguna otra herramienta para colocarlo.",
    meterTopLabel: "Sensor",
    meterTopValue: "MEMS preciso",
    meterBottomLabel: "Datos",
    meterBottomValue: "Cifrados, mínimos",
    imageAlt: "Dispositivo SismoSmart, vista frontal",
    specs: [
      { label: "Sensor", value: "MEMS de alta precisión" },
      { label: "Conectividad", value: "Wi-Fi + Bluetooth" },
      { label: "Instalación", value: "Cinco minutos, vía app" },
      { label: "Estado", value: "LED RGB + app" },
    ],
    useCases: [
      { title: "Casas y apartamentos", description: "Un dispositivo por vivienda, o piloto con varios equipos junto a la administración." },
      { title: "Campus y fábricas", description: "Organizaciones con varios edificios los siguen desde un solo panel." },
      { title: "Talleres y oficinas", description: "Monitoreo accesible y rápido para pequeños negocios." },
      { title: "Universidades", description: "Grupos de investigación sísmica pueden acceder a datos anónimos." },
    ],
    comparisonTitle: "Cómo se compara",
    comparisonDescription:
      "Está entre un sismógrafo profesional y una app de teléfono. No reemplazamos a ninguno: ofrecemos un dispositivo real a escala hogar.",
    comparisonRows: [
      { label: "Instalación", sismosmart: "Cinco minutos, tú mismo", traditional: "Requiere ingeniero", mobile: "Ninguna, solo app" },
      { label: "Dispositivo fijo", sismosmart: "Sí, montado al edificio", traditional: "Sí", mobile: "No, el teléfono se mueve" },
      { label: "Lectura estructural", sismosmart: "Sí, reporte simple", traditional: "Sí, reporte experto", mobile: "No" },
      { label: "Precio", sismosmart: "Escala hogar", traditional: "Escala empresarial", mobile: "Gratis" },
    ],
    ctaLabel: "Solicitar piloto",
    ctaHref: "/pilot-program",
  },
  howItWorks: {
    meta: { title: "Cómo funciona SismoSmart", description: "Monta el dispositivo, empareja el teléfono, el edificio se reconoce. Recibes aviso cuando hay sacudida y reporte después." },
    eyebrow: "Cómo funciona",
    title: "Dispositivo, nube, app: juntos.",
    description:
      "Son tres partes. El dispositivo mide la vibración. La nube recibe datos cifrados y compara con otros equipos. La app muestra solo lo importante.",
    flow: [
      { title: "Monta el dispositivo", description: "Pared interior, idealmente cerca de un elemento estructural." },
      { title: "Empareja con el teléfono", description: "Encuéntralo por Bluetooth desde la app. Comparte el Wi-Fi de forma segura." },
      { title: "El edificio aprende", description: "Durante los primeros días registra la vibración normal del edificio." },
      { title: "Reporte cuando hay evento", description: "Recibes un push cuando hay sacudida. Luego el reporte queda listo en la app." },
    ],
    signals: [
      { title: "Detección en el dispositivo", description: "El dispositivo no espera a la nube. Cuando empieza una sacudida real, actúa localmente y luego confirma." },
      { title: "Reporte post-terremoto", description: "Un resumen: aceleración máxima, duración y cambio en la frecuencia natural del edificio." },
      { title: "Solo los datos necesarios", description: "No observamos tu actividad. El dispositivo comparte vibración, temperatura, humedad, presión y su propio estado." },
    ],
    network: [
      { title: "Red de barrio", description: "Cuando tres o más dispositivos cercanos se activan juntos, el evento se marca como confirmado. Las falsas alarmas bajan mucho." },
      { title: "Seguimiento estructural", description: "La vibración del edificio cambia con semanas y meses. Un cambio repentino puede indicar un problema." },
      { title: "Interfaz simple", description: "El dispositivo hace trabajo complejo. Tú ves un estado simple: verde, amarillo, rojo." },
    ],
  },
  about: {
    meta: { title: "Acerca de", description: "Quién construye SismoSmart y por qué. El equipo, la mirada y el destino." },
    eyebrow: "Acerca de",
    title: "Vivimos en Türkiye. Queremos edificios sanos.",
    description:
      "Nos reunimos después de los terremotos de Kahramanmaraş 2023 y Estambul 2026. Queríamos saber cómo responden nuestras casas y nuestra ciudad. Por eso hicimos el dispositivo.",
    story: [
      "Después de un gran terremoto en Türkiye, revisar edificios toma semanas o meses. Mientras tanto, las familias no saben si pueden volver a casa.",
      "No eliminaremos esa espera por completo. Al final debe visitar un ingeniero. Pero antes de eso queremos una capa de datos que diga: este edificio parece bien, o este edificio es prioridad.",
      "El equipo tiene un asesor académico en ingeniería civil, dos investigadores MSc y un fundador en hardware y software. Estamos en Türkiye. Probamos el dispositivo en nuestras casas.",
    ],
    principles: [
      { title: "Informar sin asustar", description: "No haremos marketing de desastres. El dispositivo crea preparación, no pánico." },
      { title: "Decir los límites", description: "Diremos lo que no hacemos. No somos alerta oficial. No reemplazamos el reporte de un ingeniero." },
      { title: "Devolver los datos", description: "Los datos de tu edificio son tuyos. Agregados anónimos pueden ir a academia o gobierno. Los datos personales no se venden." },
    ],
    timeline: [
      { period: "T1 2026", title: "Equipo y visión", description: "Equipo base reunido, decisiones principales tomadas, arquitectura escrita." },
      { period: "T2 2026", title: "Prototipo y piloto", description: "Primer prototipo de hardware, base de app móvil, primeras conversaciones de campo." },
      { period: "T3 2026", title: "Primeras instalaciones", description: "Cinco a diez edificios, tres meses de datos, feedback y producto final." },
      { period: "T4 2026 / T1 2027", title: "Certificación y fabricación", description: "Certificación CE, primeros 1.000 dispositivos, lanzamiento amplio." },
    ],
    team: [
      { name: "Fundador", role: "Hardware, software, producto", bio: "Responsable de sistemas embebidos, IoT, nube y producto." },
      { name: "Asesor académico", role: "Ingeniería sísmica", bio: "Doctor en ingeniería civil. Valida científicamente los algoritmos de salud estructural." },
      { name: "Ingenieros civiles", role: "Salud estructural y pilotos", bio: "Dos investigadores MSc. Llevan los algoritmos de edificio y la validación en campo." },
    ],
  },
  contact: {
    meta: { title: "Contacto", description: "Si quieres hablar con SismoSmart, este es el canal. Producto, piloto, prensa o inversores." },
    eyebrow: "Contacto",
    title: "Escribe, respondemos.",
    description: "El canal más rápido ahora es email. Un asunto claro llega a la persona correcta.",
    channels: [
      { title: "General", description: "Preguntas de producto, pilotos, interés de compra", value: "info@sismosmart.com", href: "mailto:info@sismosmart.com" },
      { title: "Prensa", description: "Entrevistas, kit de prensa, colaboración", value: "press@sismosmart.com", href: "mailto:press@sismosmart.com" },
      { title: "LinkedIn", description: "Actualizaciones profesionales y de empresa", value: "linkedin.com/company/sismosmart", href: "https://www.linkedin.com/company/sismosmart" },
    ],
    form: {
      nameLabel: "Tu nombre",
      emailLabel: "Email",
      subjectLabel: "Asunto",
      messageLabel: "Tu mensaje",
      buttonLabel: "Enviar",
      consentLabel: "Acepto que esta información se procese para revisar y responder mi mensaje.",
      note: "Solo usamos esta información para responder tu mensaje.",
      loadingLabel: "Enviando...",
      successMessage: "Tu mensaje fue enviado. Responderemos lo antes posible.",
      errorMessage: "Algo salió mal. Inténtalo de nuevo.",
      missingEndpointMessage: "El formulario aún no está conectado. Escribe a info@sismosmart.com.",
      rateLimitedMessage:
        "Demasiados intentos. Inténtalo de nuevo en unos minutos.",
    },
  },
  privacy: {
    meta: { title: "Privacidad", description: "Qué datos recogemos, por qué los usamos y con quién los compartimos. Sin rodeos." },
    eyebrow: "Privacidad",
    title: "Política de privacidad",
    description: "No recogemos datos que no necesitamos. Usamos lo que recogemos solo para lo dicho. No lo vendemos.",
    sections: [
      { title: "Datos que recogemos", description: "En el sitio: email, formulario de contacto y preferencias de cookies. Desde el dispositivo, después del lanzamiento: vibración, temperatura, humedad, presión, estado y ubicación aproximada." },
      { title: "Para qué los usamos", description: "Responder mensajes, gestionar pilotos, enviar anuncios, mantener el dispositivo conectado, comparar eventos y mejorar el producto." },
      { title: "Con quién los compartimos", description: "Los formularios pueden pasar por un proveedor de formularios. Los datos del dispositivo se procesan en la nube elegida. No vendemos datos personales." },
      { title: "Tus derechos", description: "Puedes acceder, corregir, borrar o exportar tus datos. Escribe a info@sismosmart.com." },
    ],
  },
  terms: {
    meta: { title: "Términos de uso", description: "Condiciones básicas para usar el sitio y la información previa al lanzamiento." },
    eyebrow: "Términos",
    title: "Términos de uso",
    description: "El sitio está antes del lanzamiento. Estos términos aplican a esta fase.",
    sections: [
      { title: "Informativo", description: "Este sitio informa sobre SismoSmart y acepta solicitudes piloto. No es un servicio sísmico oficial ni un canal de alerta." },
      { title: "No es garantía", description: "El dispositivo apoya la preparación. No reemplaza alertas oficiales, instrucciones de emergencia ni reportes de ingeniería." },
      { title: "Propiedad intelectual", description: "El nombre, logo, diseño y contenido de SismoSmart pertenecen a SismoSmart. No pueden reproducirse sin permiso." },
      { title: "Contacto", description: "Preguntas a info@sismosmart.com." },
    ],
  },
  press: {
    meta: { title: "Kit de prensa", description: "Información, visuales y contacto para prensa." },
    eyebrow: "Prensa",
    title: "Kit de prensa",
    description: "Un recurso de una página para medios, socios y entrevistas.",
    sections: [
      { title: "Descripción breve", description: "SismoSmart fabrica un dispositivo de monitoreo sísmico para casas y edificios pequeños. Mide el edificio, avisa al teléfono y registra el estado posterior. Pilotos en 2026, lanzamiento en 2027." },
      { title: "Contacto de prensa", description: "Para entrevistas, imágenes o demo: press@sismosmart.com." },
    ],
    links: [
      { title: "Logo", description: "Logo SVG vectorial", href: "/logo-symbol.svg" },
      { title: "Imagen de producto", description: "Render de alta resolución", href: "/images/device/sismosmart-device-front.png" },
      { title: "Imagen social", description: "Tarjeta 1200x630", href: "/images/og/sismosmart-og.png" },
    ],
  },
};
