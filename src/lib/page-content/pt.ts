import type { BaseRoutePagesCopy } from "@/lib/page-copy";

export const ptPages: BaseRoutePagesCopy = {
  product: {
    meta: {
      title: "O dispositivo SismoSmart",
      description:
        "Um pequeno dispositivo de monitoramento sísmico para casa ou escritório. Detecta tremores e registra como o prédio se comporta depois de um terremoto.",
    },
    eyebrow: "Produto",
    title: "O dispositivo",
    description:
      "Um dispositivo de parede, alimentado por USB-C, 100 x 100 x 27 mm. Feito para medir movimento de forma fixa e cuidadosa em casas e prédios pequenos.",
    deviceDescription:
      "Na caixa vêm o dispositivo, um cabo USB-C e uma fita adesiva dupla-face para fixação. Você não precisa de nenhuma outra ferramenta para instalar.",
    meterTopLabel: "Sensor",
    meterTopValue: "MEMS preciso",
    meterBottomLabel: "Dados",
    meterBottomValue: "Criptografados, mínimos",
    imageAlt: "Dispositivo SismoSmart, vista frontal",
    specs: [
      { label: "Sensor", value: "MEMS de alta precisão" },
      { label: "Conexão", value: "Wi-Fi + Bluetooth" },
      { label: "Instalação", value: "Cinco minutos, pelo app" },
      { label: "Status", value: "LED RGB + app" },
    ],
    useCases: [
      {
        title: "Casas e apartamentos",
        description:
          "Um dispositivo por unidade, ou um piloto com vários dispositivos junto à administração do prédio.",
      },
      {
        title: "Campi e fábricas",
        description:
          "Organizações com vários prédios acompanham tudo em um único painel.",
      },
      {
        title: "Oficinas e escritórios",
        description:
          "Monitoramento acessível e rápido de instalar para pequenos negócios.",
      },
      {
        title: "Parcerias universitárias",
        description:
          "Grupos de pesquisa em terremotos podem acessar dados anônimos.",
      },
    ],
    comparisonTitle: "Como se compara",
    comparisonDescription:
      "Fica entre um sismógrafo profissional e um app de celular. Não substituímos nenhum dos dois: oferecemos um dispositivo real em escala doméstica.",
    comparisonRows: [
      {
        label: "Instalação",
        sismosmart: "Cinco minutos, você mesmo",
        traditional: "Exige engenheiro",
        mobile: "Nenhuma, só app",
      },
      {
        label: "Dispositivo fixo",
        sismosmart: "Sim, preso ao prédio",
        traditional: "Sim",
        mobile: "Não, o celular se move",
      },
      {
        label: "Leitura estrutural",
        sismosmart: "Sim, relatório simples",
        traditional: "Sim, relatório técnico",
        mobile: "Não",
      },
      {
        label: "Preço",
        sismosmart: "Escala doméstica",
        traditional: "Escala empresarial",
        mobile: "Grátis",
      },
    ],
    ctaLabel: "Candidatar-se ao piloto",
    ctaHref: "/pilot-program",
  },
  howItWorks: {
    meta: {
      title: "Como o SismoSmart funciona",
      description:
        "Você instala o dispositivo, pareia o celular e o prédio é reconhecido. Recebe aviso quando há tremor e um relatório depois.",
    },
    eyebrow: "Como funciona",
    title: "Dispositivo, cloud, app: juntos.",
    description:
      "Três partes. O dispositivo mede a vibração do seu prédio. A cloud recebe dados criptografados e compara com outros dispositivos. O app mostra só o que importa.",
    flow: [
      {
        title: "Instale o dispositivo",
        description:
          "Em uma parede interna, de preferência perto de um elemento estrutural.",
      },
      {
        title: "Pareie com o celular",
        description:
          "Encontre pelo Bluetooth no app. Compartilhe o Wi-Fi com segurança.",
      },
      {
        title: "O prédio é aprendido",
        description:
          "Nos primeiros dias, o dispositivo registra o perfil normal de vibração do prédio.",
      },
      {
        title: "Relatório quando algo acontece",
        description:
          "Você recebe um push quando há tremor. Depois, um relatório fica pronto no app.",
      },
    ],
    signals: [
      {
        title: "Detecção no dispositivo",
        description:
          "O dispositivo não espera pela cloud. Quando uma scossa real começa, age localmente. Depois confirma com a cloud.",
      },
      {
        title: "Relatório pós-terremoto",
        description:
          "Um resumo único: aceleração de pico, duração, mudança na frequência natural do seu prédio.",
      },
      {
        title: "Só os dados necessários",
        description:
          "Não monitoramos sua atividade. O dispositivo compartilha vibração, temperatura, umidade, pressão e status.",
      },
    ],
    network: [
      {
        title: "Rede de bairro",
        description:
          "Quando três ou mais dispositivos na mesma área disparam juntos, o evento é marcado como confirmado. Os falsos alarmes caem muito.",
      },
      {
        title: "Acompanhamento estrutural",
        description:
          "O perfil de vibração muda em semanas e meses. Uma mudança brusca pode indicar problema.",
      },
      {
        title: "Interface simples",
        description:
          "O dispositivo faz o trabalho complexo em segundo plano. Você vê o status: verde, amarelo, vermelho.",
      },
    ],
  },
  about: {
    meta: {
      title: "Sobre",
      description:
        "Quem constrói o SismoSmart e por quê. O time, o ponto de vista, para onde vamos.",
    },
    eyebrow: "Sobre",
    title: "Vivemos na Turquia. Queremos prédios íntegros.",
    description:
      "Nos reunimos depois dos terremotos de Kahramanmaraş em 2023 e de tremores recentes ao redor de Istambul. Queríamos saber como nossas casas e a cidade reagem a terremotos. Então criamos o dispositivo.",
    story: [
      "Depois de um grande terremoto na Turquia, inspeções de prédios levam semanas, às vezes meses. Nesse período, famílias não sabem se podem voltar para casa.",
      "Não vamos eliminar essa espera por completo. No fim, um engenheiro precisa visitar. Mas antes disso queremos uma camada de dados que diga: este prédio parece bem, ou este prédio é prioridade.",
      "Nosso time tem um consultor acadêmico em engenharia civil, dois pesquisadores MSc em engenharia civil e um fundador em embedded e software. Estamos todos na Turquia. Testamos o dispositivo nas nossas casas.",
    ],
    principles: [
      {
        title: "Informar sem assustar",
        description:
          "Nada de marketing do medo. O dispositivo cria preparo, não pânico.",
      },
      {
        title: "Ser claro sobre limites",
        description:
          "Vamos dizer abertamente o que não fazemos. Não somos um sistema oficial. Não substituímos o relatório de um engenheiro.",
      },
      {
        title: "Devolver os dados ao dono",
        description:
          "Os dados do seu prédio são seus. Agregados anônimos podem ajudar universidades ou governo. Dados pessoais não estão à venda.",
      },
    ],
    timeline: [
      {
        period: "Q1 2026",
        title: "Time e visão de produto",
        description:
          "Time central formado, decisões principais tomadas, arquitetura escrita.",
      },
      {
        period: "Q2 2026",
        title: "Protótipo e preparo do piloto",
        description:
          "Primeiro protótipo de hardware, base do app mobile, primeiras conversas com locais piloto.",
      },
      {
        period: "Q3 2026",
        title: "Primeiras instalações piloto",
        description:
          "Cinco a dez prédios, três meses de dados, feedback, produto final.",
      },
      {
        period: "Q4 2026 / Q1 2027",
        title: "Certificação e produção",
        description:
          "Certificação CE, primeiros 1.000 dispositivos, lançamento mais amplo.",
      },
    ],
    team: [
      {
        name: "Fundador",
        role: "Hardware, software, produto",
        bio: "Responsável por sistemas embedded, IoT, cloud e produto.",
      },
      {
        name: "Consultor acadêmico",
        role: "Engenharia de terremotos",
        bio: "PhD em engenharia civil. Validação científica dos algoritmos estruturais.",
      },
      {
        name: "Engenheiros civis",
        role: "Estrutura e locais piloto",
        bio: "Dois pesquisadores MSc em engenharia civil. Lideram algoritmos do prédio e validação em campo.",
      },
    ],
  },
  contact: {
    meta: {
      title: "Contato",
      description:
        "Quer falar com a SismoSmart? Aqui está o canal certo. Produto, piloto, imprensa ou investidores.",
    },
    eyebrow: "Contato",
    title: "Escreva. Vamos responder.",
    description:
      "Neste momento, o canal mais rápido é email. Um assunto claro chega à pessoa certa.",
    channels: [
      {
        title: "Geral",
        description: "Perguntas sobre o produto, candidatura ao piloto, interesse de compra",
        value: "info@sismosmart.com",
        href: "mailto:info@sismosmart.com",
      },
      {
        title: "Imprensa",
        description: "Entrevistas, press kit, parceria",
        value: "press@sismosmart.com",
        href: "mailto:press@sismosmart.com",
      },
      {
        title: "LinkedIn",
        description: "Atualizações profissionais e notícias da empresa",
        value: "linkedin.com/company/sismosmart",
        href: "https://www.linkedin.com/company/sismosmart",
      },
    ],
    form: {
      nameLabel: "Seu nome",
      emailLabel: "Email",
      subjectLabel: "Assunto",
      messageLabel: "Sua mensagem",
      buttonLabel: "Enviar",
      consentLabel:
        "Concordo que estas informações sejam processadas para que vocês possam ler e responder minha mensagem.",
      note: "Usamos estas informações apenas para responder sua mensagem.",
      loadingLabel: "Enviando...",
      successMessage: "Sua mensagem foi enviada. Responderemos assim que possível.",
      errorMessage: "Algo deu errado. Tente novamente em breve.",
      missingEndpointMessage:
        "O formulário ainda não está conectado. Escreva para info@sismosmart.com.",
      rateLimitedMessage:
        "Tentativas demais. Tente de novo daqui a alguns minutos.",
    },
  },
  privacy: {
    meta: {
      title: "Privacidade",
      description:
        "Quais dados coletamos, por que usamos, com quem compartilhamos. Explicado sem rodeio.",
    },
    eyebrow: "Privacidade",
    title: "Política de privacidade",
    description:
      "Não coletamos dados que não precisamos. Usamos o que coletamos só para o que dissemos. Não vendemos.",
    sections: [
      {
        title: "Dados que coletamos",
        description:
          "No site: email quando você assina, mensagens do formulário, escolhas de cookies. Do dispositivo depois do lançamento: vibração, temperatura, umidade, pressão, status do dispositivo, localização aproximada em nível de bairro.",
      },
      {
        title: "Para que usamos",
        description:
          "Responder mensagens, gerir candidaturas ao piloto, enviar anúncios, manter o dispositivo online, comparar eventos entre dispositivos, melhorar o produto.",
      },
      {
        title: "Com quem compartilhamos",
        description:
          "Envios de formulário podem passar por um provedor de formulários. Dados do dispositivo são processados no ambiente de cloud escolhido. Não vendemos dados pessoais a terceiros.",
      },
      {
        title: "Seus direitos",
        description:
          "Você pode acessar, corrigir, excluir ou exportar seus dados. Para KVKK e GDPR, escreva para info@sismosmart.com.",
      },
    ],
  },
  terms: {
    meta: {
      title: "Termos de uso",
      description:
        "Termos básicos para usar o site e as informações pré-lançamento.",
    },
    eyebrow: "Termos",
    title: "Termos de uso",
    description: "O site está em pré-lançamento. Os termos abaixo valem para esta fase.",
    sections: [
      {
        title: "Informativo",
        description:
          "Este site informa sobre a SismoSmart e recebe candidaturas ao piloto. Não é um serviço sismológico oficial nem canal de alerta de terremoto.",
      },
      {
        title: "Não é garantia",
        description:
          "O dispositivo é feito para apoiar preparo contra terremotos após o lançamento. Não substitui sistemas oficiais, instruções de emergência ou relatório de engenheiro estrutural.",
      },
      {
        title: "Propriedade intelectual",
        description:
          "Nome, logo, design do produto e conteúdo do site pertencem à SismoSmart. Não podem ser reproduzidos sem permissão.",
      },
      {
        title: "Contato",
        description: "Perguntas para info@sismosmart.com.",
      },
    ],
  },
  press: {
    meta: {
      title: "Press kit",
      description: "Informações, imagens e contatos para imprensa.",
    },
    eyebrow: "Imprensa",
    title: "Press kit",
    description:
      "Uma página para mídia, organizações parceiras e pedidos de entrevista.",
    sections: [
      {
        title: "Descrição curta",
        description:
          "A SismoSmart cria um dispositivo de monitoramento sísmico para casas e pequenos prédios. O dispositivo mede o prédio continuamente, avisa o telefone durante um terremoto e registra o estado depois do evento. Pilotos em 2026, lançamento em 2027.",
      },
      {
        title: "Contato de imprensa",
        description:
          "Para entrevistas, imagens de imprensa ou demos: press@sismosmart.com.",
      },
    ],
    links: [
      {
        title: "Logo",
        description: "Logo vetorial SVG",
        href: "/logo-symbol.svg",
      },
      {
        title: "Imagem do produto",
        description: "Render do dispositivo em alta resolução",
        href: "/images/device/sismosmart-device-front.png",
      },
      {
        title: "Imagem social",
        description: "Cartão de compartilhamento 1200x630",
        href: "/images/og/sismosmart-og.png",
      },
    ],
  },
};
