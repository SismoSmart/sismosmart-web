import type { BaseRoutePagesCopy } from "@/lib/page-copy";

export const enPages: BaseRoutePagesCopy = {
  product: {
    meta: {
      title: "The SismoSmart device",
      description:
        "A small seismic monitoring device for your home or office. Senses tremors, records how the building behaves after an earthquake.",
    },
    eyebrow: "Product",
    title: "The device",
    description:
      "A wall-mounted, USB-C powered device, 100 x 100 x 27 mm. Built for fixed, careful motion measurement at home and small-building scale.",
    deviceDescription:
      "The box holds the device, a USB-C cable and a double-sided mounting strip. You won't need any other tool to put it up.",
    meterTopLabel: "Sensor",
    meterTopValue: "Precision MEMS",
    meterBottomLabel: "Data",
    meterBottomValue: "Encrypted, minimal",
    imageAlt: "SismoSmart device, front view",
    specs: [
      { label: "Sensor", value: "High-precision MEMS" },
      { label: "Connectivity", value: "Wi-Fi + Bluetooth" },
      { label: "Installation", value: "Five minutes, via mobile app" },
      { label: "Status", value: "RGB LED + app" },
    ],
    useCases: [
      {
        title: "Homes and apartments",
        description: "One device per flat, or a multi-device pilot with building management.",
      },
      {
        title: "Campuses and factories",
        description: "Organizations with multiple buildings monitor each from a single dashboard.",
      },
      {
        title: "Workshops and offices",
        description: "Affordable, fast-install monitoring for small businesses.",
      },
      {
        title: "University partnerships",
        description: "Earthquake research groups can access anonymized data.",
      },
    ],
    comparisonTitle: "How it compares",
    comparisonDescription:
      "It sits somewhere between a professional seismograph and your phone. That gap has been empty until now: a fixed device you can afford to put in a home, but far more sensitive than a handset.",
    comparisonRows: [
      {
        label: "Setup",
        sismosmart: "Five minutes, DIY",
        traditional: "Requires an engineer",
        mobile: "None, app only",
      },
      {
        label: "Fixed device",
        sismosmart: "Yes, mounted to the building",
        traditional: "Yes",
        mobile: "No, the phone moves",
      },
      {
        label: "Structural health readout",
        sismosmart: "Yes, plain report",
        traditional: "Yes, expert report",
        mobile: "No",
      },
      {
        label: "Price",
        sismosmart: "~$79 per device",
        traditional: "$2,000-10,000+",
        mobile: "Free",
      },
    ],
    ctaLabel: "Apply for pilot",
    ctaHref: "/pilot-program",
  },
  howItWorks: {
    meta: {
      title: "How SismoSmart works",
      description:
        "Mount the device, pair your phone, the building gets recognized. You get a notification when shaking happens, a report after.",
    },
    eyebrow: "How it works",
    title: "The system has three parts.",
    description:
      "Three parts. The device measures your building's vibration. The cloud receives encrypted data and correlates with other devices. The app shows you only what matters.",
    flow: [
      { title: "Mount the device", description: "Indoor wall, ideally near a structural element." },
      { title: "Pair with your phone", description: "Find it over Bluetooth from the app. Share Wi-Fi credentials securely." },
      { title: "The building learns", description: "Over the first few days, the device records your building's normal vibration profile." },
      { title: "Report when events happen", description: "You get a push when shaking is detected. A detailed report is ready in the app afterwards." },
    ],
    signals: [
      { title: "Detection on the device", description: "The device doesn't wait for an answer from the cloud. The moment it detects meaningful vibration it makes its own call, and confirms afterwards. A slow connection, or none at all, still produces a notification." },
      { title: "Post-earthquake report", description: "You get a single summary: peak acceleration, duration, shift in your building's natural frequency." },
      { title: "Only the necessary data", description: "We don't monitor your activity. The device shares vibration, temperature, humidity, pressure, and its own status." },
    ],
    network: [
      { title: "Neighborhood mesh", description: "When three or more devices in the same area trigger together, the event is marked 'confirmed'. False-alarm risk is lower." },
      { title: "Structural health tracking", description: "Your building's vibration profile drifts slowly over weeks and months. A sudden change can be the early sign of a structural problem, and the device flags it." },
      { title: "Simple interface", description: "The device does complex work in the background. You see a simple status: green, yellow, red." },
    ],
  },
  about: {
    meta: {
      title: "About SismoSmart",
      description: "The team behind SismoSmart, our perspective after the 2023 earthquakes, and the roadmap from pilot to launch. Based in Türkiye, testing in our own homes.",
    },
    eyebrow: "About",
    title: "We live in Türkiye. We want our buildings to be sound.",
    description:
      "We came together after the 2023 Kahramanmaraş earthquakes and recent tremors around Istanbul. We wanted to know how our homes and our city respond to earthquakes. So we built the device.",
    story: [
      "After a major earthquake in Türkiye, building inspections take weeks, sometimes months. During that time, families don't know if they can return home.",
      "We can't remove that wait entirely; in the end an engineer has to walk into the building. But a layer of data can exist before they arrive, one that shows which buildings should be looked at first. That's what we're working on.",
      "Our team has a civil engineering academic advisor, two MSc civil engineering researchers, and a founder on embedded and software. We're all based in Türkiye. We test the device in our own homes.",
    ],
    principles: [
      { title: "Inform without scaring", description: "No disaster marketing. The device creates preparedness, not panic." },
      { title: "Be clear about limits", description: "We'll openly state what we don't do. Not an official warning system. Not a substitute for an engineer's report." },
      { title: "Return data to its owner", description: "Your building's data is yours. Anonymized aggregates may go to academia or government. Personal data isn't for sale." },
    ],
    timeline: [
      { period: "Q1 2026", title: "Team and product vision", description: "Core team assembled, key product decisions made, system architecture written." },
      { period: "Q2 2026", title: "Prototype and pilot prep", description: "First hardware prototype, mobile app scaffolding, first pilot site conversations." },
      { period: "Q3 2026", title: "First pilot installations", description: "Five to ten buildings, three months of data, feedback, final product." },
      { period: "Q4 2026 / Q1 2027", title: "Certification and manufacturing", description: "CE certification, first 1,000 devices, broad launch." },
    ],
    team: [
      { name: "Founder", role: "Hardware, software, product", bio: "Responsible for embedded systems, IoT, cloud, and the product." },
      { name: "Academic advisor", role: "Earthquake engineering", bio: "PhD in civil engineering. Scientific validation of structural health algorithms." },
      { name: "Civil engineers", role: "Structural health and pilot sites", bio: "Two MSc civil engineering researchers. Lead the building-side algorithms and pilot validation." },
    ],
  },
  contact: {
    meta: {
      title: "Contact SismoSmart",
      description: "Reach the SismoSmart team for product questions, pilot applications, press inquiries, or investor conversations. Email is the fastest channel.",
    },
    eyebrow: "Contact",
    title: "Write, we'll write back.",
    description: "The fastest channel right now is email. A clear subject line reaches the right person.",
    channels: [
      { title: "General", description: "Product questions, pilot applications, purchase interest", value: "info@sismosmart.com", href: "mailto:info@sismosmart.com" },
      { title: "Press", description: "Interviews, press kit, partnership", value: "press@sismosmart.com", href: "mailto:press@sismosmart.com" },
      { title: "LinkedIn", description: "Professional updates and company news", value: "linkedin.com/company/sismosmart", href: "https://www.linkedin.com/company/sismosmart" },
    ],
    form: {
      nameLabel: "Your name",
      emailLabel: "Email",
      subjectLabel: "Subject",
      messageLabel: "Your message",
      buttonLabel: "Send",
      consentLabel: "I agree to have this information processed so you can review and reply to my message.",
      note: "We only use this information to respond to your message.",
      loadingLabel: "Sending...",
      successMessage: "Your message has been sent. We'll respond as soon as possible.",
      errorMessage: "Something went wrong. Please try again shortly.",
      missingEndpointMessage: "The form isn't connected yet. Please email info@sismosmart.com.",
      rateLimitedMessage:
        "Too many attempts. Please try again in a few minutes.",
    },
  },
  privacy: {
    meta: { title: "Privacy", description: "What data we collect, why we use it, who we share it with. Plainly explained." },
    eyebrow: "Privacy",
    title: "Privacy policy",
    description: "We don't collect data we don't need. We use what we collect only for what we said. We don't sell it.",
    sections: [
      { title: "Data we collect", description: "On the website: your email (when you subscribe), what you write in the contact form, your cookie choices. From the device (after launch): vibration readings, temperature, humidity, pressure, device status, approximate location (neighborhood level)." },
      { title: "What we use it for", description: "Responding to your messages, handling pilot applications, sending launch announcements, keeping the device online, correlating events across devices, improving the product." },
      { title: "Who we share it with", description: "Form submissions may pass through a form provider. Device data is processed in the selected cloud environment. We don't sell personal data to third parties for advertising or otherwise." },
      { title: "Your rights", description: "You can access, correct, delete, or export your data. Under KVKK and GDPR, write to info@sismosmart.com." },
    ],
  },
  terms: {
    meta: { title: "Terms of use", description: "Basic terms for using the website and pre-launch information." },
    eyebrow: "Terms",
    title: "Terms of use",
    description: "The site is pre-launch. The terms below apply to this phase.",
    sections: [
      { title: "Informational", description: "This site informs about SismoSmart and accepts pilot applications. It is not an official seismic service or earthquake warning channel." },
      { title: "Not a guarantee", description: "The device is built to support earthquake preparedness after launch. It does not replace official warning systems, emergency instructions, or a structural engineer's report." },
      { title: "Intellectual property", description: "The SismoSmart name, logo, product design, and site content belong to SismoSmart. They may not be reproduced without permission." },
      { title: "Contact", description: "Questions to info@sismosmart.com." },
    ],
  },
  press: {
    meta: { title: "Press kit", description: "Press information, approved visuals, product context, and media contact details for SismoSmart." },
    eyebrow: "Press",
    title: "Press kit",
    description: "One-page resource for media, partner organizations, and interview requests.",
    sections: [
      { title: "Short description", description: "SismoSmart makes a seismic monitoring device for homes and small buildings. The device continuously measures the building, notifies the phone during an earthquake, and records the post-event state. Pilots in 2026, launch in 2027." },
      { title: "Press contact", description: "For interviews, press images, or demo requests: press@sismosmart.com." },
    ],
    links: [
      { title: "Logo", description: "SVG vector logo", href: "/logo-symbol.svg" },
      { title: "Product image", description: "High-resolution device render", href: "/images/device/sismosmart-device-front.png" },
      { title: "Social media image", description: "1200x630 share card", href: "/images/og/sismosmart-og.png" },
    ],
  },
};
