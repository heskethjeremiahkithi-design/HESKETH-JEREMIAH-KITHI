import { Product, CyberService, DesignPackage, TrackerStatus } from './types';

export const FLAGSHIP_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Hesketh ProBook x360 Touchscreen Laptop',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
    moq: 3,
    basePrice: 420,
    tiers: [
      { range: '3-9 units', price: 420 },
      { range: '10-49 units', price: 395 },
      { range: '50+ units', price: 370 }
    ],
    verifiedSupplier: true,
    tradeAssurance: true,
    yearsActive: 5,
    rating: 4.9,
    status: 'Ready to Ship',
    description: 'High-performance 14" business convertible laptop with 16GB RAM, 512GB SSD, Intel i7 processor, and durable magnesium-alloy body. Excellent for cyber cafes and executive office deployments.',
    shippingEstimate: 'Ships in 1-3 days across Coastal region (Kilifi/Malindi) & nationwide',
    specs: [
      { name: 'Processor', value: 'Intel Core i7 11th Gen' },
      { name: 'Memory', value: '16GB DDR4 RAM' },
      { name: 'Storage', value: '512GB NVMe M.2 SSD' },
      { name: 'Operating System', value: 'Windows 11 Pro Licensed' },
      { name: 'Warranty', value: '1 Year Local Warranty' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Elite Cyber-Core i5 Complete Desktop PC Suite',
    category: 'Desktops',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=600&q=80',
    moq: 5,
    basePrice: 280,
    tiers: [
      { range: '5-9 units', price: 280 },
      { range: '10-19 units', price: 260 },
      { range: '20+ units', price: 240 }
    ],
    verifiedSupplier: true,
    tradeAssurance: true,
    yearsActive: 5,
    rating: 4.8,
    status: 'Customizable',
    description: 'The ultimate workhorse desktop for cyber cafes, offices, and institutions. Includes 19" LED Monitor, Keyboard, Mouse, and central CPU tower. energy-efficient and highly reliable.',
    shippingEstimate: 'Ships in 5-7 days (Ocean/Air freight)',
    specs: [
      { name: 'CPU', value: 'Intel Core i5 3.2 GHz' },
      { name: 'RAM', value: '8GB DDR4 (Upgradable)' },
      { name: 'Storage', value: '256GB SSD + 500GB HDD' },
      { name: 'Monitor', value: '19.5" HD LED Display' },
      { name: 'Accessories', value: 'Power cables, USB Keyboard & Optical Mouse' }
    ]
  },
  {
    id: 'prod-3',
    name: 'Heavy Duty Optical Scan & Print Duplex Terminal',
    category: 'Printers & Scanners',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
    moq: 2,
    basePrice: 350,
    tiers: [
      { range: '2-4 units', price: 350 },
      { range: '5-9 units', price: 330 },
      { range: '10+ units', price: 305 }
    ],
    verifiedSupplier: true,
    tradeAssurance: true,
    yearsActive: 5,
    rating: 4.7,
    status: 'In Stock',
    description: 'High-speed industrial monochrome laser printer with integrated scanner and double-sided printing. Essential for busy cyber cafe establishments and large corporate centers.',
    shippingEstimate: 'Ready to dispatch from Malindi branch store',
    specs: [
      { name: 'Print Speed', value: '45 Pages Per Minute (Mono)' },
      { name: 'Functions', value: 'Print, Copy, Scan, Fax' },
      { name: 'Resolution', value: '1200 x 1200 DPI' },
      { name: 'Interface', value: 'Ethernet, High-speed USB, Wi-Fi Direct' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Hesketh 1080p Web Video Conference Camera',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1600541519463-ee37452d325c?auto=format&fit=crop&w=600&q=80',
    moq: 10,
    basePrice: 18,
    tiers: [
      { range: '10-29 units', price: 18 },
      { range: '30-99 units', price: 15 },
      { range: '100+ units', price: 12 }
    ],
    verifiedSupplier: true,
    tradeAssurance: false,
    yearsActive: 5,
    rating: 4.9,
    status: 'Ready to Ship',
    description: 'Full HD USB Web Camera with dual omnidirectional microphones and integrated privacy shutter. Perfect for online virtual classes, passport-taking, and cyber cafe setups.',
    shippingEstimate: 'Immediate dispatch',
    specs: [
      { name: 'Video Quality', value: '1080p @ 30FPS' },
      { name: 'Field of View', value: '90 Degrees Wide' },
      { name: 'Connection', value: 'Plug & Play USB 2.0/3.0' },
      { name: 'Focus', value: 'Autofocus with AI lighting optimization' }
    ]
  },
  {
    id: 'prod-5',
    name: 'SuperSpeed USB 3.0 External Hard Drive (1TB)',
    category: 'Storage',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
    moq: 5,
    basePrice: 45,
    tiers: [
      { range: '5-19 units', price: 45 },
      { range: '20-49 units', price: 41 },
      { range: '50+ units', price: 37 }
    ],
    verifiedSupplier: true,
    tradeAssurance: true,
    yearsActive: 5,
    rating: 4.6,
    status: 'In Stock',
    description: 'Rugged external backup storage featuring drop resistance and lightning-fast USB 3.0 transfers. Ideal for computer service stores, backup archival, and consumer retail.',
    shippingEstimate: 'Ships in 1-2 days',
    specs: [
      { name: 'Capacity', value: '1 Terabyte (1000GB)' },
      { name: 'Interface', value: 'SATA to USB 3.0 (Backwards compatible)' },
      { name: 'Data Rate', value: 'Up to 5 Gbps' },
      { name: 'Protection', value: 'Shockproof rubberized bumper armor' }
    ]
  },
  {
    id: 'prod-6',
    name: 'High-Density CAT6 Pure Copper Network Cable',
    category: 'Networking',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    moq: 5,
    basePrice: 12,
    tiers: [
      { range: '5-14 units', price: 12 },
      { range: '15-49 units', price: 10 },
      { range: '50+ units', price: 8 }
    ],
    verifiedSupplier: true,
    tradeAssurance: true,
    yearsActive: 5,
    rating: 4.5,
    status: 'Ready to Ship',
    description: 'Professional-grade 20-meter pre-terminated CAT6 network patching cable. Features high bandwidth with low attenuation. Perfect for networking entire cyber cafes, offices, or labs.',
    shippingEstimate: 'Ready to ship from warehouse',
    specs: [
      { name: 'Length', value: '20 Meters (Pre-cut with RJ45 connectors)' },
      { name: 'Conductor', value: '23 AWG Pure Solid Copper' },
      { name: 'Frequency', value: 'Supports up to 550 MHz' },
      { name: 'Shielding', value: 'UTP (Unshielded Twisted Pair) with spline separator' }
    ]
  }
];

const Brands = ['Hesketh', 'Aero', 'Vortex', 'Hyper', 'Apex', 'Matrix', 'Sonic', 'Nomad', 'Pulse', 'Zenith', 'Quantum'];

const accessoryTemplates = [
  // Storage
  {
    nameTemplate: "High-Speed Class 10 MicroSD XC Card",
    category: "Storage",
    image: "https://images.unsplash.com/photo-1546957307-887af1a79e2e?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 6.5,
    moq: 20,
    specs: [
      { name: "Speed Class", value: "Class 10, UHS-I U3" },
      { name: "Read Speed", value: "Up to 100MB/s" },
      { name: "Compatibility", value: "Smartphones, CCTV, Cameras" }
    ],
    description: "Ultra-resilient micro SD card optimized for high-definition video recording, storage extension, and general embedded system operations."
  },
  {
    nameTemplate: "Dual USB 3.1 & Type-C Flash Drive",
    category: "Storage",
    image: "https://images.unsplash.com/photo-1622760813982-f157547aa99c?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 8.0,
    moq: 15,
    specs: [
      { name: "Interface", value: "USB Type-A + USB Type-C Dual Connectors" },
      { name: "Transfer Rate", value: "USB 3.1 SuperSpeed (up to 150MB/s)" },
      { name: "Body", value: "Sleek Swivel Metal Protection" }
    ],
    description: "Multi-device flash drive allowing data sharing between Type-C smartphones, modern MacBooks, and standard legacy USB-A computer ports."
  },
  {
    nameTemplate: "Solid State Drive (SATA III 2.5\")",
    category: "Storage",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 22.0,
    moq: 5,
    specs: [
      { name: "Form Factor", value: "2.5-inch Internal SSD" },
      { name: "Read/Write", value: "Up to 550MB/s / 500MB/s" },
      { name: "Interface", value: "SATA III 6Gbps" }
    ],
    description: "Unleash super-fast computer boot-up and app loading times. Perfect for restoring slow, lagging cyber cafe machines or office desktop setups."
  },
  {
    nameTemplate: "M.2 NVMe PCIe High-Speed SSD",
    category: "Storage",
    image: "https://images.unsplash.com/photo-1591405351990-4726e33df48b?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 35.0,
    moq: 5,
    specs: [
      { name: "Form Factor", value: "M.2 2280" },
      { name: "Interface", value: "PCIe Gen 3 x4 NVMe" },
      { name: "Read Speed", value: "Up to 2100MB/s" }
    ],
    description: "Next-generation high-speed M.2 SSD. Accelerate multi-tasking workflows, database indexing, and gaming station loading speeds with extreme efficiency."
  },
  // Mouse & Keyboards
  {
    nameTemplate: "Ergonomic Optical USB Wired Mouse",
    category: "Mouse & Keyboards",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 4.5,
    moq: 25,
    specs: [
      { name: "Connection", value: "Wired USB (1.5 Meter Cable)" },
      { name: "Resolution", value: "1200 DPI Optical Engine" },
      { name: "Durability", value: "Tested for 3 million keystrokes" }
    ],
    description: "Sleek, lightweight, and durable optical mouse designed for heavy everyday use in office cubicles and busy internet cafes."
  },
  {
    nameTemplate: "Silent Multi-Device Wireless Mouse",
    category: "Mouse & Keyboards",
    image: "https://images.unsplash.com/photo-1625842268584-8f3290416979?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 7.5,
    moq: 15,
    specs: [
      { name: "Wireless", value: "2.4GHz USB Dongle + Bluetooth Dual Mode" },
      { name: "Buttons", value: "Silent Whisper-Quiet Clicks" },
      { name: "Range", value: "Up to 10 Meters" }
    ],
    description: "Ditch the clicky noise and messy cables. Features hybrid Bluetooth and 2.4G wireless modes for clean workspaces."
  },
  {
    nameTemplate: "Full-Size Slim Business Wired Keyboard",
    category: "Mouse & Keyboards",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 9.0,
    moq: 10,
    specs: [
      { name: "Layout", value: "Standard US QWERTY Layout with Numeric Keypad" },
      { name: "Keys", value: "Spill-Resistant Low-Profile keys" },
      { name: "Interface", value: "Plug & Play USB Wired" }
    ],
    description: "Reliable and durable full-size keyboard engineered for fast, comfortable typing and maximum tactile response."
  },
  {
    nameTemplate: "Rainbow Backlit Gaming Mechanical Keyboard",
    category: "Mouse & Keyboards",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 25.0,
    moq: 5,
    specs: [
      { name: "Switch Type", value: "Tactile Blue Mechanical Switches" },
      { name: "Backlight", value: "Multi-Mode Vibrant RGB / Rainbow LED" },
      { name: "Anti-Ghosting", value: "Full 104-Key Rollover" }
    ],
    description: "Pro-level gaming keyboard with high clickiness, tactile feedback, and stunning customized LED backlighting presets."
  },
  {
    nameTemplate: "Wireless Keyboard & Mouse Desk Combo",
    category: "Mouse & Keyboards",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 18.0,
    moq: 8,
    specs: [
      { name: "Receiver", value: "Single 2-in-1 USB Nano Dongle" },
      { name: "Battery Life", value: "Up to 12 Months with Auto-Sleep" },
      { name: "Keyboard", value: "Full-size with dedicated multimedia shortcuts" }
    ],
    description: "The complete setup to declutter your work table. Connects both keyboard and mouse using just one micro USB slot."
  },
  // Cables & Adapters
  {
    nameTemplate: "Gold-Plated Braided HDMI 2.0 Cable",
    category: "Cables & Adapters",
    image: "https://images.unsplash.com/photo-1555531590-41789c65ebaf?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 3.5,
    moq: 30,
    specs: [
      { name: "Version", value: "HDMI 2.0 (Ultra HD 4K compatible)" },
      { name: "Sheath", value: "Durable Double-Braided Nylon" },
      { name: "Connectors", value: "Corrosion-resistant Gold-plated" }
    ],
    description: "High-fidelity digital video/audio transfer. Connect your laptops to big-screen TVs, monitors, or office overhead projectors."
  },
  {
    nameTemplate: "4-in-1 Multi-Port USB 3.0 Hub",
    category: "Cables & Adapters",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 6.0,
    moq: 20,
    specs: [
      { name: "Ports", value: "4x SuperSpeed USB 3.0 Output Slots" },
      { name: "Data Speed", value: "Up to 5 Gbps Transfer Rate" },
      { name: "Material", value: "Reinforced ABS Shell with short cable" }
    ],
    description: "Expand your single USB port into 4 slots. Easily run external hard drives, flash drives, mouse, and keyboard together."
  },
  {
    nameTemplate: "USB-C to HDMI 4K Video Adapter",
    category: "Cables & Adapters",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 11.0,
    moq: 10,
    specs: [
      { name: "Input", value: "USB Type-C Male Thunderbolt 3/4" },
      { name: "Output", value: "HDMI Female (Supports up to 4K @ 30Hz)" },
      { name: "Shell", value: "Anodized Space-Grey Aluminum" }
    ],
    description: "Connect modern laptops and tablets directly to external UHD TVs, high-end monitors, and digital projector screens."
  },
  {
    nameTemplate: "VGA to HDMI Converter with Aux Audio",
    category: "Cables & Adapters",
    image: "https://images.unsplash.com/photo-1555531590-41789c65ebaf?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 7.5,
    moq: 15,
    specs: [
      { name: "Input", value: "VGA Male + 3.5mm Aux Audio Jack" },
      { name: "Output", value: "HDMI Female" },
      { name: "Power", value: "Includes Micro-USB Power Cable" }
    ],
    description: "Convert analogue VGA video and AUX audio signals into standard digital HDMI to connect older computer towers to modern flat screens."
  },
  // Power & Chargers
  {
    nameTemplate: "Universal 90W Multi-Tip Laptop Charger",
    category: "Power & Chargers",
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 15.0,
    moq: 10,
    specs: [
      { name: "Output Power", value: "90W (Auto-voltage 15V-20V)" },
      { name: "Tips", value: "10 Interchangeable connectors for HP, Dell, Lenovo, Asus, etc." },
      { name: "Protection", value: "Overload and short-circuit auto cutout" }
    ],
    description: "Versatile replacement power brick. Fits 95% of standard laptops, making it a must-have for technicians and retail shops."
  },
  {
    nameTemplate: "PowerGrip 5-Way Extension Socket",
    category: "Power & Chargers",
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 8.5,
    moq: 12,
    specs: [
      { name: "Outlets", value: "5 Standard 3-Pin British Sockets" },
      { name: "USB Output", value: "2x USB Ports (5V 2.1A total for charging)" },
      { name: "Cable Length", value: "3 Meters Heavy Duty Copper Wire" }
    ],
    description: "High-grade extension socket featuring built-in surge/lightning overload protection. Vital for protecting cyber cafe equipment from power fluctuations."
  },
  {
    nameTemplate: "Super-Fast 65W GaN Dual-Port Wall Charger",
    category: "Power & Chargers",
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 14.5,
    moq: 10,
    specs: [
      { name: "Technology", value: "Gallium Nitride (GaN) high efficiency" },
      { name: "Ports", value: "1x USB-C (65W Max) + 1x USB-A (18W Max)" },
      { name: "Support", value: "Power Delivery (PD) & Quick Charge (QC 3.0)" }
    ],
    description: "Next-gen compact charger that quickly powers up USB-C laptops, Macbooks, tablets, and smartphones simultaneously."
  },
  {
    nameTemplate: "Dual-USB Power Bank 20,000mAh",
    category: "Power & Chargers",
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 16.0,
    moq: 8,
    specs: [
      { name: "Capacity", value: "20,000 mAh High-Density Cell" },
      { name: "Inputs", value: "USB-C + Micro-USB Dual Ports" },
      { name: "Outputs", value: "2x USB-A Smart Fast Charging Ports" }
    ],
    description: "Massive backup power bank to keep your phones and gadgets alive during travel or coastal load shedding."
  },
  // Audio & Speakers
  {
    nameTemplate: "Heavy Bass Wired In-Ear Earphones",
    category: "Audio & Speakers",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 2.5,
    moq: 50,
    specs: [
      { name: "Connector", value: "3.5mm Gold-Plated Audio Plug" },
      { name: "Drivers", value: "10mm Neodymium dynamic sound drivers" },
      { name: "Remote", value: "Inline Microphone with play/pause slider" }
    ],
    description: "High-bass, ergonomic earphones perfect for quick sale, personal smartphones, or virtual call assistants."
  },
  {
    nameTemplate: "USB Multimedia Desktop Stereo Speakers",
    category: "Audio & Speakers",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 8.5,
    moq: 12,
    specs: [
      { name: "Output Power", value: "6W RMS (3W x 2 Active Speakers)" },
      { name: "Power Source", value: "USB 5V Direct Plug" },
      { name: "Audio Input", value: "3.5mm Jack Aux" }
    ],
    description: "Compact speakers delivering loud, clear audio with integrated volume control wheel. Excellent fit for cyber cafe stations."
  },
  {
    nameTemplate: "Noise-Cancelling Wireless Bluetooth Headset",
    category: "Audio & Speakers",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 19.5,
    moq: 8,
    specs: [
      { name: "Bluetooth Version", value: "BT v5.2 (Low Energy)" },
      { name: "Playback Time", value: "Up to 30 Hours Rechargeable" },
      { name: "Cushions", value: "Memory Foam breathable earcups" }
    ],
    description: "Immersive over-ear wireless headphones with deep acoustic drivers and crisp built-in mic for music and telephone calls."
  },
  // Networking
  {
    nameTemplate: "Mini USB Wi-Fi Receiver 150Mbps",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 3.8,
    moq: 30,
    specs: [
      { name: "Speed", value: "Up to 150Mbps Wireless Transmission" },
      { name: "Chipset", value: "Realtek High-Compatibility driver" },
      { name: "Standard", value: "IEEE 802.11b/g/n" }
    ],
    description: "Ultra-small USB wireless dongle. Adds quick Wi-Fi capability to offline desktop computers instantly."
  },
  {
    nameTemplate: "Dual-Antenna USB Wi-Fi Adapter 300Mbps",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 6.8,
    moq: 20,
    specs: [
      { name: "Speed", value: "300 Mbps" },
      { name: "Antennas", value: "Dual 5dBi High-Gain External Antennas" },
      { name: "Rotation", value: "180 Degree adjustable signal aim" }
    ],
    description: "High-power wireless adapter with dual antennas to catch weak network signals from long distances."
  },
  {
    nameTemplate: "Wi-Fi Range Extender & Repeater 300M",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 13.5,
    moq: 10,
    specs: [
      { name: "Function", value: "Boosts existing Wi-Fi signal coverage" },
      { name: "Ethernet Port", value: "1x LAN Port for wired connection" },
      { name: "Antennas", value: "Dual External high-gain boosters" }
    ],
    description: "Eliminate internet dead zones. Plug into hallway sockets to expand wireless network reach inside homes, offices, or cafes."
  },
  // Protection & Accessories
  {
    nameTemplate: "Shockproof Neoprene Laptop Sleeve",
    category: "Protection & Stands",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 5.5,
    moq: 15,
    specs: [
      { name: "Material", value: "Water-resistant padded Neoprene foam" },
      { name: "Closure", value: "Dual-Glide Smooth Metallic Zippers" },
      { name: "Interior", value: "Scratch-resistant soft flannel fleece" }
    ],
    description: "Snug-fit protective sleeve safeguarding laptops from direct bumps, accidental drops, and everyday coffee spills."
  },
  {
    nameTemplate: "Adjustable Aluminum Laptop Desk Stand",
    category: "Protection & Stands",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3a78?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 10.0,
    moq: 10,
    specs: [
      { name: "Material", value: "Premium Aviation-grade Aluminum Alloy" },
      { name: "Levels", value: "6 Adjustable height ergonomic angles" },
      { name: "Feature", value: "Foldable design with free carry bag" }
    ],
    description: "Raise screens to eye level to reduce strain on necks and shoulders. Highly recommended for remote programmers and office setups."
  },
  {
    nameTemplate: "Heavy-Duty Multi-Fan Laptop Cooling Pad",
    category: "Protection & Stands",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3a78?auto=format&fit=crop&w=400&q=80",
    basePriceUsd: 12.5,
    moq: 10,
    specs: [
      { name: "Fans", value: "4 Silent High-Speed Blue LED Fans" },
      { name: "USB Pass-through", value: "Dual USB ports (one for power, one for accessories)" },
      { name: "Stand", value: "Multi-angle adjustable bottom feet" }
    ],
    description: "Keep high-performance laptop processors cool. Avoid thermal lagging, especially in hot tropical coastal locations."
  }
];

const GENERATED_PRODUCTS: Product[] = Array.from({ length: 94 }, (_, index) => {
  const i = index + 7; // product IDs start from prod-7
  const template = accessoryTemplates[index % accessoryTemplates.length];
  const brand = Brands[index % Brands.length];
  
  // Create some variation values based on the index
  let variantSuffix = "";
  let priceModifier = 1.0;
  let customSpecs = [...template.specs];
  
  if (template.category === "Storage") {
    const capacities = ["64GB", "128GB", "256GB", "512GB"];
    const cap = capacities[index % capacities.length];
    variantSuffix = ` (${cap})`;
    // Adjust price based on capacity index
    priceModifier = 0.8 + (index % capacities.length) * 0.45;
    customSpecs = [
      { name: "Storage Capacity", value: cap },
      ...template.specs.filter(s => s.name !== "Capacity")
    ];
  } else if (template.category === "Cables & Adapters") {
    const lengths = ["1.5 Meters", "3 Meters", "5 Meters"];
    const len = lengths[index % lengths.length];
    variantSuffix = ` - ${len}`;
    priceModifier = 0.9 + (index % lengths.length) * 0.35;
    customSpecs = [
      { name: "Cable Length", value: len },
      ...template.specs.filter(s => s.name !== "Length")
    ];
  } else if (template.category === "Protection & Stands" && template.nameTemplate.includes("Sleeve")) {
    const sizes = ["13.3-inch", "14-inch", "15.6-inch"];
    const sz = sizes[index % sizes.length];
    variantSuffix = ` (${sz})`;
    priceModifier = 0.95 + (index % sizes.length) * 0.15;
    customSpecs = [
      { name: "Supported Sizes", value: sz },
      ...template.specs
    ];
  }

  // Calculate final basePrice, rounded to nearest 0.5 USD for professional look
  const rawPrice = template.basePriceUsd * priceModifier;
  const basePrice = Math.round(rawPrice * 2) / 2;
  
  // Generate bulk tiers
  const tier1Price = basePrice;
  const tier2Price = Math.max(0.5, Math.round(basePrice * 0.9 * 2) / 2);
  const tier3Price = Math.max(0.5, Math.round(basePrice * 0.8 * 2) / 2);
  
  const moq = template.moq;
  const tiers = [
    { range: `${moq}-${moq + 9} units`, price: tier1Price },
    { range: `${moq + 10}-${moq + 49} units`, price: tier2Price },
    { range: `${moq + 50}+ units`, price: tier3Price }
  ];

  // Ratings between 4.4 and 4.9
  const rating = Math.round((4.4 + (index % 6) * 0.1) * 10) / 10;
  const yearsActive = 3 + (index % 6);
  const status = index % 3 === 0 ? 'Ready to Ship' : index % 3 === 1 ? 'In Stock' : 'Customizable';

  return {
    id: `prod-${i}`,
    name: `${brand} ${template.nameTemplate}${variantSuffix}`,
    category: template.category,
    image: template.image,
    moq,
    basePrice,
    tiers,
    verifiedSupplier: true,
    tradeAssurance: index % 2 === 0,
    yearsActive,
    rating,
    status: status as 'Ready to Ship' | 'Customizable' | 'In Stock',
    specs: customSpecs,
    description: template.description,
    shippingEstimate: 'Ships in 1-2 days to Coastal region & nationwide'
  };
});

export const WHOLESALE_PRODUCTS: Product[] = [
  ...FLAGSHIP_PRODUCTS,
  ...GENERATED_PRODUCTS
];

export const CYBER_SERVICES: CyberService[] = [
  {
    id: 'cyber-kra-reg',
    name: 'KRA Tax PIN Registration',
    category: 'government',
    price: 150,
    unit: 'per registration',
    description: 'First-time registration of KRA PIN certificates for individuals and companies, with accurate tax obligation setups.',
    requirements: ['National ID Card Scanned Copy', 'Valid Email Address', 'Active Phone Number']
  },
  {
    id: 'cyber-kra-return',
    name: 'KRA Nil/Income Tax Filing',
    category: 'government',
    price: 200,
    unit: 'per annual filing',
    description: 'Accurate and timely filing of annual KRA tax returns (Nil returns or employment returns using P9 certificates). Avoid standard KSh 20,000 penalties.',
    requirements: ['KRA PIN & iTax Password', 'P9 Form (if employed) or Nil Declaration details']
  },
  {
    id: 'cyber-ecitizen',
    name: 'eCitizen Services (NTSA/Business/Good Conduct)',
    category: 'government',
    price: 350,
    unit: 'per application processing',
    description: 'Assistance with essential national portal filings: Good Conduct certificates, Business Name registration, DL applications, or Land searches.',
    requirements: ['eCitizen Username & Password', 'Support documentation based on service required']
  },
  {
    id: 'cyber-helb',
    name: 'HELB Loan Application & Compliance',
    category: 'government',
    price: 250,
    unit: 'per application',
    description: 'Assistance with Higher Education Loans Board (HELB) subsequent or first-time loan applications and obtaining compliance certificates.',
    requirements: ['HELB Portal Credentials', 'Parental Details/ID/KRA PIN', 'Admission letter / Fee structure']
  },
  {
    id: 'cyber-printing-color',
    name: 'High-Quality Color Laser Printing',
    category: 'printing',
    price: 15,
    unit: 'per single-sided page',
    description: 'Vibrant color printing on high-quality 80gsm paper, ideal for school projects, business profiles, and reports.',
    requirements: ['Digital PDF / Word document file']
  },
  {
    id: 'cyber-printing-bw',
    name: 'B&W Fast Photocopy / Printing',
    category: 'printing',
    price: 5,
    unit: 'per page',
    description: 'Rapid mono-laser printing or duplex photocopying. Perfect for textbooks, large booklets, or office notes.',
    requirements: ['Softcopy file or hardcopy original']
  },
  {
    id: 'cyber-laminating',
    name: 'Professional Lamination (ID to A4 Size)',
    category: 'printing',
    price: 100,
    unit: 'per document',
    description: 'High-mic waterproof hot-lamination to preserve and protect certificates, permits, and identity documents.',
    requirements: ['Original clean physical document']
  },
  {
    id: 'cyber-typesetting',
    name: 'Expert Typesetting & Document Formatting',
    category: 'documents',
    price: 100,
    unit: 'per page typeset',
    description: 'Manual typing, styling, and structural formatting of resumes, school assignments, or legal agreements with premium layouts.',
    requirements: ['Handwritten manuscript or audio file draft']
  }
];

export const DESIGN_PACKAGES: DesignPackage[] = [
  {
    id: 'design-logo-starter',
    title: 'Hesketh Starter Identity Pack',
    price: 3500,
    timeline: '2 Days Delivery',
    deliverables: ['2 Unique Logo Concepts', 'PNG/JPEG Transparent files', 'Color Palette guide', '1 Revision cycle'],
    description: 'Excellent for startup businesses, kiosks, and small side projects wanting an immediate high-contrast professional mark.'
  },
  {
    id: 'design-pro-brand',
    title: 'Professional Corporate Branding Standard',
    price: 8500,
    timeline: '4 Days Delivery',
    deliverables: ['3 Rich Design Concepts', 'Vector Master Source Files (AI, SVG, PDF)', 'Double-sided Business Card Template', 'Social Media Branding templates', 'Unlimited Revisions during draft stage'],
    description: 'Our most popular design suite. Tailored for small-to-medium enterprises ready to make a significant impression in the physical and digital Kenyan market.'
  },
  {
    id: 'design-flyer-poster',
    title: 'High-Impact Promotional Flyer or Banner',
    price: 2000,
    timeline: '1-2 Days Delivery',
    deliverables: ['Custom Concept Design', 'Print-ready High Resolution PDF (CMYK)', 'Social Media optimized JPG', 'Source PSD/AI asset'],
    description: 'Eye-catching, bold graphics optimized for events, business sales, product launches, or digital WhatsApp/Instagram promotions.'
  }
];

export const MOCK_ORDERS: TrackerStatus[] = [
  {
    orderId: 'HESK-2849',
    customerName: 'Karanja Mwangi',
    type: 'Wholesale Purchase',
    items: '3x Hesketh ProBook x360 Laptops',
    status: 'processing',
    date: 'July 12, 2026',
    timeline: [
      { title: 'Inquiry & Invoice Generated', description: 'B2B order details finalized and payment verified.', date: 'July 12, 2026 10:15 AM', completed: true },
      { title: 'Quality Assurance Testing', description: 'Checking touchscreen responsiveness, OS license, and battery wellness.', date: 'July 13, 2026 02:30 PM', completed: true },
      { title: 'Packaging & Warehouse Dispatch', description: 'Strap-secured dualbox packing with fragile labels.', date: 'July 14, 2026 09:00 AM', completed: false },
      { title: 'Delivery to Hub', description: 'Handover to G4S / Wells Fargo courier for Coastal Kilifi-Malindi routing.', date: 'Pending', completed: false }
    ]
  },
  {
    orderId: 'HESK-9012',
    customerName: 'Amina Mohamed',
    type: 'Cyber Service',
    items: 'KRA Annual Filing Helper',
    status: 'completed',
    date: 'July 13, 2026',
    timeline: [
      { title: 'Service Details Received', description: 'Credentials and tax records submitted through portal.', date: 'July 13, 2026 11:00 AM', completed: true },
      { title: 'Tax Officer Assessment', description: 'Drafting liabilities and reconciling P9 values.', date: 'July 13, 2026 11:30 AM', completed: true },
      { title: 'Filing & iTax Confirmation', description: 'Return receipt generated successfully on KRA system.', date: 'July 13, 2026 12:15 PM', completed: true },
      { title: 'Receipt Emailed & Completed', description: 'iTax confirmation slip sent to Amina via WhatsApp & Email.', date: 'July 13, 2026 12:30 PM', completed: true }
    ]
  },
  {
    orderId: 'HESK-1048',
    customerName: 'DevTech Solutions',
    type: 'Graphic Design',
    items: 'Professional Corporate Branding Standard',
    status: 'review',
    date: 'July 11, 2026',
    timeline: [
      { title: 'Design Brief Submitted', description: 'Color preferences and branding style chosen.', date: 'July 11, 2026 04:00 PM', completed: true },
      { title: 'Concept Research & Sketching', description: 'Developing grid systems and custom vector structures.', date: 'July 12, 2026 09:30 AM', completed: true },
      { title: 'Client Draft Review', description: 'Initial drafts rendered. Awaiting user response on Concept #2.', date: 'July 13, 2026 05:00 PM', completed: true },
      { title: 'Final Export & Deliver', description: 'Preparing high-res AI, PDF, and PNG files.', date: 'Pending Client Feedback', completed: false }
    ]
  }
];
