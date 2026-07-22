import type { SiteCopy } from "@/lib/site";

export const esCopy: SiteCopy = {
  accessibility: { skipToContent: "Ir al contenido" },
  meta: {
    title: "Monitoreo sísmico para tu edificio",
    description:
      "SismoSmart es un pequeño dispositivo de monitoreo sísmico que montas en la pared. Mide cómo se mueve tu edificio y avisa a tu teléfono cuando la sacudida es seria. Un ingeniero puede leer el registro después.",
  },
  navigation: {
    eyebrow: "Monitoreo sísmico para edificios",
    primaryCta: "Solicitud piloto",
    links: [
      { label: "Tecnología", href: "/technology" },
      { label: "Producto", href: "/product" },
      { label: "Piloto", href: "/pilot-program" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  hero: {
    badge: "Startup de hardware en etapa temprana",
    title: "¿Cómo se movió tu edificio en el terremoto? Hicimos un dispositivo que lo mide.",
    description:
      "SismoSmart se enchufa a un tomacorriente y se fija a la pared. Mide el movimiento de tu edificio de forma continua y avisa a tu teléfono cuando la sacudida es seria. Su trabajo real es el registro que guarda: cuando llega el ingeniero, puede leer cómo se comportó el edificio en ese momento.",
    primaryCta: "Solicitar piloto",
    secondaryCta: "Resumen para inversores",
    tertiaryCta: "Ver la tecnología",
    primaryHref: "/pilot-program",
    secondaryHref: "/investors",
    tertiaryHref: "/technology",
    stats: [
      { label: "Montaje", value: "Fijo en pared" },
      { label: "Detección", value: "En el dispositivo" },
      { label: "Muestreo", value: "250 Hz, 3 ejes" },
      { label: "Puente de energía", value: "30-60 s supercap" },
    ],
    deviceEyebrow: "El dispositivo SismoSmart",
    deviceTitle: "100 × 100 mm. Se fija a la pared y funciona desde el enchufe.",
    deviceDescription:
      "Lo pegas a la pared y lo enchufas. Lo emparejas desde la app y le das tu Wi-Fi. A partir de ahí todo ocurre en segundo plano: empieza a medir la vibración del edificio y en un día normal no lo notas.",
    deviceSpecs: [
      "Medición de movimiento en tres ejes",
      "Registro local durante eventos",
      "Datos cifrados por Wi-Fi",
    ],
    meterTopLabel: "Detección",
    meterTopValue: "En el dispositivo",
    meterBottomLabel: "Datos",
    meterBottomValue: "Cifrados",
    imageAlt: "Dispositivo SismoSmart de monitoreo sísmico con LED de estado",
  },
  trust: {
    eyebrow: "Dónde estamos",
    title: "Hay cosas que este dispositivo no puede hacer.",
    description:
      "SismoSmart sigue en fase piloto. Lo que hace es registrar lo que pasa dentro de tu edificio y convertirlo en datos que puedas revisar después. No competimos con los sistemas oficiales de alerta ni con la inspección estructural posterior al terremoto. Ambos siguen en su sitio. Nosotros cubrimos el hueco que queda entre ellos.",
    items: [
      { label: "Etapa", value: "Piloto" },
      { label: "Trabajo principal", value: "Registrar movimiento" },
      { label: "Decisión estructural", value: "La tiene el ingeniero" },
    ],
  },
  howItWorks: {
    eyebrow: "Cómo funciona",
    title: "La instalación toma unos minutos y el resto ocurre en segundo plano.",
    description:
      "Una vez montado, no tienes que hacer nada más. Pasa los primeros días aprendiendo el perfil de vibración normal de tu edificio, y después puede distinguir lo que no es normal.",
    steps: [
      { title: "Móntalo en una pared", description: "Elige una pared interior estable. La tira adhesiva ya viene puesta, y también hay orificios por si prefieres atornillarlo." },
      { title: "Empareja desde la app", description: "La app encuentra el dispositivo por Bluetooth. Escribes la clave del Wi-Fi una vez y ya está." },
      { title: "Aprende el edificio", description: "Durante unos días el dispositivo escucha la vibración normal. Aprende qué pasa cuando cruza un camión y qué pasa en un día de viento. Solo puede detectar lo anormal cuando conoce lo normal." },
      { title: "Avisa cuando empieza la sacudida", description: "Cuando detecta una vibración seria, llega una notificación al teléfono. Si otros dispositivos cercanos vieron lo mismo, el aviso llega marcado como confirmado." },
      { title: "Registra el evento", description: "Los datos en bruto de durante y después de la sacudida quedan en el dispositivo y viajan a la nube. Un ingeniero puede leer ahí cómo respondió el edificio." },
      { title: "Más dispositivos, mejor resultado", description: "Con varios equipos en un edificio se ve cómo se mueven los pisos entre sí. Con varios en un barrio, bajan las falsas alarmas." },
    ],
  },
  features: {
    eyebrow: "Qué hace",
    title: "En realidad hace varios trabajos distintos a la vez.",
    description:
      "Avisarte durante el terremoto es solo uno de ellos. Lo valioso está antes y después: sigue la salud del edificio durante meses y guarda lo que ocurrió mientras el suelo se movía.",
    items: [
      { accent: "01", title: "Detecta temblores", description: "Un sensor MEMS sensible lee la vibración del suelo 250 veces por segundo. Lo bastante fino como para distinguir un camión de una sacudida real." },
      { accent: "02", title: "Avisa a tu teléfono", description: "Cuando detecta una sacudida, sale un push. El mensaje dice qué hacer: agáchate, cúbrete, agárrate." },
      { accent: "03", title: "Sigue la salud del edificio", description: "Cada edificio tiene una frecuencia natural. El dispositivo la sigue, junto con la amortiguación, durante meses. Un cambio inesperado ahí puede ser la primera señal de un problema estructural." },
      { accent: "04", title: "Informa después del terremoto", description: "La aceleración máxima, la duración y la respuesta del edificio terminan en un solo informe. El ingeniero llega con un punto de partida." },
      { accent: "05", title: "También lee temperatura y humedad", description: "Un edificio no se comporta igual en invierno que en verano. Sin datos ambientales no puedes separar esa deriva estacional de un daño real." },
      { accent: "06", title: "Juntos funcionan mejor", description: "Cada dispositivo del barrio aporta a la señal común. Cuantos más hay, más rápida es la confirmación y menos falsas alarmas quedan." },
    ],
  },
  demo: {
    eyebrow: "Flujo de datos",
    title: "La medición empieza en el dispositivo y termina en tu teléfono.",
    description:
      "El dispositivo mide, cifra y envía. La app convierte eso en algo legible: si el equipo está vivo, cuál fue el último evento y hacia dónde va tu edificio.",
    previewLabel: "Registro del edificio",
    networkLabel: "Red de barrio",
    sensorLabel: "Dispositivo",
    sensorValue: "Activo",
    eventLabel: "Último evento",
    eventValue: "Registrado, revisable",
    bullets: [
      "El sensor MEMS fijo tiene un piso de ruido de 22 µg. Un teléfono ronda los 2.000 µg. La diferencia es de unas cien veces.",
      "Puedes ver los datos de vibración de tu edificio sin entregar información personal.",
      "El dispositivo no decide por el ingeniero. Le da mejores datos.",
    ],
    cta: "Ver la tecnología",
    ctaHref: "/technology",
  },
  proof: {
    eyebrow: "Camino piloto",
    title: "Queremos probarlo primero en unos pocos edificios reales.",
    description:
      "Antes de escalar el producto queremos verlo en campo. El feedback de los primeros pilotos decidirá cómo queda el dispositivo final. Por ahora hablamos con tres grupos.",
    cards: [
      { title: "Apartamentos", description: "Un dispositivo en algunas viviendas y otro en la zona común. Lo acordamos con la administración y lo instalamos gratis durante seis meses.", highlight: "Piloto gratuito" },
      { title: "Campus y fábricas", description: "Instalaciones con más de un edificio. Un dispositivo por edificio, todos visibles desde un único panel.", highlight: "Empresarial" },
      { title: "Universidades", description: "Compartimos datos con departamentos de ingeniería sísmica. Los investigadores acceden a datos anónimos y nosotros recibimos revisión académica.", highlight: "Colaboración académica" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    description: "Si tu pregunta está aquí, la respuesta también. Si no, escribe a info@sismosmart.com y te respondemos. La lista completa está en la página de FAQ.",
    items: [
      { title: "¿Me avisará antes de un terremoto?", description: "Hablamos de segundos, no de minutos. Si el terremoto viene de lejos, el dispositivo puede captar la onda P y avisarte antes de que llegue la onda S destructiva. Si el epicentro está cerca, ese margen se reduce casi a cero. No lo vendemos como un sistema de alerta temprana, porque no funciona en todos los terremotos." },
      { title: "¿En qué se diferencia de las alertas de Google?", description: "Google usa el acelerómetro de los teléfonos. Es gratis, ya está en todos los móviles y funciona bien. Pero lo que mide es el origen del terremoto, no tu edificio. Nosotros hacemos lo contrario: cómo vibra tu edificio, cómo cambia con la estación y en qué estado queda después. Un teléfono no responde eso." },
      { title: "¿Un dispositivo dice si mi edificio es seguro?", description: "No puede. Quien declara un edificio seguro o inseguro es un ingeniero, no un aparato. Lo que hace el dispositivo es dejarle a ese ingeniero algo sólido con lo que trabajar." },
      { title: "¿Es difícil instalarlo?", description: "Enchufas el cable USB-C, pegas el dispositivo a la pared con el adhesivo de atrás y lo emparejas desde la app. Sin taladro y sin técnico. Cinco minutos." },
      { title: "¿Qué pasa si se corta la luz o internet?", description: "Si se va internet, el dispositivo sigue midiendo, guarda el evento en su memoria y lo sube cuando vuelve la conexión. Si se va la luz, el supercondensador le da entre 30 y 60 segundos de energía puente, suficiente para enviar el último evento a la nube. Si el corte dura más, se apaga." },
      { title: "¿Cuándo sale a la venta?", description: "Los pilotos empiezan en verano de 2026 y apuntamos a la venta amplia para finales de 2026. La certificación y la fabricación pueden mover esa fecha. Si te apuntas al boletín, te enterarás primero." },
    ],
  },
  newsletter: {
    eyebrow: "Contáctanos",
    title: "Hablemos antes del lanzamiento.",
    description:
      "Si eres una administración de edificio que quiere un piloto, un inversor o alguien de una organización socia, cuéntanos brevemente qué buscas. Te ponemos con la persona correcta.",
    inputLabel: "Email",
    placeholder: "tu@empresa.com",
    button: "Enviar",
    consent: "Acepto recibir emails sobre lanzamiento, pilotos e inversores de SismoSmart.",
    note: "Usamos tu email solo para este propósito.",
    loading: "Enviando...",
    success: "Tu mensaje nos llegó. Te respondemos pronto.",
    error: "Algo salió mal. Inténtalo de nuevo.",
    missingEndpoint: "El formulario aún no está conectado. Puedes escribir a info@sismosmart.com.",
    rateLimited:
      "Demasiados intentos. Inténtalo de nuevo en unos minutos.",
  },
  footer: {
    legal: "© 2026 SismoSmart. Todos los derechos reservados.",
  },
};
