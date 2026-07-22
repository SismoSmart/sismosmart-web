import type { SiteCopy } from "@/lib/site";

export const ptCopy: SiteCopy = {
  accessibility: { skipToContent: "Ir para o conteúdo" },
  meta: {
    title: "Monitoramento sísmico para seu prédio",
    description:
      "SismoSmart é um pequeno dispositivo de monitoramento sísmico que você instala na parede. Ele mede como seu prédio se move e avisa o celular quando o tremor é sério. O registro pode ser lido por um engenheiro depois.",
  },
  navigation: {
    eyebrow: "Monitoramento sísmico para prédios",
    primaryCta: "Inscrição piloto",
    links: [
      { label: "Tecnologia", href: "/technology" },
      { label: "Produto", href: "/product" },
      { label: "Piloto", href: "/pilot-program" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  hero: {
    badge: "Startup de hardware em fase inicial",
    title: "Como seu prédio se moveu no terremoto? Criamos um dispositivo que mede isso.",
    description:
      "SismoSmart é ligado na tomada e fixado na parede. Ele mede o movimento do prédio continuamente e avisa seu celular quando o tremor é sério. O trabalho de verdade é o registro que ele guarda: quando o engenheiro chega, dá para ler como o prédio se comportou naquele momento.",
    primaryCta: "Inscrever no piloto",
    secondaryCta: "Resumo para investidores",
    tertiaryCta: "Ver a tecnologia",
    primaryHref: "/pilot-program",
    secondaryHref: "/investors",
    tertiaryHref: "/technology",
    stats: [
      { label: "Montagem", value: "Fixo na parede" },
      { label: "Detecção", value: "No dispositivo" },
      { label: "Amostragem", value: "250 Hz, 3 eixos" },
      { label: "Ponte de energia", value: "30-60 s supercap" },
    ],
    deviceEyebrow: "O dispositivo SismoSmart",
    deviceTitle: "100 × 100 mm. Fixa na parede e funciona na tomada.",
    deviceDescription:
      "Você cola na parede e liga na tomada. Pareia pelo app e passa o Wi-Fi. Dali em diante tudo acontece em segundo plano: ele começa a medir a vibração do prédio e num dia comum você nem lembra que ele está lá.",
    deviceSpecs: ["Medição de movimento em três eixos", "Registro local durante eventos", "Dados Wi-Fi criptografados"],
    meterTopLabel: "Detecção",
    meterTopValue: "No dispositivo",
    meterBottomLabel: "Dados",
    meterBottomValue: "Criptografados",
    imageAlt: "Dispositivo SismoSmart de monitoramento sísmico com LED de status",
  },
  trust: {
    eyebrow: "Onde estamos",
    title: "Há coisas que este dispositivo não faz.",
    description:
      "SismoSmart ainda está em fase piloto. O que ele faz é registrar o que acontece dentro do seu prédio e transformar isso num dado que você possa revisar depois. Não competimos com os sistemas oficiais de alerta nem com a inspeção estrutural que vem depois do terremoto. Os dois continuam no lugar deles. Nós cobrimos o vão que sobra entre eles.",
    items: [
      { label: "Fase", value: "Piloto" },
      { label: "Tarefa principal", value: "Registrar movimento" },
      { label: "Decisão estrutural", value: "Fica com o engenheiro" },
    ],
  },
  howItWorks: {
    eyebrow: "Como funciona",
    title: "A instalação leva alguns minutos e o resto corre em segundo plano.",
    description:
      "Depois de instalado, não sobra nada para você fazer. Ele passa os primeiros dias aprendendo o perfil de vibração normal do prédio e, a partir daí, consegue separar o que não é normal.",
    steps: [
      { title: "Instale na parede", description: "Escolha uma parede interna estável. A fita adesiva já vem colada e há furos para parafuso se você preferir fixar melhor." },
      { title: "Pareie pelo app", description: "O app encontra o dispositivo por Bluetooth. Você digita a senha do Wi-Fi uma vez e acabou." },
      { title: "Ele aprende o prédio", description: "Durante alguns dias o dispositivo só escuta a vibração normal. Ele aprende o que acontece quando passa um caminhão e o que acontece num dia de vento. Só dá para reconhecer o anormal depois de conhecer o normal." },
      { title: "Avisa quando o tremor começa", description: "Ao detectar vibração séria, chega uma notificação no seu celular. Se dispositivos próximos viram o mesmo tremor, a notificação chega marcada como confirmada." },
      { title: "Registra o evento", description: "Os dados brutos de durante e depois do tremor ficam no dispositivo e vão para a nuvem. Um engenheiro consegue ler nesse registro como o prédio respondeu." },
      { title: "Mais dispositivos, melhor resultado", description: "Com vários dispositivos no mesmo prédio dá para ver como os andares se movem entre si. Com vários no mesmo bairro, cai a chance de alarme falso." },
    ],
  },
  features: {
    eyebrow: "O que faz",
    title: "Na verdade ele faz várias tarefas diferentes ao mesmo tempo.",
    description:
      "Avisar durante o terremoto é só uma delas. A parte valiosa está no antes e no depois: ele acompanha a saúde do prédio por meses e registra o que aconteceu enquanto o chão se mexia.",
    items: [
      { accent: "01", title: "Detecta tremores", description: "Um sensor MEMS sensível lê a vibração do solo 250 vezes por segundo. Sensível o bastante para separar um caminhão passando de um tremor de verdade." },
      { accent: "02", title: "Avisa seu celular", description: "Ao detectar um tremor, sai um push. A mensagem diz o que fazer: abaixe, cubra, segure." },
      { accent: "03", title: "Acompanha a saúde do prédio", description: "Todo prédio tem uma frequência natural. O dispositivo acompanha isso e o amortecimento ao longo de meses. Um desvio inesperado ali pode ser o primeiro sinal de problema estrutural." },
      { accent: "04", title: "Gera relatório após o terremoto", description: "Aceleração de pico, duração e a resposta do prédio acabam num único relatório. O engenheiro já chega com um ponto de partida." },
      { accent: "05", title: "Lê temperatura e umidade", description: "Um prédio não se comporta igual no inverno e no verão. Sem dado ambiental você não separa essa variação sazonal de um dano real." },
      { accent: "06", title: "Mais forte em conjunto", description: "Cada dispositivo do bairro alimenta o sinal comum. Quanto mais dispositivos, mais rápida a confirmação e mais raros os alarmes falsos." },
    ],
  },
  demo: {
    eyebrow: "Fluxo de dados",
    title: "A medição começa no dispositivo e termina no seu celular.",
    description:
      "O dispositivo mede, criptografa e envia. O app transforma isso em algo legível: o dispositivo está vivo, qual foi o último evento, para onde seu prédio está indo.",
    previewLabel: "Registro do prédio",
    networkLabel: "Rede do bairro",
    sensorLabel: "Dispositivo",
    sensorValue: "Ativo",
    eventLabel: "Último evento",
    eventValue: "Registrado, revisável",
    bullets: [
      "O sensor MEMS fixo na parede tem piso de ruído de 22 µg. Seu celular fica na casa dos 2.000 µg. A diferença é de cerca de cem vezes.",
      "Você consegue ver os dados de vibração do seu prédio sem entregar informação pessoal.",
      "O dispositivo não decide no lugar do engenheiro. Ele dá ao engenheiro dados melhores.",
    ],
    cta: "Ver a tecnologia",
    ctaHref: "/technology",
  },
  proof: {
    eyebrow: "Caminho piloto",
    title: "Queremos testar primeiro em alguns prédios de verdade.",
    description:
      "Antes de escalar o produto, queremos vê-lo em campo. O retorno dos primeiros pilotos vai definir como fica o dispositivo final. Por enquanto conversamos com três grupos.",
    cards: [
      { title: "Apartamentos", description: "Um dispositivo em algumas unidades e outro na área comum. Combinamos com a administração e instalamos de graça por seis meses.", highlight: "Piloto gratuito" },
      { title: "Campi e fábricas", description: "Locais com mais de um prédio. Um dispositivo por prédio, todos visíveis num único painel.", highlight: "Corporativo" },
      { title: "Universidades", description: "Compartilhamos dados com departamentos de engenharia sísmica. Pesquisadores acessam dados anônimos e nós recebemos retorno acadêmico.", highlight: "Colaboração acadêmica" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Perguntas frequentes",
    description: "Se sua pergunta está aqui, a resposta também. Se não estiver, escreva para info@sismosmart.com que respondemos. A lista completa fica na página de FAQ.",
    items: [
      { title: "O dispositivo avisa antes de um terremoto?", description: "Falamos de segundos, não de minutos. Se o terremoto vem de longe, o dispositivo pode captar a onda P, que corre mais rápido, e avisar antes da onda S destrutiva chegar. Se o epicentro é perto, essa margem some. Não vendemos isso como sistema de alerta precoce, porque não funciona em todo terremoto." },
      { title: "Qual a diferença para os alertas do Google?", description: "O Google usa o acelerômetro dos celulares. É grátis, já está em todo mundo e funciona bem. Mas o que ele mede é a origem do terremoto, não o seu prédio. Nós fazemos o contrário: como seu prédio vibra, como isso muda com a estação e em que estado ele fica depois do terremoto. Um celular não responde a essas perguntas." },
      { title: "Um dispositivo diz se meu prédio é seguro?", description: "Não diz. Quem declara um prédio seguro ou inseguro é um engenheiro, não um aparelho. O que o dispositivo faz é deixar para esse engenheiro algo concreto com que trabalhar." },
      { title: "A instalação é difícil?", description: "Você liga o cabo USB-C na tomada, cola o dispositivo na parede com o adesivo de trás e pareia pelo app. Sem furadeira e sem técnico. Cinco minutos." },
      { title: "E se faltar energia ou internet?", description: "Se a internet cair, o dispositivo continua medindo, salva o evento na própria memória e envia quando a conexão volta. Se faltar energia, o supercapacitor de dentro dá de 30 a 60 segundos de energia ponte, o suficiente para mandar o último evento para a nuvem. Se a falta durar mais, ele desliga." },
      { title: "Quando entra à venda?", description: "Os pilotos começam no meio de 2026 e miramos a venda ampla para o fim de 2026. Certificação e fabricação podem empurrar a data. Se assinar a newsletter, você fica sabendo primeiro." },
    ],
  },
  newsletter: {
    eyebrow: "Fale conosco",
    title: "Vamos conversar antes do lançamento.",
    description:
      "Se você é um síndico que quer um piloto, um investidor ou alguém de uma organização parceira, conte rapidamente o que procura. A gente direciona para a pessoa certa.",
    inputLabel: "Email",
    placeholder: "voce@empresa.com",
    button: "Enviar",
    consent: "Aceito receber emails sobre lançamento, pilotos e notícias para investidores da SismoSmart.",
    note: "Usamos seu email só para isso.",
    loading: "Enviando...",
    success: "Sua mensagem chegou. Retornamos em breve.",
    error: "Algo deu errado. Tente novamente.",
    missingEndpoint: "O formulário ainda não está conectado. Você pode escrever para info@sismosmart.com.",
    rateLimited:
      "Tentativas demais. Tente de novo daqui a alguns minutos.",
  },
  footer: {
    legal: "© 2026 SismoSmart. Todos os direitos reservados.",
  },
};
