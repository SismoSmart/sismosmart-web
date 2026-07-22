import type { SiteCopy } from "@/lib/site";

export const enCopy: SiteCopy = {
  accessibility: {
    skipToContent: "Skip to content",
  },
  meta: {
    title: "Seismic monitoring for your building",
    description:
      "SismoSmart is a small seismic monitoring device you mount on the wall. It measures how your building moves and notifies your phone when the shaking is serious. An engineer can read the recording afterwards.",
  },
  navigation: {
    eyebrow: "Seismic monitoring for buildings",
    primaryCta: "Pilot application",
    links: [
      { label: "Technology", href: "/technology" },
      { label: "Product", href: "/product" },
      { label: "Pilot", href: "/pilot-program" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  hero: {
    badge: "Early-stage hardware startup",
    title: "How did your building move in the earthquake? We built a device that measures it.",
    description:
      "SismoSmart plugs into a socket and mounts on the wall. It measures your building's motion continuously and notifies your phone when the shaking is serious. Its real job is the recording it keeps: when an engineer arrives, they can read how the building behaved at the time.",
    primaryCta: "Apply for pilot",
    secondaryCta: "Investor brief",
    tertiaryCta: "See the technology",
    primaryHref: "/pilot-program",
    secondaryHref: "/investors",
    tertiaryHref: "/technology",
    stats: [
      { label: "Mounting", value: "Wall-fixed" },
      { label: "Detection", value: "On-device" },
      { label: "Sampling", value: "250 Hz, 3-axis" },
      { label: "Power bridge", value: "30-60 s supercap" },
    ],
    deviceEyebrow: "The SismoSmart device",
    deviceTitle: "100 × 100 mm. Mounts on the wall, runs off a socket.",
    deviceDescription:
      "You stick it to the wall and plug it in. You pair it from the app and give it your Wi-Fi. Everything after that happens in the background: it starts measuring the building's vibration and stays out of your way on an ordinary day.",
    deviceSpecs: [
      "Three-axis motion sensing",
      "Local recording during events",
      "Encrypted Wi-Fi data",
    ],
    meterTopLabel: "Detection",
    meterTopValue: "On-device",
    meterBottomLabel: "Data",
    meterBottomValue: "Encrypted",
    imageAlt: "SismoSmart seismic monitoring device with status LED",
  },
  trust: {
    eyebrow: "Where we stand",
    title: "There are things this device cannot do.",
    description:
      "SismoSmart is still in its pilot phase. What it does is record what happens inside your building and turn that into data you can look at afterwards. We are not competing with national alerting systems or with the structural inspection that follows an earthquake. Both of those stay where they are. We fill the gap in between.",
    items: [
      { label: "Stage", value: "Pilot" },
      { label: "Main job", value: "Motion recording" },
      { label: "Structural decision", value: "Stays with the engineer" },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "Setup takes a few minutes. Everything after that is in the background.",
    description:
      "Once the device is up, there is nothing left for you to do. It spends the first few days learning your building's normal vibration profile, and after that it can pick out what isn't normal.",
    steps: [
      {
        title: "Mount it on a wall",
        description:
          "Pick a stable indoor wall. The adhesive strip comes pre-applied, and there are screw holes if you would rather fix it properly.",
      },
      {
        title: "Pair from the app",
        description:
          "The SismoSmart app finds the device over Bluetooth. You enter your Wi-Fi password once, and that's it.",
      },
      {
        title: "It learns the building",
        description:
          "For a few days the device just listens to your building's normal vibration. It learns what a passing truck does, what a windy day does. It can only spot the abnormal once it knows the normal.",
      },
      {
        title: "It notifies you when shaking starts",
        description:
          "When it detects serious vibration, a notification lands on your phone. If nearby devices saw the same shaking, the notification arrives marked as confirmed.",
      },
      {
        title: "It records the event",
        description:
          "The raw data from during and after the shaking is kept on the device and sent to the cloud. An engineer can read how the building responded from that recording.",
      },
      {
        title: "More devices, better results",
        description:
          "With several devices in one building you can see how the floors move relative to each other. With several in one neighborhood, the odds of a false alarm drop.",
      },
    ],
  },
  features: {
    eyebrow: "What it does",
    title: "It quietly does several separate jobs at once.",
    description:
      "Notifying you during an earthquake is only one of them. The valuable part is what happens before and after: it tracks the building's health for months, and it records what happened while the ground was moving.",
    items: [
      {
        accent: "01",
        title: "Detects tremors",
        description:
          "A sensitive MEMS sensor reads ground vibration 250 times per second. Sensitive enough to tell a passing truck apart from real shaking.",
      },
      {
        accent: "02",
        title: "Notifies your phone",
        description:
          "When it detects shaking, a push notification goes out. It says what to do: drop, cover, hold on.",
      },
      {
        accent: "03",
        title: "Tracks your building's health",
        description:
          "Every building has a natural frequency. The device tracks that and the damping ratio over months. An unexpected shift there can be an early sign of structural trouble.",
      },
      {
        accent: "04",
        title: "Reports after an earthquake",
        description:
          "Peak acceleration, duration and how your building responded end up in a single report. The engineer has a starting point before they even arrive.",
      },
      {
        accent: "05",
        title: "Reads temperature and humidity too",
        description:
          "A building doesn't behave the same in winter as in summer. Without environmental data you can't tell that seasonal drift apart from real damage.",
      },
      {
        accent: "06",
        title: "Stronger together",
        description:
          "Every device in your neighborhood feeds the shared signal. As the count goes up, confirmation gets faster and false alarms get rarer.",
      },
    ],
  },
  demo: {
    eyebrow: "Data flow",
    title: "Measurement starts at the device and ends on your phone.",
    description:
      "The device measures, encrypts and sends. The app turns that into something readable: is the device alive, what was the last event, which way is your building trending.",
    previewLabel: "Building record",
    networkLabel: "Neighborhood mesh",
    sensorLabel: "Device",
    sensorValue: "Active",
    eventLabel: "Last event",
    eventValue: "Recorded, reviewable",
    bullets: [
      "The wall-mounted MEMS sensor has a noise floor of 22 µg. Your phone sits around 2,000 µg. The gap is roughly a hundredfold.",
      "You can see your building's vibration data without handing over personal information.",
      "The device doesn't decide in the engineer's place. It gives the engineer better data.",
    ],
    cta: "See the technology",
    ctaHref: "/technology",
  },
  proof: {
    eyebrow: "Pilot path",
    title: "We want to try this in a handful of real buildings first.",
    description:
      "Before we scale the product we want to see it in the field. Feedback from the first pilots will decide what the finished device looks like. For now we're talking to three groups.",
    cards: [
      {
        title: "Apartments",
        description:
          "A device in a few flats and one in the common area. We agree it with the building management and install it free for six months.",
        highlight: "Free pilot",
      },
      {
        title: "Campuses and factories",
        description:
          "Facilities with more than one building. One device per building, all of them visible from a single dashboard.",
        highlight: "Enterprise",
      },
      {
        title: "University partnerships",
        description:
          "We share data with earthquake engineering departments. Researchers get anonymized access and we get academic feedback.",
        highlight: "Research collaboration",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    description:
      "If your question is here, so is the answer. If it isn't, write to info@sismosmart.com and we'll answer it. The full list lives on the FAQ page.",
    items: [
      {
        title: "Will this device warn me before an earthquake?",
        description:
          "We're talking seconds, not minutes. If the earthquake comes from a distance, the device can catch the fast-moving P wave and send a notification before the destructive S wave arrives. If the epicenter is close, that window shrinks to almost nothing. We don't market this as an early warning system, because it won't work for every earthquake.",
      },
      {
        title: "How is this different from Google's earthquake alerts?",
        description:
          "Google uses the accelerometer in people's phones. It's free, it's already on every handset, and it works well. But what it measures is the source of the earthquake, not your building. We do the opposite: how your building vibrates, how that changes with the season, what state it's in after an earthquake. A phone can't answer those questions.",
      },
      {
        title: "Can a single device tell me my building is safe?",
        description:
          "It can't. The person who gets to call a building safe or unsafe is an engineer, not a device. What the device does is leave that engineer something solid to work from.",
      },
      {
        title: "Is installation difficult?",
        description:
          "You plug the USB-C cable into a socket, stick the device to the wall with the adhesive on the back, and pair it from the app. No drill and no technician. It takes five minutes.",
      },
      {
        title: "What happens during a power or internet outage?",
        description:
          "If the internet goes, the device keeps measuring, saves the event to its own memory, and uploads it when the connection returns. If the power goes, the supercapacitor inside gives it 30 to 60 seconds of bridge power, which is enough to push the last event to the cloud. A longer outage shuts it down.",
      },
      {
        title: "When does it go on sale?",
        description:
          "Pilots start in summer 2026 and we're aiming for broad availability by the end of 2026. Certification and manufacturing could push that back. Sign up for the newsletter and you'll hear the firm date first.",
      },
    ],
  },
  newsletter: {
    eyebrow: "Get in touch",
    title: "Let's talk before launch.",
    description:
      "If you're a building manager who wants a pilot, an investor, or someone from a partner organization, tell us briefly what you're after. We'll point you to the right person.",
    inputLabel: "Email",
    placeholder: "you@company.com",
    button: "Send",
    consent:
      "I agree to receive emails about SismoSmart launch, pilot, and investor news.",
    note: "We use your email only for this purpose.",
    loading: "Sending...",
    success: "Your message reached us. We'll get back to you shortly.",
    error: "Something went wrong. Please try again.",
    missingEndpoint:
      "Form isn't connected yet. You can email info@sismosmart.com directly.",
    rateLimited:
      "Too many attempts. Please try again in a few minutes.",
  },
  footer: {
    legal: "© 2026 SismoSmart. All rights reserved.",
  },
};
