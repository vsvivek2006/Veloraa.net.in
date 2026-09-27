// src/data/products.ts
// Complete product catalog matching Veloraa frontpage and collections

export interface Variant {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  price: number;
  compareAtPrice: number;
  discountPercent: number;
  images: string[];
  variants: Variant[];
  includes: string[];
  description: string;
  features: string[];
}

export interface VideoReel {
  id: string;
  videoUrl: string;
  title: string;
  author: string;
  verified: boolean;
  views: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  city: string;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface FAQ {
  q: string;
  a: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "JUST FOR YOU | 5-in-1 Ultimate Combo | VPods Pro 2 (2nd Gen) ANC + MagSafe 5000mAh Powerbank + 4-in-1 Fast Charging Cable + Silicone Case + Sticky Pod",
    handle: "5-in-1-ultimate-combo",
    badge: "5-in-1 Combo",
    rating: 4.9,
    reviewCount: 1842,
    price: 1299,
    compareAtPrice: 2299,
    discountPercent: 43,
    images: [
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_4_2026_at_01_35_25_AM.png?v=1783109171&width=533",
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/combo_img-_3.png?v=1771663350&width=533",
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/IMG_7313.webp?v=1756874155&width=533",
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/IMG_7312.webp?v=1756874155&width=533"
    ],
    variants: [
      { id: "v1-1", title: "Standard ANC / 5-in-1 Combo", price: 1299, compareAtPrice: 2299 },
      { id: "v1-2", title: "Superior Premium ANC / 5-in-1 Combo", price: 1599, compareAtPrice: 2499 }
    ],
    includes: [
      "VPods Pro 2 (2nd Gen) ANC Earbuds",
      "5000mAh MagSafe Wireless Powerbank",
      "4-in-1 Fast Charging Cable",
      "Silicone Protective Case",
      "Sticky Pod Mobile Mount"
    ],
    description: "Get the complete gadget ecosystem in one power-packed bundle. Featuring the bestselling VPods Pro 2 with real Active Noise Cancellation, paired with a compact 5000mAh MagSafe battery pack for on-the-go snap-and-charge convenience.",
    features: [
      "Active Noise Cancellation & Transparency Mode",
      "Up to 30 Hours Total Battery Backup with Case",
      "Strong MagSafe Magnetic Alignment",
      "Universal Compatibility: iOS & Android",
      "100% Replacement Warranty & Free Delivery"
    ]
  },
  {
    id: "2",
    title: "Ultimate Combo | VPods Pro 2 (2nd Gen) ANC + MagSafe 10000mAh Powerbank + 4-in-1 Fast Charging Cable + Silicone Case + Sticky Pod",
    handle: "ultimate-combo-10000mah",
    badge: "10,000mAh Edition",
    rating: 4.9,
    reviewCount: 1260,
    price: 1499,
    compareAtPrice: 2299,
    discountPercent: 35,
    images: [
      "https://www.veloraa.co.in/cdn/shop/files/ChatGPT_Image_Jul_4_2026_at_01_35_25_AM.png?v=1783109171&width=1946",
      "https://www.veloraa.co.in/cdn/shop/files/ChatGPT_Image_Jul_4_2026_at_01_35_17_AM.png?v=1783109171&width=1946",
      "https://www.veloraa.co.in/cdn/shop/files/Zexxus_Creatives-13.png?v=1772452869&width=1946",
      "https://www.veloraa.co.in/cdn/shop/files/sdw_1296x1296_97071c39-db28-46d3-8e92-8ee87ea4c7ff.webp?v=1772452869&width=1946",
      "https://www.veloraa.co.in/cdn/shop/files/wirelesschargerboldacc_1024x1024_2x_1296x1296_1adf6364-b8ba-4da5-959a-95826b0c88cd.webp?v=1772452869&width=1946",
      "https://www.veloraa.co.in/cdn/shop/files/Gray_Orange_Minimalist_Product_Combo_Fashion_Instagram_Post-25.png?v=1772452869&width=1946",
      "https://www.veloraa.co.in/cdn/shop/files/Untitled_design-30.png?v=1772452869&width=1946",
      "https://www.veloraa.co.in/cdn/shop/files/61goZoq-rVL._SL1500.jpg?v=1772452869&width=1946",
      "https://www.veloraa.co.in/cdn/shop/files/Gray_Orange_Minimalist_Product_Combo_Fashion_Instagram_Post-26.png?v=1772452869&width=1946",
      "https://www.veloraa.co.in/cdn/shop/files/Gray_Orange_Minimalist_Product_Combo_Fashion_Instagram_Post-24.png?v=1772452869&width=1946",
      "https://www.veloraa.co.in/cdn/shop/files/Gray_Orange_Minimalist_Product_Combo_Fashion_Instagram_Post-27.png?v=1772452901&width=1946",
      "https://www.veloraa.co.in/cdn/shop/files/30_82cace85-a82b-41f2-8789-898585e021c2.png?v=1772452869&width=1946"
    ],
    variants: [
      { id: "v2-1", title: "Standard ANC / 5-in-1 Combo", price: 1499, compareAtPrice: 2299 },
      { id: "v2-2", title: "Superior Premium ANC / 5-in-1 Combo", price: 1799, compareAtPrice: 2599 }
    ],
    includes: [
      "VPods Pro 2 (2nd Gen) ANC Earbuds",
      "10,000mAh Heavy Duty MagSafe Wireless Powerbank",
      "4-in-1 Fast Charging Cable",
      "Silicone Protective Case",
      "Sticky Pod Mobile Mount"
    ],
    description: "Double the battery capacity with our flagship 10,000mAh MagSafe Powerbank. Ideal for heavy travelers and power users who need all-day backup for their smartphone and wireless earbuds.",
    features: [
      "Massive 10,000mAh Capacity",
      "Fast 15W Wireless + 20W PD Wired Output",
      "Crystal Clear Bass & Punchy Sound Output",
      "Instant Pop-up Connection Window",
      "1 Year Replacement Warranty"
    ]
  },
  {
    id: "3",
    title: "Watch Series 10 | Free Pro 2nd Generation ANC | (Type-C) 100% Hassle-Free Warranty",
    handle: "watch-series-10-free-pro-2nd-gen",
    badge: "Watch + Free AirPods",
    rating: 4.8,
    reviewCount: 940,
    price: 1899,
    compareAtPrice: 2299,
    discountPercent: 17,
    images: [
      "https://www.veloraa.co.in/cdn/shop/files/Gray_Orange_Minimalist_Product_Combo_Fashion_Instagram_Post-19.png?v=1771663350&width=533",
      "https://www.veloraa.co.in/cdn/shop/files/Zexxus_Creatives-11_09225aaa-1fff-450b-999a-06145562a0a2.png?v=1756874155&width=533"
    ],
    variants: [
      { id: "v3-1", title: "Jet Black / Standard ANC / Series 10 + Pro 2", price: 1899, compareAtPrice: 2299 },
      { id: "v3-2", title: "Jet Black / Superior Premium ANC / Series 10 + Pro 2", price: 2199, compareAtPrice: 2599 },
      { id: "v3-3", title: "Rose Gold / Standard ANC / Series 10 + Pro 2", price: 1899, compareAtPrice: 2299 },
      { id: "v3-4", title: "Rose Gold / Superior Premium ANC / Series 10 + Pro 2", price: 2199, compareAtPrice: 2599 }
    ],
    includes: [
      "VelorAa Watch Series 10 Smartwatch",
      "FREE VPods Pro 2nd Gen ANC Earbuds",
      "Wireless Magnetic Watch Charger",
      "Silicone Alpine Loop Strap",
      "Type-C Charging Cable"
    ],
    description: "Buy the Watch Series 10 and get the VPods Pro 2nd Gen Earbuds 100% FREE! Complete with HD AMOLED display, Bluetooth calling, health tracking, and premium titanium-style chassis.",
    features: [
      "2.02\" Edge-to-Edge HD Curved Screen",
      "Bluetooth Calling & Contact Sync",
      "Heart Rate, SpO2 & Sleep Tracking",
      "Water & Sweat Resistant IP68"
    ]
  },
  {
    id: "4",
    title: "VelorAa Watch 10 [GPS + Cellular 49 mm] smart watch",
    handle: "veloraa-watch-10-smartwatch",
    badge: "Series 10",
    rating: 4.8,
    reviewCount: 420,
    price: 1399,
    compareAtPrice: 4999,
    discountPercent: 72,
    images: [
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/Zexxus_Creatives-11_09225aaa-1fff-450b-999a-06145562a0a2.png?v=1756874155&width=533",
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/IMG_7313.webp?v=1756874155&width=533"
    ],
    variants: [
      { id: "v4-1", title: "Jet Black", price: 1399, compareAtPrice: 4999 },
      { id: "v4-2", title: "Silver White", price: 1399, compareAtPrice: 4999 }
    ],
    includes: [
      "VelorAa Watch 10 Smartwatch",
      "Magnetic Fast Charger",
      "Alpine Loop Band"
    ],
    description: "The next-generation smart wearable with high-resolution edge display, Bluetooth calling, fitness modes, and 3-day battery backup.",
    features: [
      "Bluetooth Calling with Mic & Speaker",
      "Blood Oxygen & Heart Rate Sensor",
      "Multiple Sports Tracking Modes",
      "Wireless Fast Magnetic Charging"
    ]
  },
  {
    id: "5",
    title: "VelorAa MagSafe Battery Pack Wireless Power Bank",
    handle: "veloraa-magsafe-battery-pack",
    badge: "MagSafe",
    rating: 4.7,
    reviewCount: 420,
    price: 1199,
    compareAtPrice: 3099,
    discountPercent: 61,
    images: [
      "https://www.veloraa.co.in/cdn/shop/files/Zexxus_Creatives-11_5841b3f6-a4a9-44b2-9961-d367e8370246.png?v=1756873695&width=533",
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/IMG_7313.webp?v=1756874155&width=533"
    ],
    variants: [
      { id: "v5-1", title: "5000mAh White", price: 1199, compareAtPrice: 3099 }
    ],
    includes: [
      "VelorAa MagSafe Battery Pack",
      "Type-C Charging Cable"
    ],
    description: "Snaps on in an instant. Compact, intuitive design makes on-the-go charging effortless. Perfectly aligned magnets keep it attached to your iPhone for secure wireless charging.",
    features: [
      "N52 Strong Rare-Earth Magnets",
      "15W Wireless Qi Fast Charging",
      "Slim Pocket-Friendly Profile"
    ]
  },
  {
    id: "6",
    title: "VelorAa Watch Ultra [GPS + Cellular 49 mm] smart watch",
    handle: "veloraa-watch-ultra-49mm",
    badge: "Ultra 49mm",
    rating: 4.8,
    reviewCount: 612,
    price: 1399,
    compareAtPrice: 4999,
    discountPercent: 72,
    images: [
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/Zexxus_Creatives-15.png?v=1756873864&width=533",
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/IMG_6976.webp?v=1756873864&width=533",
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/IMG_6975.webp?v=1756873864&width=533"
    ],
    variants: [
      { id: "v6-1", title: "Orange Ocean Band", price: 1399, compareAtPrice: 4999 },
      { id: "v6-2", title: "White Alpine Loop", price: 1399, compareAtPrice: 4999 },
      { id: "v6-3", title: "Olive Trail Loop", price: 1399, compareAtPrice: 4999 }
    ],
    includes: [
      "VelorAa Watch Ultra 49mm",
      "Rugged Sports Loop Band",
      "Fast Magnetic Wireless Charger"
    ],
    description: "Built for outdoor adventures and intense workouts. 49mm aerospace-grade titanium-look case, sapphire crystal glass, customizable Action button, and multi-day battery endurance.",
    features: [
      "Bright 2.1-inch 500-nit Retina Display",
      "Orange Action Button for One-Touch Trigger",
      "Real-Time Heart Rate & Blood Oxygen Monitor"
    ]
  },
  {
    id: "7",
    title: "VelorAa Foldaway 3-In-1 Magnetic MagSafe Wireless Charger",
    handle: "veloraa-foldaway-3-in-1-charger",
    badge: "3-in-1 Foldaway",
    rating: 4.9,
    reviewCount: 350,
    price: 1699,
    compareAtPrice: 3499,
    discountPercent: 51,
    images: [
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/24.png?v=1736497226&width=533"
    ],
    variants: [
      { id: "v7-1", title: "Foldaway Black", price: 1699, compareAtPrice: 3499 }
    ],
    includes: [
      "Foldaway 3-in-1 Charging Dock",
      "USB-C Fast Cable",
      "Travel Pouch"
    ],
    description: "Charge your Phone, Apple Watch, and AirPods simultaneously on a single sleek folding stand. Folds flat to fit in any pocket or laptop bag.",
    features: [
      "Simultaneous 3-Device Charging",
      "Adjustable Viewing Angles for StandBy Mode",
      "Compact Foldable Silicone Design"
    ]
  },
  {
    id: "8",
    title: "Vpods Pro 2nd Gen - USA Quality (ANC, PopUp Window, Working Serial Number, OG Box with MRP) 1-Yr Warranty & 15-Day Returns - Type C",
    handle: "vpods-pro-2nd-gen-usa-quality",
    badge: "USA Quality",
    rating: 4.9,
    reviewCount: 890,
    price: 1249,
    compareAtPrice: 2299,
    discountPercent: 45,
    images: [
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/combo_img-_3.png?v=1771663350&width=533"
    ],
    variants: [
      { id: "v8-1", title: "Standard ANC", price: 1249, compareAtPrice: 2299 },
      { id: "v8-2", title: "Superior Premium ANC", price: 1549, compareAtPrice: 2499 }
    ],
    includes: [
      "VPods Pro 2nd Gen Earbuds",
      "MagSafe Charging Case (Type-C)",
      "Silicone Ear Tips (XS, S, M, L)",
      "Type-C Braided Cable"
    ],
    description: "100% Top-tier USA Quality build with real Active Noise Cancellation, transparent audio pass-through, working pop-up window, and original box packaging.",
    features: [
      "Real Active Noise Cancellation & Transparency",
      "H1 Chipset Pop-up Window",
      "MagSafe Wireless Case with Speaker & Lanyard Loop"
    ]
  },
  {
    id: "9",
    title: "VPods Max (ANC)",
    handle: "vpods-max-anc",
    badge: "AirPods Max Look",
    rating: 4.9,
    reviewCount: 780,
    price: 2699,
    compareAtPrice: 5999,
    discountPercent: 55,
    images: [
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/17_54a778e2-9a47-4110-8a2a-70d80dd0230a.png?v=1756873500&width=533",
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/combo_img-_3.png?v=1771663350&width=533"
    ],
    variants: [
      { id: "v9-1", title: "Silver / Standard ANC", price: 2699, compareAtPrice: 5999 },
      { id: "v9-2", title: "Silver / OG - Superior Premium ANC", price: 3299, compareAtPrice: 6999 },
      { id: "v9-3", title: "Space Black / Standard ANC", price: 2699, compareAtPrice: 5999 },
      { id: "v9-4", title: "Sky Blue / Standard ANC", price: 2699, compareAtPrice: 5999 }
    ],
    includes: [
      "VPods Max Over-Ear Headphones",
      "Smart Magnetic Storage Case",
      "Type-C Audio Cable"
    ],
    description: "High-fidelity audio combined with industry-leading Active Noise Cancellation. Featuring breathable knit mesh canopy and memory foam acoustic ear cushions.",
    features: [
      "40mm Custom Dynamic Drivers",
      "Spatial Audio with Dynamic Head Tracking",
      "Digital Crown Volume & Playback Control"
    ]
  },
  {
    id: "10",
    title: "Extended Warranty (2 Years)",
    handle: "extended-warranty-2-years",
    badge: "Warranty",
    rating: 5.0,
    reviewCount: 2100,
    price: 99,
    compareAtPrice: 499,
    discountPercent: 80,
    images: [
      "https://cdn.shopify.com/s/files/1/0884/6606/3678/files/combo_img-_3.png?v=1771663350&width=533"
    ],
    variants: [
      { id: "v10-1", title: "2-Year Full Coverage", price: 99, compareAtPrice: 499 }
    ],
    includes: ["Instant Doorstep Replacement Guarantee"],
    description: "Covers mechanical, electronic, and battery failure with instant no-questions-asked replacement.",
    features: ["No Repair Delays - Direct Replacement", "Covers Battery & Audio Drivers"]
  }
];

export const VIDEO_REELS: VideoReel[] = [
  {
    id: "reel-1",
    videoUrl: "https://cdn.shopify.com/videos/c/o/v/ea79f6ffe6904256a6744f7e79a5d140.mp4",
    title: "5-in-1 Ultimate Combo Unboxing",
    author: "Rahul M. (Delhi)",
    verified: true,
    views: "42.8K"
  },
  {
    id: "reel-2",
    videoUrl: "https://cdn.shopify.com/videos/c/o/v/3f76cfffe66a46cfb6df6b7560ca9703.mp4",
    title: "Watch Series 10 AMOLED Screen Test",
    author: "Aakash S. (Bangalore)",
    verified: true,
    views: "38.1K"
  },
  {
    id: "reel-3",
    videoUrl: "https://cdn.shopify.com/videos/c/o/v/91d89a2103c84f2f85df54115f3bcb23.mp4",
    title: "VPods Pro ANC Bass Test 🔥",
    author: "Pooja K. (Mumbai)",
    verified: true,
    views: "64.2K"
  },
  {
    id: "reel-4",
    videoUrl: "https://cdn.shopify.com/videos/c/o/v/d2ef613c759b48d5af44ecd17c519d07.mp4",
    title: "MagSafe Powerbank Grip Check",
    author: "Vikram T. (Hyderabad)",
    verified: true,
    views: "29.4K"
  },
  {
    id: "reel-5",
    videoUrl: "https://cdn.shopify.com/videos/c/o/v/51021ddde2b947a6b9dd88e8bd265a56.mp4",
    title: "Watch Ultra Calling & Mic Quality",
    author: "Gaurav R. (Pune)",
    verified: true,
    views: "51.0K"
  },
  {
    id: "reel-6",
    videoUrl: "https://cdn.shopify.com/videos/c/o/v/2c84065e70144af290f96dd788b73dba.mp4",
    title: "Unboxing the 5-in-1 Combo at ₹1499",
    author: "Harsh P. (Ahmedabad)",
    verified: true,
    views: "82.5K"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Manish Sharma",
    rating: 5,
    city: "Jaipur, Rajasthan",
    date: "2 days ago",
    title: "Paisa Vasool Combo! Unbelievable Quality",
    comment: "Ordered the 5-in-1 combo with prepaid ₹200 discount. Got delivery in 2 days via Delhivery. Earbuds ANC is shockingly good and the MagSafe powerbank snaps firmly on my phone.",
    verified: true
  },
  {
    id: "r2",
    name: "Arun Patel",
    rating: 5,
    city: "Surat, Gujarat",
    date: "3 days ago",
    title: "Watch 10 + Free AirPods deal is crazy",
    comment: "I couldn't believe I got both the smartwatch and ANC earbuds for ₹1899. Calling quality is loud and clear. Battery lasts 2 full days easily.",
    verified: true
  },
  {
    id: "r3",
    name: "Deepika Nair",
    rating: 5,
    city: "Kochi, Kerala",
    date: "5 days ago",
    title: "Best purchase for travel",
    comment: "The 10,000mAh combo is an absolute lifesaver during train journeys. Everything comes in high quality packaging with warranty card.",
    verified: true
  },
  {
    id: "r4",
    name: "Rohan Gupta",
    rating: 5,
    city: "Gurugram, Haryana",
    date: "1 week ago",
    title: "Better than Apple original price!",
    comment: "VPods Max sound output has deep bass. Active noise cancelling actually works in office noisy environment. 10/10 recommend.",
    verified: true
  }
];

export const FAQS: FAQ[] = [
  {
    q: "What is included in the 5-in-1 Ultimate Combo (₹1499)?",
    a: "The 5-in-1 Ultimate Combo includes: (1) VPods Pro 2 (2nd Gen) ANC Earbuds, (2) MagSafe Wireless Powerbank, (3) 4-in-1 Fast Braided Charging Cable, (4) Silicone Protective Case with Carabiner, and (5) Sticky Pod Mobile Suction Mount."
  },
  {
    q: "How long will my order take to arrive?",
    a: "Orders are processed immediately and shipped via premium express couriers (Delhivery, Bluedart, Shadowfax). Delivery typically takes 2–3 business days depending on your location."
  },
  {
    q: "How can I track my order?",
    a: "Once your order is dispatched, you will receive live SMS and WhatsApp tracking updates. You can also enter your Order ID or AWB on our dedicated /track-order page for real-time live tracking."
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept 100% secure online payments including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking with 256-bit SSL encryption. All prepaid orders receive an Instant ₹200 FLAT Discount + FREE Express Delivery."
  },
  {
    q: "What is the warranty and return policy?",
    a: "All products come with a 1-Year Replacement Warranty and 7 Days Hassle-Free Replacement if there are any technical or hardware defects. Replacements are processed automatically without tedious paperwork."
  },
  {
    q: "How is the sound quality and Active Noise Cancellation (ANC)?",
    a: "The earbuds feature high-fidelity audio with punchy bass (rated 9/10) and hardware-level ANC that cuts out ambient background noise like AC hum, traffic, and office chatter."
  }
];
