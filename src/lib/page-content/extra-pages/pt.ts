import { makeExtraPages } from "@/lib/page-content/extra-pages/shared";

export const ptExtraPages = makeExtraPages({
  technology: {
    eyebrow: "Tecnologia",
    metaTitle: "Tecnologia: como o SismoSmart mede",
    metaDescription:
      "O que tem dentro do dispositivo, como ele separa um tremor real do ruído e como a medição vira um relatório legível.",
    title: "O que tem dentro do dispositivo e como o dado chega até você",
    description:
      "O SismoSmart tem um único trabalho: registrar como um prédio se move. Tanto a notificação rápida durante o tremor quanto o relatório que vem depois saem desse mesmo registro. Esta página explica como ele é feito.",
    sections: [
      ["Acelerômetro MEMS", "Dentro há um sensor MEMS classe ADXL355, cerca de 100 vezes mais sensível que o acelerômetro de um celular. Ele amostra três eixos 250 vezes por segundo e chega a um piso de ruído perto de 22 micro-g. Modesto ao lado de uma estação sísmica profissional, mas de qualidade de laboratório para eletrônica de consumo."],
      ["Detecção STA/LTA", "O dispositivo compara a média do último meio segundo com a média dos últimos trinta segundos. Quando essa razão pula, há um evento. O método se chama STA/LTA e é padrão em sismologia. A calibração piloto busca separar o ruído comum do prédio de uma vibração, mas falsos positivos ou eventos não detectados continuam possíveis até a validação de campo."],
      ["Buffer local de eventos", "Cruzado o limiar, o dispositivo escreve na memória uma janela de 40 segundos: quatro segundos antes do evento e trinta e seis depois. Se a internet estiver fora nesse momento, ele guarda a gravação e envia quando a conexão volta. Um app de celular não consegue fazer isso."],
      ["Confirmação na nuvem", "Um dispositivo disparando sozinho não é prova forte. Quando três ou mais dispositivos da mesma área disparam em 60 segundos, o evento é marcado como confirmado. É aí que a taxa de alarme falso cai de verdade. Fontes públicas como AFAD e USGS dão uma checagem cruzada a mais."],
      ["Acompanhamento de saúde estrutural", "Todo prédio tem uma frequência natural, ou seja, o ritmo em que ele tende a oscilar sozinho. O dano estrutural puxa esse número para baixo. O dispositivo mede toda semana, aprende o padrão sazonal e sinaliza uma queda inesperada. O nome técnico do método é análise modal."],
      ["Relatório para o engenheiro", "Depois de um evento, o relatório traz a aceleração máxima do solo (PGA), a velocidade máxima (PGV), uma estimativa de intensidade Modified Mercalli e a porcentagem de deslocamento na frequência natural do seu prédio. São métricas padrão da engenharia sísmica. Não estamos inventando escala nova."],
      ["Conectividade", "V1 roda em Wi-Fi de 2,4 GHz. A versão corporativa (V2) vai somar conexão celular LTE-M e LoRa mesh, para que síndicos não precisem colocar o dispositivo no Wi-Fi do escritório."],
      ["Energia", "USB-C padrão, 5V/2A. Um supercapacitor de 1 farad dá de 30 a 60 segundos de energia ponte durante uma queda, o bastante para mandar o último evento para a nuvem. Não há bateria para trocar nem manutenção periódica."],
      ["Certificação", "Antes de o V1 sair: CE RED (diretiva europeia de rádio), aprovação de frequência BTK na Turquia, conformidade RoHS e WEEE. Todos os fluxos de dados ficam documentados sob a KVKK. A aprovação FCC para o mercado americano é um passo posterior."],
    ],
  },
  pilotProgram: {
    eyebrow: "Programa piloto",
    metaTitle: "Inscrição no programa piloto",
    metaDescription:
      "Piloto gratuito de seis meses para apartamentos, campi, fábricas ou prédios de pesquisa. Nós damos os dispositivos e o suporte, e pedimos feedback honesto em troca.",
    title: "Queremos ver o dispositivo primeiro no seu prédio.",
    description:
      "O produto ainda não está em venda ampla. O que buscamos nesta fase são poucos locais sérios e gente disposta a dizer o que não funciona. Se você se encaixa em um dos quatro grupos abaixo, o formulário no fim é a porta de entrada.",
    sections: [
      ["Apartamentos", "Começamos com um dispositivo em uma unidade. Se a administração entrar junto, acrescentamos dispositivos em outros andares. O suporte de instalação é gratuito e ajudamos na coordenação com o síndico."],
      ["Campi e fábricas", "Vários prédios, um único painel central. Cada prédio guarda o próprio registro. Antes de instalar, revisamos a topologia de rede e os requisitos de segurança com o seu time de TI."],
      ["Pilotos municipais", "Implantações em escala de bairro que mostram em qual região o mesmo terremoto foi sentido com mais força. Dados pessoais ficam totalmente fora desse fluxo. Só o agregado por prédio ou por local é compartilhado."],
      ["Parceiros de pesquisa", "Departamentos universitários de engenharia sísmica. Abrimos os dados brutos para análise acadêmica e, em troca, recebemos feedback e a chance de uma publicação conjunta. Exige acordo de confidencialidade e de compartilhamento de dados."],
      ["O que oferecemos", "De três a dez dispositivos grátis, e não pedimos de volta quando o piloto acaba. Seis meses sem custo. Acesso direto aos seus próprios dados. Suporte remoto de instalação por vídeo e telefone. Ver antes as mudanças do produto enquanto o piloto corre."],
      ["O que pedimos em troca", "Que você coordene a instalação com a administração ou a equipe do prédio. Fazemos uma chamada de feedback de uns quinze minutos por mês. Se acontecer um evento, pedimos uma nota curta. No fim gostaríamos de publicar um pequeno estudo de caso, e de bom grado deixamos seu nome de fora."],
      ["Da inscrição à instalação", "Você preenche o formulário. O comitê piloto avalia em cinco dias úteis. Uma chamada curta cobre o prédio e se ele se encaixa. Wi-Fi e acessos são acertados, e um acordo simples de quatro páginas é assinado. Os dispositivos são enviados. Acompanhamos de perto na primeira semana e seguimos em contato regular depois."],
    ],
  },
  investors: {
    eyebrow: "Investidores",
    metaTitle: "Investidores: resumo da rodada inicial",
    metaDescription:
      "Problema, mercado, equipe, roteiro do produto e detalhes da rodada inicial. Um resumo curto para preparar uma conversa.",
    title: "Existe uma janela depois do terremoto que ninguém mede.",
    description:
      "Depois de um grande terremoto na Turquia, a inspeção estrutural leva semanas. Nessas semanas as famílias adivinham, os negócios param e os seguros travam. A SismoSmart é uma startup de hardware tentando fechar essa janela com os dados do próprio prédio.",
    sections: [
      ["Problema", "Depois dos terremotos de Kahramanmaraş em 2023, a avaliação de prédios em onze províncias levou meses. Os seguros travaram, os custos de moradia temporária dispararam e os moradores não sabiam quando poderiam voltar. O sistema inteiro depende de visitas de engenheiro, e é exatamente esse passo que entope quando o evento é grande."],
      ["Por que agora", "Acelerômetros MEMS de qualidade de laboratório custam um quinto do que custavam há dez anos. Microcontroladores de rádio duplo que trazem Wi-Fi e BLE juntos (ESP32-S3) chegaram a preço de consumo. O interesse público e de investidores por tecnologia de desastres na Turquia nunca esteve tão alto quanto desde 2023. Há três anos nenhuma dessas três condições existia."],
      ["Mercado", "A Turquia tem cerca de vinte milhões de domicílios e cerca de 70% do país fica em zona de risco sísmico. Nosso primeiro alvo são proprietários conscientes do risco em Istambul, Esmirna e Ancara. A segunda onda são síndicos, seguradoras e prefeituras. A terceira é o exterior: Chile, Indonésia, Japão e México."],
      ["Produto", "O V1 é um dispositivo de consumo de 79 dólares com Wi-Fi. O V1.5 acrescenta microSD e giroscópio. O V2 é a versão corporativa, com conexão celular e LoRa. A receita vem de duas linhas: venda do dispositivo e uma assinatura de 5 dólares por mês. Em escala, miramos uma relação LTV/CAC em torno de treze vezes."],
      ["Equipe", "Um consultor acadêmico com doutorado em engenharia sísmica, dois engenheiros civis com mestrado trabalhando nos algoritmos de monitoramento de saúde estrutural e no campo dos pilotos, e um fundador cuidando do software embarcado e da nuvem. Estamos todos na Turquia. As conversas de parceria acadêmica estão em andamento."],
      ["Concorrência", "Os players domésticos (EDIS, Multitek) ficam em preço B2B e a experiência mobile deles é fraca. Os alertas gratuitos do Google no Android ocupam o espaço da notificação, mas não tocam na saúde do prédio. A Grillo começou no consumo e migrou para o setor público; a lição que tiramos é clara: hardware de consumo sozinho não se sustenta. Por isso acoplamos o dispositivo a uma assinatura desde o primeiro dia."],
      ["Roteiro", "Q2 2026: protótipo funcionando com STA/LTA, MQTT e demo mobile. Q3 2026: cinco a dez instalações piloto e os primeiros dados reais de campo. Q4 2026: fechamento da rodada e constituição da empresa. Q1 2027: certificação CE e primeira produção de 1.000 unidades. Q2 2027: lançamento e revisão da placa V1.5."],
      ["A rodada", "Buscamos o equivalente a 250 mil dólares, o que nos dá dezoito meses de fôlego de caixa. Alocação: 36% produção, 32% equipe, 12% marketing, 8% certificação, 6% nuvem, 6% jurídico e reserva. Em paralelo temos uma inscrição no TÜBİTAK BiGG (1,35 milhão de TL), programas do KOSGEB e créditos de nuvem da AWS Activate, Google for Startups e Microsoft for Startups."],
      ["O que buscamos", "Investidores anjo e fundos de estágio inicial que já tenham visto uma startup de hardware. Parceiros com acesso à regulação, à manufatura e às redes de seguro na Turquia valem mais para nós do que dinheiro rápido. A documentação técnica detalhada e o modelo financeiro compartilhamos sob acordo de confidencialidade."],
    ],
  },
  faq: {
    eyebrow: "FAQ",
    metaTitle: "Perguntas frequentes",
    metaDescription:
      "Respostas diretas sobre alerta de terremoto, segurança do prédio, dados, privacidade, instalação e prazos de lançamento.",
    title: "Perguntas frequentes",
    description:
      "Produtos de terremoto prometem demais com facilidade. Nós tentamos manter os limites do dispositivo à vista. Se a sua pergunta não estiver respondida aqui, escreva para info@sismosmart.com.",
    sections: [
      ["Esse dispositivo vai me avisar antes do terremoto?", "Estamos falando de segundos, não de minutos. Se o terremoto vem de longe, o dispositivo pode pegar a onda P, que corre mais rápido, e avisar antes de a onda S destrutiva chegar. Se o epicentro é perto, essa margem some. Não vendemos isso como sistema de alerta precoce, porque não funciona em todo terremoto."],
      ["Um dispositivo pode dizer se meu prédio é seguro?", "Não pode. Quem declara um prédio seguro ou inseguro é um engenheiro, não um aparelho. O que o dispositivo faz é deixar para esse engenheiro algo concreto com que trabalhar."],
      ["Quais dados vocês coletam?", "Leituras de vibração, temperatura, umidade, pressão e o estado de funcionamento do próprio dispositivo. Não associamos informação pessoal ao dispositivo e não vendemos seus dados para ninguém. Os detalhes estão na página de Privacidade."],
      ["Minha localização exata fica exposta?", "Sabemos a localização do seu dispositivo em nível de bairro, porque precisamos dela para cruzar um evento com os dispositivos próximos. Qualquer coisa mais precisa só é compartilhada com um acordo piloto explícito."],
      ["Pesquisadores podem acessar meus dados?", "Só depois de anonimizados e só com um acordo separado com você. Esse fluxo ainda não existe; está no roteiro."],
      ["Qual a diferença para os alertas do Google?", "O Google usa o acelerômetro dos celulares. É grátis, já está em todo mundo e funciona bem. Mas o que ele mede é a origem do terremoto, não o seu prédio. Nós fazemos o contrário: como seu prédio vibra, como isso muda com a estação e em que estado ele fica depois do terremoto. Um celular não responde a essas perguntas."],
      ["O que acontece quando cai a internet?", "O dispositivo continua medindo e grava o evento na própria memória. Ele não consegue mandar notificação, porque isso exige conexão. Quando a internet volta, ele envia o que estava esperando."],
      ["E se cair a luz?", "Há um pequeno supercapacitor dentro. Ele dá de 30 a 60 segundos de energia ponte, o suficiente para enviar o último evento para a nuvem. Se a queda durar mais, o dispositivo desliga."],
      ["Instalar é difícil?", "Você liga o cabo USB-C na tomada, cola o dispositivo na parede com o adesivo de trás e pareia pelo app. Sem furadeira e sem técnico. Cinco minutos."],
      ["Quantos um prédio deveria ter?", "Um já resolve. Mas com dois ou três em andares diferentes dá para ver como os andares se movem entre si, e isso vale muito mais para o acompanhamento da saúde estrutural. Em pilotos de apartamento miramos pelo menos três por prédio."],
      ["O que significam PGA, PGV e MMI?", "PGA é a aceleração máxima que o solo atinge durante um terremoto, em m/s². PGV é a velocidade máxima, em cm/s. MMI é a escala de intensidade Modified Mercalli, que descreve como o tremor foi sentido, de I a XII. O dispositivo reporta os três depois de um evento."],
      ["O que a frequência natural diz?", "Todo prédio tem uma frequência em que tende a oscilar. Para um prédio de concreto armado de cinco andares, o valor típico fica entre 2 e 4 Hz. O dano estrutural arrasta essa frequência para baixo. Como acompanhamos com regularidade, conseguimos captar um sinal enquanto o dano ainda é inicial."],
      ["Para qual lado o dispositivo deve apontar?", "Há uma seta para cima nas costas; aponte para o teto. Tente alinhar os eixos X e Y do dispositivo com as direções horizontais do prédio. Montado 90 graus torto, os dados ainda servem, embora carreguem um pouco menos de informação."],
      ["O dispositivo grava som?", "Não. Não tem microfone, só um acelerômetro que mede a vibração do solo. Gravar conversa ou som ambiente exigiria um sensor completamente diferente."],
      ["Meus dados saem da Turquia?", "A residência dos dados do piloto ainda não é definitiva. Antes da coleta, cada acordo indicará locais de tratamento, transferências, retenção e a base jurídica aplicável."],
      ["Quando entra à venda?", "Os pilotos começam no meio de 2026. Miramos a venda ampla para o fim de 2026 ou começo de 2027. Certificação e fabricação podem empurrar a data. Assine a newsletter e você saberá a data definitiva primeiro."],
    ],
  },
  security: {
    eyebrow: "Segurança",
    metaTitle: "Segurança",
    metaDescription:
      "Como lidamos com a segurança do site, o consentimento, os dados do dispositivo, o transporte criptografado e a privacidade durante a fase piloto.",
    title: "O dado que você nunca coleta é o dado que não vaza.",
    description:
      "Essa é a nossa regra básica. No momento a única coisa no ar é o site, mas o lado do dispositivo estamos construindo com a mesma regra.",
    sections: [
      ["Pouco dado por padrão", "O dispositivo envia só o necessário: movimento, informação ambiental, estado de funcionamento e a hora do evento. Fora isso, não coletamos nada."],
      ["Consentimento antes da analítica", "A analítica web só carrega depois que você consente. Você pode desfazer essa escolha quando quiser pelo link no rodapé."],
      ["Transporte criptografado", "O site roda em HTTPS com cabeçalhos de segurança. O tráfego do dispositivo é desenhado para ser criptografado ponta a ponta."],
      ["Nenhum segredo chega ao navegador", "Chaves privadas e tokens de serviço nunca aparecem no código que vai para o navegador. Eles ficam nas configurações do servidor ou no GitHub Secrets."],
      ["Relato de vulnerabilidades", "Se encontrar um problema de segurança no site ou em materiais pré-lançamento, escreva para info@sismosmart.com. Somos gratos a quem divulga de forma responsável."],
      ["Plano de segurança do dispositivo", "Antes de o dispositivo sair, nos comprometemos com firmware assinado, flash criptografado, duas partições OTA com rollback automático e uma chave única por dispositivo gravada na fábrica. A documentação de segurança completa sai junto com o dispositivo."],
    ],
  },
});
