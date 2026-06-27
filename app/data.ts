export interface Product {
  id: string;
  name: string;
  category: "Utilities" | "Jewellery" | "Dresses";
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  video: string;
  description: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "u1",
    name: "Mag-Charge Desk Base",
    category: "Utilities",
    price: 89.99,
    rating: 4.7,
    reviewsCount: 165,
    image:
      "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Consolidate your charging with this CNC-machined walnut and aluminum desk base. Powers your phone, watch, and earbuds simultaneously with MagSafe-compatible 15W wireless charging.",
    isPopular: true,
  },
  {
    id: "u2",
    name: "Thermostatic Hydro Flask",
    category: "Utilities",
    price: 39.5,
    rating: 4.9,
    reviewsCount: 215,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Keep your drinks ice-cold for 24 hours or steaming hot for 12 hours. Uses double-wall vacuum insulation with a durable powder-coated exterior and leak-proof lock cap.",
  },
  {
    id: "u3",
    name: "Ergo-Lift Laptop Stand",
    category: "Utilities",
    price: 65,
    rating: 4.8,
    reviewsCount: 112,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Elevate your screen to eye level. Crafted from sandblasted aircraft-grade aluminium with premium silicone padding to prevent scratches and slide.",
    isNew: true,
  },
  {
    id: "u4",
    name: "Orbit Key Organiser",
    category: "Utilities",
    price: 42,
    rating: 4.6,
    reviewsCount: 78,
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Transform your messy key ring into a silent, organized stack. Handcrafted from top-grain Saffiano leather with custom stainless steel hardware.",
  },
  {
    id: "u5",
    name: "Studio Acoustic Panels",
    category: "Utilities",
    price: 120,
    rating: 4.7,
    reviewsCount: 45,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Professional felt panels designed to absorb echoes and background noise. Made from eco-friendly recycled PET fibers with peel-and-stick adhesive.",
  },
  {
    id: "u6",
    name: "Loom Cord Wrapper",
    category: "Utilities",
    price: 28,
    rating: 4.5,
    reviewsCount: 39,
    image:
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Keep your charging cables neatly wound. Built from premium full-grain leather with integrated high-grade neodymium magnets for secure wrapping.",
  },
  {
    id: "u7",
    name: "Desk Felt Blotter",
    category: "Utilities",
    price: 55,
    rating: 4.8,
    reviewsCount: 134,
    image:
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A comfortable desk writing pad crafted from 100% Merino wool felt. Provides a soft workspace surface while protecting your desk from scratches.",
  },
  {
    id: "u8",
    name: "Mag-Stand Travel Duo",
    category: "Utilities",
    price: 79.99,
    rating: 4.9,
    reviewsCount: 88,
    image:
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Foldable wireless travel charger that powers both your iPhone and Apple Watch. Pocket-sized design makes it the ultimate travel companion.",
    isPopular: true,
  },
  {
    id: "u9",
    name: "Beam Monitor Lightbar",
    category: "Utilities",
    price: 110,
    rating: 4.7,
    reviewsCount: 67,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Space-saving task light that clamps onto your monitor screen. Eliminates glare and screen reflection to reduce eye strain during late night work.",
  },
  {
    id: "u10",
    name: "Nest Desk Organizer",
    category: "Utilities",
    price: 75,
    rating: 4.6,
    reviewsCount: 59,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A solid oak catch-all desk tray featuring a felt-lined base to hold pens, keys, glasses, and daily accessories neatly in one dedicated space.",
  },
  {
    id: "u11",
    name: "Nomad Tech Case",
    category: "Utilities",
    price: 49,
    rating: 4.8,
    reviewsCount: 142,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Organize your tech accessories on the go. Built from water-resistant ballistic nylon with mesh pockets and elastic loops to keep cords safe.",
  },
  {
    id: "u12",
    name: "Horizon Desk Mat",
    category: "Utilities",
    price: 35,
    rating: 4.5,
    reviewsCount: 91,
    image:
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Premium dual-sided vegan leather desk pad. Highly durable, water-resistant, and easy to clean, adding a professional look to your desktop.",
    isNew: true,
  },
  {
    id: "u13",
    name: "Sleek Desk Pencil Organizer",
    category: "Utilities",
    price: 34.99,
    rating: 4.6,
    reviewsCount: 42,
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Anodized aluminum desk pencil holder with a weighted base. Sleek chamfered edges and partition walls to organize your premium writing tools.",
  },
  {
    id: "u14",
    name: "Mag-Grip Desk Cable Holder",
    category: "Utilities",
    price: 24.5,
    rating: 4.8,
    reviewsCount: 95,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Keep your cords from sliding off the desk. Premium matte silicone weight with magnetic collar pieces that snap your charging cables securely in place.",
  },
  {
    id: "u15",
    name: "Hydro-Mister Humidifier",
    category: "Utilities",
    price: 59,
    rating: 4.5,
    reviewsCount: 74,
    image:
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Ultrasonic cool mist humidifier with a water tank and soft warm ambient glow. Runs silently for up to 8 hours to maintain perfect humidity at your desk.",
    isNew: true,
  },
  {
    id: "u16",
    name: "Minimalist Card Wallet",
    category: "Utilities",
    price: 45,
    rating: 4.7,
    reviewsCount: 156,
    image:
      "https://images.unsplash.com/photo-1627124718515-47fe26816041?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Slim RFID-blocking card sleeve handcrafted from premium Crazy Horse leather. Holds up to 6 cards and cash without adding bulk to your pocket.",
  },
  {
    id: "u17",
    name: "Tactile Brass Pen",
    category: "Utilities",
    price: 69,
    rating: 4.9,
    reviewsCount: 104,
    image:
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Precision bolt-action pen machined from solid brass. Develops a unique, beautiful patina over time with daily use. Takes standard Schmidt refills.",
    isPopular: true,
  },
  {
    id: "u18",
    name: "Smart-Lock Bike U-Bar",
    category: "Utilities",
    price: 139.99,
    rating: 4.8,
    reviewsCount: 52,
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Keep your bicycle secure with keyless convenience. Biometric fingerprint scanner unlocks the heavy-duty hardened steel shackle in under 0.5 seconds.",
    isNew: true,
  },
  {
    id: "u19",
    name: "Nano-Suction Phone Stand",
    category: "Utilities",
    price: 32,
    rating: 4.6,
    reviewsCount: 63,
    image:
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "An aluminum desk stand utilizing microscopic nano-suction pads to grip your phone securely without magnets, adhesives, or mechanical clamps.",
  },
  {
    id: "u20",
    name: "Ultra-Grip Phone Case",
    category: "Utilities",
    price: 29.99,
    rating: 4.7,
    reviewsCount: 88,
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Minimalist phone case featuring high-grip textured side rails and a bio-degradable eco-shell structure. MagSafe compatible rings embedded.",
  },
  {
    id: "u21",
    name: "Lumina LED Desk Lamp",
    category: "Utilities",
    price: 95,
    rating: 4.8,
    reviewsCount: 47,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Space-saving desk clamp light with an adjustable goose-neck and dual ambient backlighting. Reduces eye fatigue by balancing desktop contrast.",
  },
  {
    id: "u22",
    name: "Sound-Dampening Desk Pad",
    category: "Utilities",
    price: 49,
    rating: 4.5,
    reviewsCount: 119,
    image:
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Extra large sound-absorbing desk mat made from thick recycled wool felt. Dampens mechanical keyboard sound while providing soft, warm support.",
  },
  {
    id: "j1",
    name: "Aura Gold Bangle",
    category: "Jewellery",
    price: 145,
    rating: 4.8,
    reviewsCount: 92,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A stunning, stackable bangle crafted in 18k gold vermeil. Features a sleek, minimalist silhouette that adds a touch of understated elegance.",
    isPopular: true,
  },
  {
    id: "j2",
    name: "Celestial Diamond Ring",
    category: "Jewellery",
    price: 499,
    rating: 4.9,
    reviewsCount: 64,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A conflict-free brilliant-cut diamond set in solid 14k white gold. Featuring a celestial starburst engraving that catches light beautifully.",
    isNew: true,
  },
  {
    id: "j3",
    name: "Lunar Pearl Earrings",
    category: "Jewellery",
    price: 120,
    rating: 4.7,
    reviewsCount: 78,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Elegant drop earrings featuring natural baroque freshwater pearls suspended from polished sterling silver french ear wires.",
  },
  {
    id: "j4",
    name: "Solar Medallion Necklace",
    category: "Jewellery",
    price: 175,
    rating: 4.8,
    reviewsCount: 114,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "An embossed sun emblem medallion pendant hanging from a sturdy curb chain. Handcrafted in 18k gold vermeil over sterling silver.",
    isPopular: true,
  },
  {
    id: "j5",
    name: "Zenith Silver Cuff",
    category: "Jewellery",
    price: 135,
    rating: 4.6,
    reviewsCount: 53,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A wide, hand-hammered open cuff bracelet crafted from high-quality 925 sterling silver, providing a raw textured and striking design.",
  },
  {
    id: "j6",
    name: "Solitaire Emerald Studs",
    category: "Jewellery",
    price: 250,
    rating: 4.8,
    reviewsCount: 42,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Stunning princess-cut green Colombian emeralds set in solid 14k yellow gold four-prong baskets. Features secure threaded screw backings.",
  },
  {
    id: "j7",
    name: "Dune Textured Ring",
    category: "Jewellery",
    price: 195,
    rating: 4.7,
    reviewsCount: 36,
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "An organic, sand-cast wedding band style ring crafted from solid 14k yellow gold, featuring a unique shifting dunes ripple texture.",
  },
  {
    id: "j8",
    name: "Horizon Chain Bracelet",
    category: "Jewellery",
    price: 110,
    rating: 4.5,
    reviewsCount: 89,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A modern paperclip link chain bracelet. Perfect for layering or wearing solo. Handcrafted in heavy 18k gold plating over sterling silver.",
    isNew: true,
  },
  {
    id: "j9",
    name: "Aurora Opal Pendant",
    category: "Jewellery",
    price: 220,
    rating: 4.9,
    reviewsCount: 71,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A fire Ethiopian opal prong-set in 14k rose gold on a delicate link chain. The opal shifts hues with movement, mirroring the northern lights.",
  },
  {
    id: "j10",
    name: "Stellar Star Huggies",
    category: "Jewellery",
    price: 85,
    rating: 4.6,
    reviewsCount: 121,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Delicate hoop earrings featuring diamond-paved starburst drop charms. Made from 925 sterling silver with rhodium anti-tarnish plating.",
    isPopular: true,
  },
  {
    id: "j11",
    name: "Driftwood Hoop Earrings",
    category: "Jewellery",
    price: 95,
    rating: 4.7,
    reviewsCount: 54,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Classic hoops textured with an organic driftwood grain pattern. Handcrafted in solid polished sterling silver with a satin interior polish.",
  },
  {
    id: "j12",
    name: "Trinity Band Set",
    category: "Jewellery",
    price: 160,
    rating: 4.8,
    reviewsCount: 63,
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A set of three stackable bands in yellow gold, rose gold, and silver. Features a subtle braided pattern for a cohesive, classic styling.",
    isNew: true,
  },
  {
    id: "j13",
    name: "Vermeil Arch Pendant",
    category: "Jewellery",
    price: 155,
    rating: 4.7,
    reviewsCount: 46,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "An elegant, clean-lined arch pendant necklace inspired by architectural arches. Handcrafted in heavy 18k gold plating over sterling silver.",
  },
  {
    id: "j14",
    name: "Helix Silver Ear Cuff",
    category: "Jewellery",
    price: 48,
    rating: 4.6,
    reviewsCount: 120,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A minimalist helix wrap-around ear cuff requiring no piercing. Gently hugs the outer cartilage for a chic, modern layered look.",
    isNew: true,
  },
  {
    id: "j15",
    name: "Sienna Amber Ring",
    category: "Jewellery",
    price: 110,
    rating: 4.8,
    reviewsCount: 31,
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A striking ring centering a polished cabochon of genuine Baltic amber. The sterling silver bezel features delicate sand-cast texturing.",
  },
  {
    id: "j16",
    name: "Cascade Drop Earrings",
    category: "Jewellery",
    price: 215,
    rating: 4.9,
    reviewsCount: 57,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Multi-stone cascading drop earrings featuring small aquamarine and clear quartz beads linked by fine gold fill wires.",
    isPopular: true,
  },
  {
    id: "j17",
    name: "Infinity Link Choker",
    category: "Jewellery",
    price: 185,
    rating: 4.7,
    reviewsCount: 84,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A chunky, statement-making interlocked infinity link choker. Crafted in gold vermeil, it sits flat along the collarbone.",
  },
  {
    id: "j18",
    name: "Solstice Diamond Studs",
    category: "Jewellery",
    price: 350,
    rating: 4.9,
    reviewsCount: 49,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Lab-grown brilliant-cut round diamonds set in a star-cut yellow gold backing, giving the illusion of a glowing starburst.",
    isNew: true,
  },
  {
    id: "j19",
    name: "Lotus Petal Ring",
    category: "Jewellery",
    price: 95,
    rating: 4.6,
    reviewsCount: 73,
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Delicate overlapping silver petal ring inspired by the lotus flower. High-polish inner band with a softly satin-finished exterior petal face.",
  },
  {
    id: "j20",
    name: "Nova Gold Anklet",
    category: "Jewellery",
    price: 75,
    rating: 4.5,
    reviewsCount: 68,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A delicate gold-filled anklet carrying five tiny star-cut charms that catch light as you walk. Perfect for sunny beach summer look.",
  },
  {
    id: "j21",
    name: "Elysian Pearl Choker",
    category: "Jewellery",
    price: 180,
    rating: 4.8,
    reviewsCount: 92,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A row of hand-selected freshwater pearls strung on a silk cord. Completed with an elegant architectural gold vermeil bar toggle clasp.",
    isPopular: true,
  },
  {
    id: "j22",
    name: "Lumina Wave Bangle",
    category: "Jewellery",
    price: 145,
    rating: 4.7,
    reviewsCount: 110,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Sleek undulating sterling silver bangle mimicking ocean wave crests. Features a spring hinge and a secure push button clasp.",
    isNew: true,
  },
  {
    id: "d1",
    name: "Aura Silk Wrap Dress",
    category: "Dresses",
    price: 189.5,
    rating: 4.7,
    reviewsCount: 118,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Flowing elegance designed to capture attention. Made from organic mulberry silk, the Aura Wrap Dress features an adjustable waist tie and a soft sheen that adapts beautifully.",
    isPopular: true,
  },
  {
    id: "d2",
    name: "Linen Summer Sundress",
    category: "Dresses",
    price: 95,
    rating: 4.6,
    reviewsCount: 52,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Stay cool and stylish all summer. Crafted from 100% organic pre-washed linen, featuring a button-down front, handy side pockets, and comfortable wide shoulder straps.",
    isNew: true,
  },
  {
    id: "d3",
    name: "Velvet Gala Gown",
    category: "Dresses",
    price: 280,
    rating: 4.9,
    reviewsCount: 88,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A formal floor-length gown cut from heavy, plush velvet. Designed with an elegant off-the-shoulder wrap neckline and a dramatic leg slit.",
    isPopular: true,
  },
  {
    id: "d4",
    name: "Dune Cotton Midi",
    category: "Dresses",
    price: 125,
    rating: 4.7,
    reviewsCount: 61,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A comfortable tiered midi dress crafted from textured double-gauze organic cotton. Features adjustable spaghetti straps and a smocked back panel.",
  },
  {
    id: "d5",
    name: "Solana Knit Dress",
    category: "Dresses",
    price: 110,
    rating: 4.6,
    reviewsCount: 44,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A flattering ribbed halter maxi dress knit from soft modal. Features a high neckline, open back styling, and a straight column silhouette.",
    isNew: true,
  },
  {
    id: "d6",
    name: "Celeste Slip Dress",
    category: "Dresses",
    price: 140,
    rating: 4.8,
    reviewsCount: 97,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A classic bias-cut satin slip midi dress that hugs curves beautifully. Features a cowled neckline and delicate crossover adjustable back straps.",
  },
  {
    id: "d7",
    name: "Meadow Floral Smock",
    category: "Dresses",
    price: 115,
    rating: 4.5,
    reviewsCount: 38,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Vintage floral print smock dress featuring a fitted smocked bodice, sweetheart neckline, and voluminous short puff sleeves.",
  },
  {
    id: "d8",
    name: "Riviera Linen Shirtdress",
    category: "Dresses",
    price: 130,
    rating: 4.7,
    reviewsCount: 79,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A relaxed utility-style linen shirtdress. Features a full button-down front placket, optional matching waist tie, and chest patch pockets.",
    isPopular: true,
  },
  {
    id: "d9",
    name: "Zenith Pleated Maxi",
    category: "Dresses",
    price: 210,
    rating: 4.8,
    reviewsCount: 56,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A stunning accordion-pleated georgette maxi dress featuring a high halter neck and a keyhole back opening. Flows beautifully with step movement.",
  },
  {
    id: "d10",
    name: "Dahlia Tulle Gown",
    category: "Dresses",
    price: 240,
    rating: 4.9,
    reviewsCount: 73,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A magical midi cocktail dress made from layers of soft pleated tulle, featuring a structured built-in corset bodice for an hourglass silhouette.",
    isNew: true,
  },
  {
    id: "d11",
    name: "Horizon Ribbed Midi",
    category: "Dresses",
    price: 85,
    rating: 4.6,
    reviewsCount: 110,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A casual, sporty bodycon midi dress knit in thick ribbed cotton. Designed with a scoop neckline and racerback details for daily wear comfort.",
  },
  {
    id: "d12",
    name: "Oasis Poplin Dress",
    category: "Dresses",
    price: 120,
    rating: 4.7,
    reviewsCount: 65,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "An easy everyday dress cut from crisp organic cotton poplin. Features a tiered midi skirt, elasticated square neckline, and side seam pockets.",
    isNew: true,
  },
  {
    id: "d13",
    name: "Luna Satin Midi Dress",
    category: "Dresses",
    price: 165,
    rating: 4.8,
    reviewsCount: 74,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Understated elegance. Fluid bias-cut midi slip dress featuring a deep cowl front neckline and cross-back spaghetti straps.",
    isNew: true,
  },
  {
    id: "d14",
    name: "Flora Puff Sleeve Dress",
    category: "Dresses",
    price: 135,
    rating: 4.6,
    reviewsCount: 82,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Romantic cottagecore midi dress in an all-over delicate wild-flower print. Structured corset-laced bodice with puffy short sleeves.",
  },
  {
    id: "d15",
    name: "Serene Linen Midi",
    category: "Dresses",
    price: 110,
    rating: 4.7,
    reviewsCount: 94,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "An easy-going summer dress in organic, breathable linen. Features adjustable tie shoulder straps and a comfortable smocked back.",
    isPopular: true,
  },
  {
    id: "d16",
    name: "Elysian Velvet Cocktail",
    category: "Dresses",
    price: 195,
    rating: 4.9,
    reviewsCount: 63,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Deep emerald green velvet cocktail dress designed to fit and flare. Featuring an elegant sweetheart neckline and structured internal cups.",
    isNew: true,
  },
  {
    id: "d17",
    name: "Oasis Knit Sundress",
    category: "Dresses",
    price: 120,
    rating: 4.5,
    reviewsCount: 51,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A breathable, semi-sheer crochet knit maxi dress with a solid slip liner. Sleek round neck and a low, open scoop-back design.",
  },
  {
    id: "d18",
    name: "Stella Sequined Gown",
    category: "Dresses",
    price: 295,
    rating: 4.9,
    reviewsCount: 42,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Dazzling floor-length evening gown fully embellished with miniature hand-sewn sequins that catch light with every turn.",
    isPopular: true,
  },
  {
    id: "d19",
    name: "Dahlia Georgette Wrap",
    category: "Dresses",
    price: 145,
    rating: 4.7,
    reviewsCount: 68,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A romantic floral georgette wrap midi dress featuring delicate flutter sleeves and a ruffled high-low wrap hemline.",
  },
  {
    id: "d20",
    name: "Sienna Linen Shirtdress",
    category: "Dresses",
    price: 125,
    rating: 4.6,
    reviewsCount: 59,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "Minimalist utility shirtdress in midweight terracotta linen. Designed with a clean hidden button placket and roll-cuff long sleeves.",
    isNew: true,
  },
  {
    id: "d21",
    name: "Amara Tiered Maxi",
    category: "Dresses",
    price: 130,
    rating: 4.7,
    reviewsCount: 87,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A breezy tiered cotton maxi dress in a soft washed olive hue. Features a gathered halter tie neck and a sweeping voluminous skirt.",
  },
  {
    id: "d22",
    name: "Vesper Satin Slip",
    category: "Dresses",
    price: 150,
    rating: 4.8,
    reviewsCount: 112,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    video: "/assets/videos/demoVideo.mp4",
    description:
      "A heavy-weight satin slip dress in a warm rose gold shade. Bias-cut to drape the body beautifully with clean french seams.",
    isPopular: true,
  },
];
