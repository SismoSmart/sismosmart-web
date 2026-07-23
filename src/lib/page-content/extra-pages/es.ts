import { makeExtraPages } from "@/lib/page-content/extra-pages/shared";

export const esExtraPages = makeExtraPages({
  technology: {
    eyebrow: "Tecnología",
    metaTitle: "Tecnología: cómo mide SismoSmart",
    metaDescription:
      "Qué hay dentro del dispositivo, cómo distingue un temblor real del ruido y cómo la medición se convierte en un informe legible.",
    title: "Qué hay dentro del dispositivo y cómo te llega el dato",
    description:
      "SismoSmart tiene un solo trabajo: registrar cómo se mueve un edificio. Tanto el aviso rápido durante el temblor como el informe posterior salen de ese mismo registro. Esta página explica cómo se toma.",
    sections: [
      ["Acelerómetro MEMS", "Dentro hay un sensor MEMS de clase ADXL355, alrededor de cien veces más sensible que el acelerómetro de un teléfono. Toma muestras en tres ejes 250 veces por segundo y llega a un piso de ruido cercano a 22 micro-g. Modesto al lado de una estación sísmica profesional, pero de calidad de laboratorio para hardware de consumo."],
      ["Detección STA/LTA", "El dispositivo compara el promedio del último medio segundo con el de los últimos treinta segundos. Cuando esa razón salta, hay un evento. El método se llama STA/LTA y es un estándar en sismología. La calibración piloto busca separar el ruido habitual del edificio de una sacudida, pero puede haber falsos positivos o eventos no detectados hasta completar la validación de campo."],
      ["Búfer local de eventos", "Al superarse el umbral, el dispositivo escribe en memoria una ventana de cuarenta segundos: cuatro antes del evento y treinta y seis después. Si en ese momento no hay internet, guarda la grabación y la envía cuando vuelve la conexión. Una app de teléfono no puede hacer esto."],
      ["Confirmación en la nube", "Que un solo dispositivo se dispare no es evidencia fuerte por sí misma. Cuando tres o más dispositivos de la misma zona se disparan en 60 segundos, el evento queda marcado como confirmado. Ahí es donde cae de verdad la tasa de falsas alarmas. Fuentes públicas como AFAD y USGS aportan una verificación cruzada extra."],
      ["Seguimiento de salud estructural", "Cada edificio tiene una frecuencia natural, el ritmo al que tiende a oscilar por su cuenta. El daño estructural empuja ese número hacia abajo. El dispositivo lo mide cada semana, aprende el patrón estacional y marca una caída inesperada. El nombre técnico del método es análisis modal."],
      ["Informe para el ingeniero", "Tras un evento, el informe trae la aceleración pico del suelo (PGA), la velocidad pico (PGV), una estimación de intensidad Modified Mercalli y el porcentaje de desplazamiento en la frecuencia natural de tu edificio. Son métricas estándar de la ingeniería sísmica. No estamos inventando una escala nueva."],
      ["Conectividad", "V1 funciona con Wi-Fi de 2.4 GHz. La versión empresarial (V2) sumará conectividad celular LTE-M y LoRa mesh, para que los administradores no tengan que meter el dispositivo en el Wi-Fi de la oficina."],
      ["Energía", "USB-C estándar, 5V/2A. Un supercondensador de 1 faradio da entre 30 y 60 segundos de energía puente durante un corte, suficiente para enviar el último evento a la nube. No hay batería que cambiar ni mantenimiento periódico."],
      ["Certificación", "Antes de que salga V1: CE RED (directiva europea de radio), aprobación de frecuencia BTK en Turquía, RoHS y WEEE. Todos los flujos de datos quedan documentados bajo KVKK. La aprobación FCC para el mercado estadounidense es un paso posterior."],
    ],
  },
  pilotProgram: {
    eyebrow: "Programa piloto",
    metaTitle: "Solicitud del programa piloto",
    metaDescription:
      "Piloto gratuito de seis meses para apartamentos, campus, fábricas o edificios de investigación. Ponemos los dispositivos y el soporte; pedimos feedback honesto a cambio.",
    title: "Queremos ver el dispositivo primero en tu edificio.",
    description:
      "El producto aún no está en venta amplia. Lo que buscamos en esta etapa son pocos sitios serios y gente que nos diga qué no funciona. Si encajas en uno de los cuatro grupos de abajo, el formulario al pie es la entrada.",
    sections: [
      ["Apartamentos", "Empezamos con un dispositivo en una vivienda. Si la administración se suma, añadimos equipos en otros pisos. El soporte de instalación es gratuito y ayudamos a coordinar con la administración."],
      ["Campus y fábricas", "Varios edificios, un único panel central. Cada edificio guarda su propio registro. Antes de instalar repasamos la topología de red y los requisitos de seguridad con tu equipo de TI."],
      ["Pilotos municipales", "Despliegues a escala de barrio que muestran dónde se sintió con más fuerza el mismo terremoto. Los datos personales quedan completamente fuera de este flujo. Solo se comparte el agregado por edificio o por ubicación."],
      ["Socios de investigación", "Departamentos universitarios de ingeniería sísmica. Abrimos los datos crudos al análisis académico y a cambio recibimos feedback y la opción de una publicación conjunta. Requiere un acuerdo de confidencialidad y uso de datos."],
      ["Lo que ofrecemos", "Entre tres y diez dispositivos gratis, y no te los pedimos de vuelta cuando termina el piloto. Seis meses sin coste. Acceso directo a tus propios datos. Soporte remoto de instalación por video y teléfono. Ver antes que nadie los cambios del producto mientras dura el piloto."],
      ["Lo que pedimos a cambio", "Que coordines la instalación con la administración o el personal del edificio. Hacemos una llamada de feedback de unos quince minutos al mes. Si ocurre un evento, te pedimos una nota breve. Al final nos gustaría publicar un caso de estudio corto, y con gusto dejamos tu nombre fuera."],
      ["De la solicitud a la instalación", "Rellenas el formulario. El comité piloto lo revisa en cinco días hábiles. Una llamada corta cubre el edificio y si encaja. Se cierran el Wi-Fi y los accesos, y se firma un acuerdo sencillo de cuatro páginas. Los dispositivos se envían. Estamos encima la primera semana y seguimos en contacto regular después."],
    ],
  },
  investors: {
    eyebrow: "Inversores",
    metaTitle: "Inversores: resumen de la ronda semilla",
    metaDescription:
      "Problema, mercado, equipo, hoja de ruta del producto y detalles de la ronda semilla. Un resumen breve para preparar una conversación.",
    title: "Hay una ventana después del terremoto que nadie mide.",
    description:
      "Tras un terremoto fuerte en Turquía, la inspección estructural tarda semanas. En esas semanas las familias adivinan, los negocios se paran y los seguros se atascan. SismoSmart es una startup de hardware que intenta cerrar esa ventana con los datos del propio edificio.",
    sections: [
      ["Problema", "Tras los terremotos de Kahramanmaraş en 2023, la evaluación de edificios en once provincias tardó meses. Los seguros se atascaron, los costes de realojo se dispararon y los vecinos no sabían cuándo podrían volver a casa. Todo el sistema descansa sobre las visitas de ingeniero, y ese es justo el paso que se bloquea en un evento grande."],
      ["Por qué ahora", "Los acelerómetros MEMS de calidad de laboratorio cuestan una quinta parte de lo que costaban hace diez años. Los microcontroladores de doble radio con Wi-Fi y BLE (ESP32-S3) han llegado a precio de consumo. El interés público e inversor por la tecnología de desastres en Turquía nunca ha sido tan alto como desde 2023. Hace tres años no se cumplía ninguna de las tres condiciones."],
      ["Mercado", "Turquía tiene unos veinte millones de hogares y cerca del 70% del país está en zona de riesgo sísmico. Nuestro primer objetivo son propietarios conscientes del riesgo en Estambul, Esmirna y Ankara. La segunda ola son administradores de fincas, aseguradoras y municipios. La tercera es el exterior: Chile, Indonesia, Japón y México."],
      ["Producto", "V1 es un dispositivo de consumo de 79 dólares con Wi-Fi. V1.5 añade microSD y giroscopio. V2 es la versión empresarial con conectividad celular y LoRa. Los ingresos vienen de dos líneas: venta de dispositivos y una suscripción de 5 dólares al mes. A escala apuntamos a una relación LTV/CAC en torno a trece veces."],
      ["Equipo", "Un asesor académico con doctorado en ingeniería sísmica, dos ingenieros civiles con máster trabajando en algoritmos de monitoreo de salud estructural y en el trabajo de campo del piloto, y un fundador que cubre el software embebido y la nube. Todos estamos en Turquía. Las conversaciones de colaboración académica están en marcha."],
      ["Competencia", "Los actores locales (EDIS, Multitek) se quedan en precios B2B y su experiencia móvil es floja. Las alertas gratuitas de Google en Android ocupan el espacio de la notificación, pero no tocan la salud del edificio. Grillo empezó en consumo y se movió hacia el sector público; la lección que sacamos es clara: el hardware de consumo por sí solo no se sostiene. Nosotros acompañamos el dispositivo con una suscripción desde el primer día."],
      ["Hoja de ruta", "Q2 2026: prototipo funcional con STA/LTA, MQTT y demo móvil. Q3 2026: entre cinco y diez instalaciones piloto y los primeros datos reales de campo. Q4 2026: cierre de la ronda semilla y constitución de la sociedad. Q1 2027: certificación CE y primera producción de 1.000 unidades. Q2 2027: lanzamiento y revisión de la placa V1.5."],
      ["Ronda semilla", "Buscamos el equivalente a 250 mil dólares, que nos dan dieciocho meses de margen de caja. Reparto: 36% producción, 32% equipo, 12% marketing, 8% certificación, 6% nube, 6% legal y reserva. En paralelo tenemos una solicitud a TÜBİTAK BiGG (1,35 millones de TL), programas de KOSGEB y créditos de AWS Activate, Google for Startups y Microsoft for Startups."],
      ["A quién buscamos", "Inversores ángel y fondos semilla que hayan visto antes una startup de hardware. Los socios con acceso a la regulación, la fabricación y las redes de seguros en Turquía valen más para nosotros que el dinero rápido. Compartimos la documentación técnica detallada y el modelo financiero bajo acuerdo de confidencialidad."],
    ],
  },
  faq: {
    eyebrow: "FAQ",
    metaTitle: "Preguntas frecuentes",
    metaDescription:
      "Respuestas directas sobre alertas, seguridad del edificio, datos, privacidad, instalación y fechas de lanzamiento.",
    title: "Preguntas frecuentes",
    description:
      "Los productos de terremotos se prometen de más con facilidad. Nosotros intentamos dejar los límites del dispositivo a la vista. Si tu pregunta no está respondida aquí, escribe a info@sismosmart.com.",
    sections: [
      ["¿Este dispositivo me avisará antes del terremoto?", "Hablamos de segundos, no de minutos. Si el terremoto viene de lejos, el dispositivo puede captar la onda P, que viaja más rápido, y avisarte antes de que llegue la onda S destructiva. Si el epicentro está cerca, ese margen se reduce casi a cero. No lo vendemos como sistema de alerta temprana, porque no funciona en todos los terremotos."],
      ["¿Un solo dispositivo puede decirme si mi edificio es seguro?", "No puede. Quien declara un edificio seguro o inseguro es un ingeniero, no un aparato. Lo que hace el dispositivo es dejarle a ese ingeniero algo sólido con lo que trabajar."],
      ["¿Qué datos recogen?", "Lecturas de vibración, temperatura, humedad, presión y el estado de funcionamiento del propio dispositivo. No vinculamos información personal al dispositivo y no vendemos tus datos a nadie. La página de Privacidad tiene el detalle."],
      ["¿Se expone mi ubicación exacta?", "Conocemos la ubicación de tu dispositivo a nivel de barrio, porque la necesitamos para cruzar un evento con los dispositivos cercanos. Cualquier cosa más precisa solo se comparte con un acuerdo piloto explícito."],
      ["¿Pueden los investigadores acceder a mis datos?", "Solo una vez anonimizados y solo bajo un acuerdo separado contigo. Ese flujo todavía no existe; está en la hoja de ruta."],
      ["¿En qué se diferencia de las alertas de Google?", "Google usa el acelerómetro de los teléfonos. Es gratis, ya está en todos los móviles y funciona bien. Pero lo que mide es el origen del terremoto, no tu edificio. Nosotros hacemos lo contrario: cómo vibra tu edificio, cómo cambia con la estación y en qué estado queda después. Un teléfono no responde a eso."],
      ["¿Qué pasa cuando se cae internet?", "El dispositivo sigue midiendo y guarda el evento en su propia memoria. No puede enviar una notificación, porque eso necesita conexión. Cuando internet vuelve, sube lo que estaba esperando."],
      ["¿Y si se corta la luz?", "Dentro hay un pequeño supercondensador. Da entre 30 y 60 segundos de energía puente, suficiente para enviar el último evento a la nube. Si el corte dura más, el dispositivo se apaga."],
      ["¿Es difícil instalarlo?", "Enchufas el cable USB-C, pegas el dispositivo a la pared con el adhesivo de atrás y lo emparejas desde la app. Sin taladro y sin técnico. Cinco minutos."],
      ["¿Cuántos debería tener un edificio?", "Con uno funciona. Pero con dos o tres en pisos distintos se ve cómo se mueven los pisos entre sí, y eso vale mucho más para el seguimiento de la salud estructural. En pilotos de apartamentos apuntamos a tres como mínimo por edificio."],
      ["¿Qué significan PGA, PGV y MMI?", "PGA es la aceleración máxima que alcanza el suelo durante un terremoto, en m/s². PGV es la velocidad máxima, en cm/s. MMI es la escala de intensidad Modified Mercalli, que describe cómo se sintió la sacudida de I a XII. El dispositivo reporta las tres tras un evento."],
      ["¿Qué dice la frecuencia natural?", "Cada edificio tiene una frecuencia a la que tiende a oscilar. Para un edificio de hormigón armado de cinco plantas suele estar entre 2 y 4 Hz. El daño estructural arrastra esa frecuencia hacia abajo. Como la seguimos con regularidad, podemos captar una señal cuando el daño todavía es temprano."],
      ["¿En qué dirección debe ir el dispositivo?", "Hay una flecha hacia arriba en la parte trasera; que apunte al techo. Intenta alinear los ejes X e Y del dispositivo con las direcciones horizontales del edificio. Montado a 90 grados los datos siguen sirviendo, aunque aportan algo menos de información."],
      ["¿El dispositivo graba sonido?", "No. No lleva micrófono, solo un acelerómetro que mide la vibración del suelo. Grabar voz o sonido ambiente exigiría un sensor completamente distinto."],
      ["¿Mis datos salen de Turquía?", "La residencia de datos del piloto aún no es definitiva. Antes de recoger datos del dispositivo, cada acuerdo indicará lugares de tratamiento, transferencias, conservación y base jurídica aplicable."],
      ["¿Cuándo sale a la venta?", "Los pilotos empiezan en verano de 2026. Apuntamos a la venta amplia para finales de 2026 o principios de 2027. La certificación y la fabricación pueden retrasarlo. Si te apuntas al boletín, te enterarás primero de la fecha firme."],
    ],
  },
  security: {
    eyebrow: "Seguridad",
    metaTitle: "Seguridad",
    metaDescription:
      "Cómo manejamos la seguridad del sitio, el consentimiento, los datos del dispositivo, el transporte cifrado y la privacidad durante la fase piloto.",
    title: "El dato que nunca recoges es el dato que no puedes filtrar.",
    description:
      "Esa es nuestra regla básica. Ahora mismo lo único en producción es el sitio web, pero el lado del dispositivo lo construimos con la misma regla.",
    sections: [
      ["Mínimo dato por defecto", "El dispositivo envía solo lo necesario: movimiento, información ambiental, estado de funcionamiento y la hora del evento. No recogemos nada más allá de eso."],
      ["Consentimiento antes de la analítica", "La analítica web se carga solo después de que des tu consentimiento. Puedes revertir esa elección cuando quieras desde el enlace del pie de página."],
      ["Transporte cifrado", "El sitio corre sobre HTTPS con cabeceras de seguridad. El tráfico del dispositivo está diseñado para ir cifrado de extremo a extremo."],
      ["Ningún secreto llega al navegador", "Las claves privadas y los tokens de servicio nunca aparecen en el código que llega al navegador. Se quedan en los ajustes del servidor o en GitHub Secrets."],
      ["Reporte de vulnerabilidades", "Si encuentras un problema de seguridad en el sitio o en materiales previos al lanzamiento, escribe a info@sismosmart.com. Agradecemos a quienes divulgan de forma responsable."],
      ["Plan de seguridad del dispositivo", "Antes de que salga el dispositivo nos comprometemos a: firmware firmado, flash cifrado, dos particiones OTA con reversión automática y una clave única por dispositivo provisionada en fábrica. La documentación de seguridad completa se publica junto con el dispositivo."],
    ],
  },
});
