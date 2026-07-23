import { makeExtraPages } from "@/lib/page-content/extra-pages/shared";

export const enExtraPages = makeExtraPages({
  technology: {
    eyebrow: "Technology",
    metaTitle: "Technology: how SismoSmart measures",
    metaDescription:
      "What's inside the device, how it tells real shaking from noise, and how the data turns into a report you can read. Written for engineers and curious readers.",
    title: "What's inside the device, and how the data reaches you",
    description:
      "SismoSmart has one job: record how a building moves. Both the fast notification during the shaking and the report that follows come out of that same recording. This page explains how the recording is taken.",
    sections: [
      ["MEMS accelerometer", "Inside sits an ADXL355-class MEMS sensor, roughly 100 times more sensitive than the accelerometer in a phone. It samples three axes 250 times per second and reaches a noise floor around 22 micro-g. Modest next to a professional seismic station, but lab-grade for consumer hardware."],
      ["STA/LTA detection", "The device compares the average of the last half second against the average of the last thirty seconds. When that ratio jumps, there's an event. The method is called STA/LTA and it's a seismology standard. Pilot calibration is intended to separate common building noise from shaking, but false positives and missed events remain possible until field validation is complete."],
      ["Local event buffer", "Once the threshold is crossed, the device writes a 40-second window to memory: four seconds before the event and thirty-six after. If the internet happens to be down, it keeps the recording and sends it when the connection returns. A phone app can't do this."],
      ["Cloud confirmation", "One device triggering isn't strong evidence on its own. When three or more devices in the same area trigger within 60 seconds, the event gets marked as confirmed. This is where the false-alarm rate drops sharply. Public sources like AFAD and USGS provide an extra cross-check."],
      ["Structural health tracking", "Every building has a natural frequency, the rate at which it tends to sway on its own. Structural damage pulls that number down. The device measures it weekly, learns the seasonal pattern, and flags an unexpected drop. The technical name for this is modal analysis."],
      ["Engineer-facing report", "After an event, the report carries peak ground acceleration (PGA), peak ground velocity (PGV), a Modified Mercalli intensity estimate, and the percentage shift in your building's natural frequency. These are standard earthquake-engineering metrics. We aren't inventing a new scale."],
      ["Connectivity", "V1 runs on 2.4 GHz Wi-Fi. The enterprise version (V2) will add LTE-M cellular and LoRa mesh, so building managers won't have to bring the device onto the office Wi-Fi."],
      ["Power", "Standard USB-C, 5V/2A. A 1 farad supercapacitor inside gives 30 to 60 seconds of bridge power during an outage, which is enough to push the last event to the cloud. There's no battery to replace and no maintenance schedule."],
      ["Certification", "Before V1 ships: CE RED, Turkey's BTK frequency approval, RoHS and WEEE compliance. All data flows get documented under KVKK. FCC approval for the US market is a later step."],
    ],
  },
  pilotProgram: {
    eyebrow: "Pilot program",
    metaTitle: "Pilot program application",
    metaDescription:
      "A free six-month pilot for apartments, campuses, factories or research buildings. We supply the devices and the support; we ask for honest feedback in return.",
    title: "We want to see the device in your building first.",
    description:
      "The product isn't on broad sale yet. What we want at this stage is a small number of serious sites and people who'll tell us what doesn't work. If you fit one of the four groups below, the form at the bottom is the way in.",
    sections: [
      ["Apartments", "We start with one device in one flat. If the building management joins in, we add devices on other floors. Installation support is free and we help coordinate with the management."],
      ["Campuses and factories", "Several buildings, one central dashboard. Each building keeps its own recording. Before installing, we go through network topology and security requirements with your IT team."],
      ["Municipal pilots", "Neighborhood-scale rollouts that show where the same earthquake was felt more strongly. Personal data stays entirely out of this flow. Only aggregate per-building or per-location data is shared."],
      ["Research partners", "University earthquake engineering departments. We open the raw data to academic analysis, and in return we get feedback and the option of a co-authored paper. It requires a confidentiality and data-sharing agreement."],
      ["What we offer", "Three to ten devices, free, and we don't ask for them back when the pilot ends. Six months at no cost. Direct access to your own data. Remote installation help over video and phone. An early look at product changes while the pilot runs."],
      ["What we ask in return", "You coordinate installation with the building management or staff. We hold a feedback call of about fifteen minutes a month. If an event happens, we ask for a short note. At the end we'd like to publish a brief case study, and we're happy to leave your name out of it."],
      ["From application to install", "You fill in the form. The pilot committee reviews it within five business days. A short video call covers the building and whether it fits. Wi-Fi and access get settled, and a simple four-page agreement is signed. The devices ship. We stay close for the first week and keep in regular touch after that."],
    ],
  },
  investors: {
    eyebrow: "Investors",
    metaTitle: "Investors: SismoSmart seed brief",
    metaDescription:
      "Problem, market, team, product roadmap and seed round details. A short summary to prepare for a conversation.",
    title: "There's a window after an earthquake that nobody measures.",
    description:
      "After a major earthquake in Turkey, structural inspection takes weeks. During those weeks families guess, businesses pause and insurance seizes up. SismoSmart is a hardware startup trying to close that window using the building's own data.",
    sections: [
      ["Problem", "After the 2023 Kahramanmaraş earthquakes, building assessment across eleven provinces took months. Insurance backed up, displacement costs piled up, and residents had no idea when they could go home. The whole system rests on engineer visits, and that's exactly the step that jams under a large event."],
      ["Why now", "Lab-grade MEMS accelerometers cost a fifth of what they did ten years ago. Dual-radio microcontrollers carrying both Wi-Fi and BLE (ESP32-S3) have reached consumer prices. Public and investor interest in disaster tech in Turkey has never been higher than it's been since 2023. Three years ago none of those three conditions held."],
      ["Market", "Turkey has roughly twenty million households and about seventy percent of the country sits in a seismic risk zone. Our first target is earthquake-aware homeowners in Istanbul, Izmir and Ankara. The second wave is building managers, insurers and municipalities. The third wave is abroad: Chile, Indonesia, Japan and Mexico."],
      ["Product", "V1 is a $79 consumer device on Wi-Fi. V1.5 adds microSD and a gyroscope. V2 is the enterprise version with cellular and LoRa. Revenue comes from two lines: device sales and a $5 monthly subscription. At scale we're targeting an LTV/CAC ratio around thirteen times."],
      ["Team", "An academic advisor with a PhD in earthquake engineering, two MSc civil engineers working on structural health monitoring algorithms and pilot fieldwork, and a founder covering embedded software and cloud. All of us are in Turkey. Academic partnership talks are under way."],
      ["Competition", "Domestic players (EDIS, Multitek) stay priced at B2B and their mobile experience is weak. Google's free Android earthquake alerts fill the notification space but never touch building health. Grillo started consumer and moved toward the public sector, and the lesson we take from that is clear: consumer hardware alone doesn't stand up. We pair the device with a subscription from day one."],
      ["Roadmap", "Q2 2026: working prototype with STA/LTA, MQTT and a mobile demo. Q3 2026: five to ten pilot installations and the first real field data. Q4 2026: seed close and company formation. Q1 2027: CE certification and first production run of 1,000 units. Q2 2027: launch and the V1.5 board revision."],
      ["Seed round", "We're raising the equivalent of $250K, which gives us eighteen months of runway. Allocation: 36% production, 32% team, 12% marketing, 8% certification, 6% cloud, 6% legal and reserve. In parallel we have a TÜBİTAK BiGG application (1.35M TL), KOSGEB programs, and cloud credits from AWS Activate, Google for Startups and Microsoft for Startups."],
      ["What we're looking for", "Angels and seed funds who have seen a hardware startup before. Partners with access to Turkish regulation, manufacturing and insurance networks are worth more to us than fast money. We share the detailed technical document and the financial model under a confidentiality agreement."],
    ],
  },
  faq: {
    eyebrow: "FAQ",
    metaTitle: "Frequently asked questions",
    metaDescription:
      "Direct answers about earthquake warning, building safety, data, privacy, installation and launch timing.",
    title: "Frequently asked questions",
    description:
      "Earthquake products are easy to oversell. We try to keep the device's limits visible. If your question isn't answered here, write to info@sismosmart.com.",
    sections: [
      ["Will this device warn me before an earthquake?", "We're talking seconds, not minutes. If the earthquake comes from a distance, the device can catch the fast-moving P wave and send a notification before the destructive S wave arrives. If the epicenter is close, that window shrinks to almost nothing. We don't market this as an early warning system, because it won't work for every earthquake."],
      ["Can a single device tell me my building is safe?", "It can't. The person who gets to call a building safe or unsafe is an engineer, not a device. What the device does is leave that engineer something solid to work from."],
      ["What data do you collect?", "Vibration readings, temperature, humidity, pressure and the device's own operating status. We don't link personal information to your device and we don't sell your data to anyone. The Privacy page has the details."],
      ["Is my exact location exposed?", "We know your device's location at neighborhood level, because we need it to match an event against nearby devices. Anything more precise is only shared under an explicit pilot agreement."],
      ["Can researchers access my data?", "Only once the data is anonymized and only under a separate agreement with you. That flow doesn't exist yet; it's on the roadmap."],
      ["How is this different from Google's earthquake alerts?", "Google uses the accelerometer in people's phones. It's free, it's already on every handset, and it works well. But what it measures is the source of the earthquake, not your building. We do the opposite: how your building vibrates, how that changes with the season, what state it's in after an earthquake. A phone can't answer those questions."],
      ["What happens when the internet goes down?", "The device keeps measuring and saves the event to its own memory. It can't send a notification, because that needs a connection. When the internet comes back, it uploads whatever is waiting."],
      ["What happens during a power cut?", "There's a small supercapacitor inside. It gives about 30 to 60 seconds of bridge power, which is enough to send the last event to the cloud. A longer outage shuts the device down."],
      ["How hard is installation?", "You plug the USB-C cable into a socket, stick the device to the wall with the adhesive on the back, and pair it from the app. No drill and no technician. It takes five minutes."],
      ["How many devices should one building have?", "One will do the job. But with two or three on different floors you can see how the floors move relative to each other, and that's far more valuable for structural health tracking. In apartment pilots we aim for at least three per building."],
      ["What do PGA, PGV and MMI mean?", "PGA is the peak acceleration the ground reaches during an earthquake, in m/s². PGV is the peak velocity, in cm/s. MMI is the Modified Mercalli intensity scale, which describes how the shaking felt on a range from I to XII. The device reports all three after an event."],
      ["What does natural frequency tell you?", "Every building has a frequency it tends to sway at. For a five-storey reinforced concrete building that's typically around 2 to 4 Hz. Structural damage drags that frequency down. Because we track it regularly, we can catch a signal while the damage is still early."],
      ["Which way should the device face?", "There's an upward arrow on the back; point it at the ceiling. Try to align the device's X and Y axes with the building's horizontal directions. Mounted 90 degrees off, the data is still usable, though it carries a little less information."],
      ["Does the device record sound?", "No. There's no microphone inside, only an accelerometer that measures ground vibration. Recording speech or ambient sound would take an entirely different sensor."],
      ["Does my data leave Turkey?", "Pilot data residency is not final. Before device data is collected, each pilot agreement will identify processing locations, transfers, retention and the applicable legal basis."],
      ["When does it go on sale?", "Pilots start in summer 2026. We're aiming for broad availability by the end of 2026 or early 2027. Certification and manufacturing could push that back. Sign up for the newsletter and you'll hear the firm date first."],
    ],
  },
  security: {
    eyebrow: "Security",
    metaTitle: "Security",
    metaDescription:
      "How we handle website security, consent, device data, encrypted transport and privacy during the pilot phase.",
    title: "The data you never collect is the data you can't leak.",
    description:
      "That's our basic rule. The only thing live right now is the website, but we're building the device side on the same rule.",
    sections: [
      ["Minimal data by default", "The device sends only what's needed: motion, environment, operating status and the time of an event. We don't collect anything beyond that."],
      ["Consent before analytics", "Web analytics load only after you consent. You can reset that choice at any time from the link in the footer."],
      ["Encrypted transport", "The site runs on HTTPS with security headers. Device traffic is designed to be encrypted end to end."],
      ["No secrets reach the browser", "Private keys and service tokens never appear in code that ships to the browser. They stay in server settings or in GitHub Secrets."],
      ["Vulnerability reporting", "If you find a security issue on the site or in pre-launch materials, write to info@sismosmart.com. We're grateful to researchers who disclose responsibly."],
      ["Device security plan", "Before the device ships we're committing to signed firmware, encrypted flash, two OTA partitions with automatic rollback, and a unique per-device key provisioned at the factory. Full security documentation goes live with the device."],
    ],
  },
});
