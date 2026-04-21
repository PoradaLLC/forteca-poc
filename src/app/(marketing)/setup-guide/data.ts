export type Product = {
  name: string;
  qty?: string;
  notes?: string;
  price?: string;
  href?: string;
  priority?: "essential" | "signature" | null;
};

export type Subsection = {
  title?: string;
  products: Product[];
};

export type Category = {
  slug: string;
  numeral: string;
  title: string;
  intro: string;
  subsections: Subsection[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "bathroom",
    numeral: "I.",
    title: "Bathroom",
    intro: "Spa-level standards. White cotton, wall-mounted dispensers, and the thoughtful details guests notice on arrival.",
    subsections: [
      {
        title: "Essentials",
        products: [
          {
            name: "Bathroom Mats (Cotton, Set of 2)",
            qty: "×2",
            price: "from $28",
            href: "https://www.amazon.com/s?k=cotton+bath+mat+set+non+slip&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Plunger & Toilet Brush Combo",
            price: "from $25",
            href: "https://www.amazon.com/s?k=toilet+plunger+brush+combo+set&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Bathroom Garbage Can (Modern)",
            price: "from $35",
            href: "https://www.amazon.com/s?k=bathroom+trash+can+step+modern&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Small Garbage Bags (4 Gallon)",
            price: "from $12",
            href: "https://www.amazon.com/s?k=small+trash+bags+4+gallon+bathroom&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Hair Dryer (Airbnb Grade)",
            price: "from $25",
            href: "https://www.amazon.com/s?k=hotel+hair+dryer+wall+mounted&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Dark Makeup Towels",
            notes: "Prevents stains on white linens",
            price: "from $15",
            href: "https://www.amazon.com/s?k=black+makeup+remover+towels+washcloths&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Septic System Sign",
            price: "from $12",
            href: "https://www.amazon.com/s?k=septic+system+toilet+sign+bathroom&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Soaps",
        products: [
          {
            name: "Body Wash Refill (Gallon)",
            price: "from $22",
            href: "https://www.amazon.com/s?k=body+wash+gallon+refill+hotel&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Shampoo Refill (Gallon)",
            price: "from $22",
            href: "https://www.amazon.com/s?k=shampoo+gallon+refill+hotel&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Conditioner Refill (Gallon)",
            price: "from $22",
            href: "https://www.amazon.com/s?k=conditioner+gallon+refill+hotel&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Hand Soap (Refillable)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=foaming+hand+soap+hotel+gallon&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Dispensers",
        products: [
          {
            name: "3-Chamber Shower Dispenser",
            price: "from $45",
            href: "https://www.amazon.com/s?k=shower+dispenser+wall+mounted+3+chamber+matte+black&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Hand Soap Dispenser (Matte Black)",
            price: "from $22",
            href: "https://www.amazon.com/s?k=hand+soap+dispenser+matte+black+pump&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Décor",
        products: [
          {
            name: "Tissue Box Cover (Wood)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=tissue+box+cover+wood+farmhouse&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Toilet-Top Storage Basket",
            price: "from $25",
            href: "https://www.amazon.com/s?k=toilet+top+storage+basket+wood&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
    ],
  },
  {
    slug: "bedrooms-king",
    numeral: "II.",
    title: "Bedrooms — King",
    intro: "Two complete sheet sets per bed. Waterproof protection beneath every pillow. Hotel-layered and guest-ready.",
    subsections: [
      {
        title: "Mattress Protection",
        products: [
          {
            name: "King Mattress Protector (Waterproof)",
            price: "from $45",
            href: "https://www.amazon.com/s?k=king+mattress+protector+waterproof+saferest&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Sheets",
        products: [
          {
            name: "King Fitted Sheets (White)",
            qty: "×2",
            price: "from $35",
            href: "https://www.amazon.com/s?k=king+fitted+sheet+white+deep+pocket+hotel&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "King Flat Sheets (White)",
            qty: "×2",
            price: "from $35",
            href: "https://www.amazon.com/s?k=king+flat+sheet+white+hotel&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Pillows",
        products: [
          {
            name: "King Pillows — Medium Firm",
            qty: "×2",
            notes: "2 per king bed",
            price: "from $28",
            href: "https://www.amazon.com/s?k=king+pillow+medium+firm+hotel+down+alternative&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "King Pillows — Soft",
            qty: "×2",
            notes: "2 per king bed",
            price: "from $25",
            href: "https://www.amazon.com/s?k=king+pillow+soft+down+alternative+hotel&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Comforter",
        products: [
          {
            name: "King Comforter (White)",
            price: "from $75",
            href: "https://www.amazon.com/s?k=king+comforter+white+all+season+down+alternative&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "bedrooms-queen",
    numeral: "III.",
    title: "Bedrooms — Queen",
    intro: "Queen-specific sizing — the workhorse of guest bedrooms. Same disciplined layering as the king.",
    subsections: [
      {
        title: "Mattress Protection",
        products: [
          {
            name: "Queen Mattress Protector",
            price: "from $40",
            href: "https://www.amazon.com/s?k=queen+mattress+protector+waterproof+saferest&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Sheets",
        products: [
          {
            name: "Queen Fitted Sheets (White)",
            qty: "×2",
            price: "from $32",
            href: "https://www.amazon.com/s?k=queen+fitted+sheet+white+deep+pocket+hotel&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Queen Flat Sheets (White)",
            qty: "×2",
            price: "from $32",
            href: "https://www.amazon.com/s?k=queen+flat+sheet+white+hotel&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Pillows",
        products: [
          {
            name: "Queen Pillows — Soft",
            qty: "×2",
            notes: "2 per queen bed",
            price: "from $22",
            href: "https://www.amazon.com/s?k=queen+pillow+soft+down+alternative+hotel&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Queen Pillows — Medium Firm",
            qty: "×2",
            notes: "2 per queen bed",
            price: "from $24",
            href: "https://www.amazon.com/s?k=queen+pillow+medium+firm+hotel+down+alternative&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Comforter",
        products: [
          {
            name: "Queen Comforter (White)",
            price: "from $65",
            href: "https://www.amazon.com/s?k=queen+comforter+white+all+season+down+alternative&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "bedrooms-full-double",
    numeral: "IV.",
    title: "Bedrooms — Full / Double",
    intro: "For secondary rooms and guest flexibility. Often the right size for teen rooms and smaller footprints.",
    subsections: [
      {
        title: "Mattress Protection",
        products: [
          {
            name: "Full Mattress Protector",
            price: "from $38",
            href: "https://www.amazon.com/s?k=full+mattress+protector+waterproof+saferest&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Sheets",
        products: [
          {
            name: "Full Sheet Set (White)",
            qty: "×2",
            price: "from $30",
            href: "https://www.amazon.com/s?k=full+sheet+set+white+hotel+mellanni&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Pillows",
        products: [
          {
            name: "Standard Pillows — Medium Firm",
            qty: "×2",
            notes: "2 per full bed",
            price: "from $28",
            href: "https://www.amazon.com/s?k=standard+pillow+medium+firm+down+alternative&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Standard Pillows — Soft",
            qty: "×2",
            notes: "2 per full bed",
            price: "from $22",
            href: "https://www.amazon.com/s?k=standard+pillow+soft+down+alternative&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Comforter",
        products: [
          {
            name: "Full/Queen Comforter (White)",
            price: "from $65",
            href: "https://www.amazon.com/s?k=full+queen+comforter+white+all+season&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "bedrooms-twin-bunk",
    numeral: "V.",
    title: "Bedrooms — Twin / Bunk",
    intro: "Twin and bunk setups unlock the family and multi-gen market — one of the highest-performing segments in the Poconos.",
    subsections: [
      {
        title: "Mattress Protection",
        products: [
          {
            name: "Twin Mattress Protector",
            qty: "×2",
            price: "from $30",
            href: "https://www.amazon.com/s?k=twin+mattress+protector+waterproof+saferest&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Sheets",
        products: [
          {
            name: "Twin Sheet Set (White)",
            qty: "×2",
            price: "from $25",
            href: "https://www.amazon.com/s?k=twin+sheet+set+white+hotel+deep+pocket&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Pillows",
        products: [
          {
            name: "Standard Twin Pillows",
            qty: "×2",
            notes: "1-2 per twin bed",
            price: "from $22",
            href: "https://www.amazon.com/s?k=standard+pillow+down+alternative+twin&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Comforter",
        products: [
          {
            name: "Twin Comforter (White)",
            price: "from $45",
            href: "https://www.amazon.com/s?k=twin+comforter+white+all+season&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Bunk Bed Ready",
        products: [
          {
            name: "Bunk Bed Safety Rail Set",
            notes: "Required for upper bunks",
            price: "from $35",
            href: "https://www.amazon.com/s?k=bunk+bed+safety+rail+kids&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Bedside Caddy / Organizer",
            qty: "×2",
            price: "from $18",
            href: "https://www.amazon.com/s?k=bedside+caddy+organizer+bunk+bed&tag=fortecaesta08-20",
          },
        ],
      },
    ],
  },
  {
    slug: "bedroom-styling",
    numeral: "VI.",
    title: "Bedroom Styling",
    intro: "Curated palettes for your primary suites. White-and-wood for the queen; olive-brown-white for the king.",
    subsections: [
      {
        title: "Queen Bedroom (White/Wood)",
        products: [
          {
            name: "Duvet Cover Set (White/Natural)",
            qty: "×2",
            price: "from $55",
            href: "https://www.amazon.com/s?k=duvet+cover+queen+white+natural+cotton&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Throw Pillow Covers (Neutral)",
            qty: "×2",
            price: "from $22",
            href: "https://www.amazon.com/s?k=throw+pillow+cover+neutral+natural+linen&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Throw Pillow Inserts",
            qty: "×2",
            price: "from $18",
            href: "https://www.amazon.com/s?k=throw+pillow+insert+18x18&tag=fortecaesta08-20",
          },
          {
            name: "Accent Lumbar Pillow",
            price: "from $25",
            href: "https://www.amazon.com/s?k=lumbar+throw+pillow+neutral+farmhouse&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Bench (Front of Bed)",
            notes: "Brown/natural wood",
            price: "from $150",
            href: "https://www.amazon.com/s?k=end+of+bed+bench+wood+natural&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Area Rug (Natural, 8x10)",
            price: "from $120",
            href: "https://www.amazon.com/s?k=area+rug+8x10+natural+jute+neutral&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "King Bedroom (Olive/Brown)",
        products: [
          {
            name: "Sheet Set (Olive/Brown/White)",
            qty: "×2",
            price: "from $60",
            href: "https://www.amazon.com/s?k=king+sheet+set+olive+brown+earth+tone&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Large Mirror (Wall/Standing)",
            price: "from $95",
            href: "https://www.amazon.com/s?k=large+bedroom+mirror+standing+wall+full+length&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Chunky Knit Throw Blanket",
            price: "from $45",
            href: "https://www.amazon.com/s?k=chunky+knit+throw+blanket+camel+olive&tag=fortecaesta08-20",
          },
          {
            name: "Throw Pillow Covers (Earth Tones)",
            qty: "×2",
            price: "from $20",
            href: "https://www.amazon.com/s?k=throw+pillow+cover+olive+brown+earth+tone&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Area Rug (Large, Earth Tones)",
            price: "from $140",
            href: "https://www.amazon.com/s?k=area+rug+8x10+earth+tone+bedroom+olive&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "nightstand-essentials",
    numeral: "VII.",
    title: "Nightstand Essentials",
    intro: "Warm lighting, charging at every bedside, reliable alarms. The small things guests remember.",
    subsections: [
      {
        title: "Lighting & Alarms",
        products: [
          {
            name: "Bedside Lamp Set with USB",
            price: "from $55",
            href: "https://www.amazon.com/s?k=bedside+table+lamp+usb+charging+warm+bulb+set+2&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Digital Alarm Clock",
            qty: "×2",
            price: "from $22",
            href: "https://www.amazon.com/s?k=digital+alarm+clock+large+display+battery+backup&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Charging",
        products: [
          {
            name: "Bedside Charging Station",
            qty: "×2",
            price: "from $35",
            href: "https://www.amazon.com/s?k=bedside+charging+station+usb+c+wireless&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Extra Long USB-C Cables (6-Pack)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=usb+c+cable+10ft+6+pack+anker&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Sleep Comfort",
        products: [
          {
            name: "Blackout Sleep Mask Set",
            price: "from $14",
            href: "https://www.amazon.com/s?k=blackout+sleep+mask+silk+set&tag=fortecaesta08-20",
          },
        ],
      },
    ],
  },
  {
    slug: "bedroom-extras",
    numeral: "VIII.",
    title: "Bedroom Extras",
    intro: "The accessories that finish every bedroom.",
    subsections: [
      {
        title: "Storage",
        products: [
          {
            name: "Folding Luggage Rack",
            qty: "×2",
            price: "from $35",
            href: "https://www.amazon.com/s?k=folding+luggage+rack+hotel+wood&tag=fortecaesta08-20",
          },
        ],
      },
    ],
  },
  {
    slug: "window-treatments",
    numeral: "IX.",
    title: "Window Treatments",
    intro: "Blackout curtains in every bedroom. A consistent Airbnb review driver — solved before the first guest.",
    subsections: [
      {
        title: "Blackout",
        products: [
          {
            name: "100% Blackout Curtains (84\")",
            qty: "×3",
            price: "from $42",
            href: "https://www.amazon.com/s?k=blackout+curtains+84+inch+panels+nicetown&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Blackout Curtains (108\" Extra Long)",
            notes: "For tall windows",
            price: "from $52",
            href: "https://www.amazon.com/s?k=blackout+curtains+108+inch+extra+long&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Hardware",
        products: [
          {
            name: "Curtain Rods (Matte Black)",
            qty: "×3",
            price: "from $22",
            href: "https://www.amazon.com/s?k=curtain+rod+matte+black+48+84+inch&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Light Filtering",
        products: [
          {
            name: "Sheer Linen Curtains",
            qty: "×2",
            price: "from $28",
            href: "https://www.amazon.com/s?k=sheer+linen+curtains+neutral+living+room&tag=fortecaesta08-20",
          },
        ],
      },
    ],
  },
  {
    slug: "living-room",
    numeral: "X.",
    title: "Living Room",
    intro: "Couch by the window, oversized chair in the corner. Anchored with layered texture and an edited game collection.",
    subsections: [
      {
        title: "Furniture",
        products: [
          {
            name: "Modern Sectional Couch",
            price: "from $850",
            href: "https://www.amazon.com/s?k=modern+sectional+couch+grey+fabric&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Coffee Table (Wood)",
            price: "from $180",
            href: "https://www.amazon.com/s?k=coffee+table+wood+natural+rectangular&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Oversized Accent Chair",
            price: "from $380",
            href: "https://www.amazon.com/s?k=oversized+accent+chair+cream+boucle&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Pouf / Ottoman (Woven)",
            price: "from $95",
            href: "https://www.amazon.com/s?k=woven+pouf+ottoman+natural+jute&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Décor",
        products: [
          {
            name: "Woven Blanket Basket",
            price: "from $40",
            href: "https://www.amazon.com/s?k=large+woven+blanket+basket+natural&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Board Game Storage Basket",
            price: "from $40",
            href: "https://www.amazon.com/s?k=woven+storage+basket+board+games+large&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Area Rug (Large, Neutral)",
            price: "from $220",
            href: "https://www.amazon.com/s?k=area+rug+9x12+neutral+living+room&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Board Games",
        products: [
          {
            name: "Ticket to Ride",
            price: "from $25",
            href: "https://www.amazon.com/s?k=ticket+to+ride+board+game&tag=fortecaesta08-20",
          },
          {
            name: "Catan",
            price: "from $28",
            href: "https://www.amazon.com/s?k=catan+board+game+settlers&tag=fortecaesta08-20",
          },
          {
            name: "Monopoly Classic",
            price: "from $20",
            href: "https://www.amazon.com/s?k=monopoly+classic+board+game&tag=fortecaesta08-20",
          },
          {
            name: "Scrabble Deluxe",
            price: "from $22",
            href: "https://www.amazon.com/s?k=scrabble+deluxe+board+game&tag=fortecaesta08-20",
          },
          {
            name: "Clue Classic",
            price: "from $25",
            href: "https://www.amazon.com/s?k=clue+classic+board+game&tag=fortecaesta08-20",
          },
          {
            name: "UNO Card Game",
            price: "from $12",
            href: "https://www.amazon.com/s?k=uno+card+game+classic&tag=fortecaesta08-20",
          },
        ],
      },
    ],
  },
  {
    slug: "game-room-and-entertainment",
    numeral: "XI.",
    title: "Game Room & Entertainment",
    intro: "Indoor entertainment for rainy days and winter evenings. Giant Jenga, card table, dartboard — the amenities that earn return bookings.",
    subsections: [
      {
        title: "Indoor Games",
        products: [
          {
            name: "Giant Wood Jenga Set (4ft)",
            price: "from $60",
            href: "https://www.amazon.com/s?k=giant+jenga+set+wood+hardwood+4+foot&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Deluxe Playing Card Set",
            price: "from $15",
            href: "https://www.amazon.com/s?k=playing+card+set+deluxe+2+deck+wood+case&tag=fortecaesta08-20",
          },
          {
            name: "Folding Card Table + 4 Chairs",
            price: "from $180",
            href: "https://www.amazon.com/s?k=folding+card+table+chairs+set+4+square&tag=fortecaesta08-20",
          },
          {
            name: "Cabinet Dartboard Set",
            price: "from $85",
            href: "https://www.amazon.com/s?k=dartboard+cabinet+bristle+steel+tip+set&tag=fortecaesta08-20",
          },
          {
            name: "Tabletop Shuffleboard Set",
            price: "from $145",
            href: "https://www.amazon.com/s?k=tabletop+shuffleboard+game&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
      {
        title: "Kids Entertainment",
        products: [
          {
            name: "LEGO Classic Large Creative Box",
            price: "from $60",
            href: "https://www.amazon.com/s?k=lego+classic+large+creative+brick+box&tag=fortecaesta08-20",
          },
          {
            name: "1000-Piece Puzzle Set (4-Pack)",
            price: "from $40",
            href: "https://www.amazon.com/s?k=1000+piece+puzzle+set+adults+bundle&tag=fortecaesta08-20",
          },
        ],
      },
    ],
  },
  {
    slug: "kitchen",
    numeral: "XII.",
    title: "Kitchen",
    intro: "Guests cook more in mountain rentals than anywhere else. Outfit it like a real home, not a staged set.",
    subsections: [
      {
        title: "Furniture",
        products: [
          {
            name: "Dining Table (6-8 seats)",
            price: "from $420",
            href: "https://www.amazon.com/s?k=dining+table+6+seat+farmhouse+wood&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Appliances",
        products: [
          {
            name: "Keurig K-Classic Coffee Maker",
            price: "from $140",
            href: "https://www.amazon.com/s?k=keurig+k+classic+coffee+maker&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "4-Slice Stainless Toaster",
            price: "from $45",
            href: "https://www.amazon.com/s?k=4+slice+toaster+stainless+steel+wide+slot&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Electric Gooseneck Kettle",
            price: "from $40",
            href: "https://www.amazon.com/s?k=electric+gooseneck+kettle+stainless+temperature&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Countertop Blender",
            price: "from $65",
            href: "https://www.amazon.com/s?k=countertop+blender+ninja+smoothie&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Coffee Station",
        products: [
          {
            name: "Keurig Coffee Pods (Variety)",
            price: "from $38",
            href: "https://www.amazon.com/s?k=keurig+coffee+pods+variety+pack+60+count&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Farmhouse Coffee Sign",
            price: "from $18",
            href: "https://www.amazon.com/s?k=farmhouse+coffee+bar+sign+wood+decor&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Coffee Station Organizer",
            price: "from $42",
            href: "https://www.amazon.com/s?k=coffee+station+organizer+tray+wood&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "K-Cup Pod Holder",
            price: "from $22",
            href: "https://www.amazon.com/s?k=k+cup+pod+holder+countertop+carousel&tag=fortecaesta08-20",
          },
          {
            name: "Decorative Farmhouse Truck",
            price: "from $20",
            href: "https://www.amazon.com/s?k=red+truck+farmhouse+decor+tabletop&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Sugar Container with Lid",
            price: "from $16",
            href: "https://www.amazon.com/s?k=sugar+canister+container+lid+ceramic&tag=fortecaesta08-20",
          },
          {
            name: "Espresso Cups (Set of 6)",
            price: "from $22",
            href: "https://www.amazon.com/s?k=espresso+cups+set+6+ceramic+white&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Cooking",
        products: [
          {
            name: "Chef's Knife Block Set",
            price: "from $55",
            href: "https://www.amazon.com/s?k=knife+block+set+kitchen+chef+15+piece&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Bamboo Cutting Boards (Set of 3)",
            price: "from $25",
            href: "https://www.amazon.com/s?k=bamboo+cutting+board+set+3+piece&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Utensil Crock (Ceramic)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=utensil+crock+holder+ceramic+white&tag=fortecaesta08-20",
          },
          {
            name: "Silicone Utensil Set",
            price: "from $30",
            href: "https://www.amazon.com/s?k=silicone+kitchen+utensil+set+15+piece&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Non-Stick Bakeware Set",
            price: "from $35",
            href: "https://www.amazon.com/s?k=bakeware+set+nonstick+10+piece&tag=fortecaesta08-20",
          },
          {
            name: "Box Grater (Stainless)",
            price: "from $14",
            href: "https://www.amazon.com/s?k=box+grater+stainless+steel+4+sided&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Colander / Strainer Set",
            price: "from $18",
            href: "https://www.amazon.com/s?k=colander+strainer+set+stainless+steel&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Glassware",
        products: [
          {
            name: "Drinking Glasses (Set of 12)",
            price: "from $28",
            href: "https://www.amazon.com/s?k=drinking+glasses+set+12+clear+tumbler&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Wine Glasses (Set of 12)",
            price: "from $26",
            href: "https://www.amazon.com/s?k=wine+glasses+set+12+universal+stemless&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Sink",
        products: [
          {
            name: "Sink Caddy & Dispenser Set",
            price: "from $28",
            href: "https://www.amazon.com/s?k=sink+organizer+dispenser+set+matte+black&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Brita Water Filter Pitcher",
            price: "from $45",
            href: "https://www.amazon.com/s?k=brita+water+filter+pitcher+large&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
      {
        title: "Outdoor Cooking",
        products: [
          {
            name: "BBQ Grill Tool Set",
            price: "from $30",
            href: "https://www.amazon.com/s?k=bbq+grill+tool+set+stainless+steel&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "BBQ Grill Mat",
            price: "from $25",
            href: "https://www.amazon.com/s?k=bbq+grill+mat+deck+protection&tag=fortecaesta08-20",
          },
          {
            name: "Weber Grill Cover",
            price: "from $35",
            href: "https://www.amazon.com/s?k=weber+grill+cover+heavy+duty+weatherproof&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "family-amenities",
    numeral: "XIII.",
    title: "Family Amenities",
    intro: "Pack-n-play, high chair, baby gate, kids' tableware. The Pocono family market is the biggest booking segment — cater to it.",
    subsections: [
      {
        title: "Baby & Toddler",
        products: [
          {
            name: "Graco Pack 'n Play",
            price: "from $90",
            href: "https://www.amazon.com/s?k=graco+pack+n+play+portable+crib&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Pack 'n Play Fitted Sheets (2-Pack)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=pack+n+play+fitted+sheets+2+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Foldable High Chair",
            price: "from $65",
            href: "https://www.amazon.com/s?k=foldable+high+chair+baby+portable&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Retractable Baby Gate",
            price: "from $48",
            href: "https://www.amazon.com/s?k=retractable+baby+gate+stairs+mesh&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Outlet Covers (40-Pack)",
            price: "from $10",
            href: "https://www.amazon.com/s?k=outlet+cover+child+safety+40+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Corner Edge Protectors",
            price: "from $12",
            href: "https://www.amazon.com/s?k=corner+edge+protector+baby+safety+clear&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Kids Entertainment",
        products: [
          {
            name: "Kids Book Bundle",
            price: "from $50",
            href: "https://www.amazon.com/s?k=kids+book+collection+bundle+ages+3+10&tag=fortecaesta08-20",
          },
          {
            name: "Kids Art & Craft Kit",
            price: "from $35",
            href: "https://www.amazon.com/s?k=kids+art+craft+kit+rainy+day&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Kids Tableware",
        products: [
          {
            name: "Bamboo Kids Plate & Bowl Set",
            price: "from $25",
            href: "https://www.amazon.com/s?k=bamboo+kids+plate+bowl+set+unbreakable&tag=fortecaesta08-20",
          },
          {
            name: "Spill-Proof Kids Cups",
            price: "from $18",
            href: "https://www.amazon.com/s?k=spill+proof+kids+cups+with+lids+straw&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Bath Time",
        products: [
          {
            name: "Hooded Kids Bath Towels",
            price: "from $28",
            href: "https://www.amazon.com/s?k=hooded+kids+bath+towels+2+pack&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Travel",
        products: [
          {
            name: "Lightweight Travel Stroller",
            price: "from $120",
            href: "https://www.amazon.com/s?k=lightweight+travel+stroller+umbrella+compact&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
    ],
  },
  {
    slug: "front-deck",
    numeral: "XIV.",
    title: "Front Deck",
    intro: "Egg chairs as the signature piece. Optional patio set extends the seating for larger gatherings.",
    subsections: [
      {
        title: "Seating",
        products: [
          {
            name: "Hanging Egg Chair (Outdoor)",
            qty: "×2",
            price: "from $220",
            href: "https://www.amazon.com/s?k=hanging+egg+chair+outdoor+wicker+stand&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Outdoor Side Table",
            price: "from $65",
            href: "https://www.amazon.com/s?k=outdoor+side+table+patio+wicker+rattan&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
      {
        title: "Optional Add-On",
        products: [
          {
            name: "Outdoor Patio Furniture Set",
            price: "from $650",
            href: "https://www.amazon.com/s?k=outdoor+patio+furniture+set+wicker+cushions&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Outdoor Coffee Table",
            price: "from $120",
            href: "https://www.amazon.com/s?k=outdoor+coffee+table+patio+wicker&tag=fortecaesta08-20",
          },
          {
            name: "Outdoor Area Rug",
            price: "from $95",
            href: "https://www.amazon.com/s?k=outdoor+area+rug+patio+weather+resistant+8x10&tag=fortecaesta08-20",
          },
        ],
      },
    ],
  },
  {
    slug: "outdoor-fire-pit-and-firewood",
    numeral: "XV.",
    title: "Outdoor Fire Pit & Firewood",
    intro: "The Pocono signature. Solo Stove for premium, Outland propane for low-maintenance. Surround with Adirondacks.",
    subsections: [
      {
        title: "Fire Pit Options",
        products: [
          {
            name: "Solo Stove Bonfire 2.0",
            notes: "Best-in-class smokeless",
            price: "from $400",
            href: "https://www.amazon.com/s?k=solo+stove+bonfire+2.0+smokeless+fire+pit&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Outland Propane Fire Pit",
            notes: "Low maintenance",
            price: "from $230",
            href: "https://www.amazon.com/s?k=outland+living+propane+fire+pit+table&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Adirondack Chairs (Set of 4)",
            price: "from $440",
            href: "https://www.amazon.com/s?k=adirondack+chairs+poly+lumber+set+4&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
      {
        title: "Firewood",
        products: [
          {
            name: "Outdoor Firewood Rack (8ft)",
            price: "from $140",
            href: "https://www.amazon.com/s?k=outdoor+firewood+rack+8+foot+cover&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Indoor Log Holder (Wrought Iron)",
            price: "from $55",
            href: "https://www.amazon.com/s?k=indoor+log+holder+wrought+iron+firewood&tag=fortecaesta08-20",
          },
          {
            name: "Fatwood Fire Starters",
            price: "from $30",
            href: "https://www.amazon.com/s?k=fatwood+fire+starter+box+10+lb&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Long Utility Lighters",
            price: "from $14",
            href: "https://www.amazon.com/s?k=long+utility+lighter+refillable+2+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Fire Pit Cover (Waterproof)",
            price: "from $28",
            href: "https://www.amazon.com/s?k=fire+pit+cover+waterproof+round+30+inch&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Accessories",
        products: [
          {
            name: "S'mores Roasting Sticks",
            price: "from $18",
            href: "https://www.amazon.com/s?k=smores+roasting+sticks+telescoping+8+pack&tag=fortecaesta08-20",
          },
          {
            name: "Fireplace Tool Set (5-Piece)",
            price: "from $75",
            href: "https://www.amazon.com/s?k=fireplace+tool+set+5+piece+matte+black&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Fireplace Spark Screen",
            price: "from $85",
            href: "https://www.amazon.com/s?k=fireplace+spark+screen+mesh+insurance&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "outdoor-lawn-games",
    numeral: "XVI.",
    title: "Outdoor Lawn Games",
    intro: "Cornhole, Spikeball, ladder toss, bocce. Guests book mountain rentals for the yard — give them reasons to use it.",
    subsections: [
      {
        title: "Lawn Games",
        products: [
          {
            name: "Regulation Cornhole Set",
            notes: "Pocono classic",
            price: "from $140",
            href: "https://www.amazon.com/s?k=cornhole+set+regulation+4x2+bags+wood&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Giant Outdoor Jenga",
            price: "from $75",
            href: "https://www.amazon.com/s?k=giant+outdoor+jenga+weatherproof&tag=fortecaesta08-20",
          },
          {
            name: "Ladder Toss Set",
            price: "from $45",
            href: "https://www.amazon.com/s?k=ladder+toss+ladder+ball+game+set&tag=fortecaesta08-20",
          },
          {
            name: "Bocce Ball Set (Wood Case)",
            price: "from $50",
            href: "https://www.amazon.com/s?k=bocce+ball+set+wood+case+8+ball&tag=fortecaesta08-20",
          },
          {
            name: "Spikeball Pro Set",
            price: "from $60",
            href: "https://www.amazon.com/s?k=spikeball+pro+set+outdoor&tag=fortecaesta08-20",
          },
        ],
      },
    ],
  },
  {
    slug: "smart-home-and-access",
    numeral: "XVII.",
    title: "Smart Home & Access",
    intro: "Contactless check-in, remote climate control, Airbnb-compliant noise monitoring. Integrates with Hospitable.",
    subsections: [
      {
        title: "Access",
        products: [
          {
            name: "August Smart Lock (4th Gen)",
            notes: "Hospitable compatible",
            price: "from $230",
            href: "https://www.amazon.com/s?k=august+wifi+smart+lock+4th+gen&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Schlage Encode Smart Deadbolt",
            price: "from $280",
            href: "https://www.amazon.com/s?k=schlage+encode+smart+deadbolt+wifi&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Cameras",
        products: [
          {
            name: "Ring Spotlight Cam Pro",
            qty: "×2",
            notes: "Exterior only",
            price: "from $230",
            href: "https://www.amazon.com/s?k=ring+spotlight+cam+pro+outdoor&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Ring Battery Doorbell Plus",
            price: "from $100",
            href: "https://www.amazon.com/s?k=ring+video+doorbell+battery+plus&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Climate",
        products: [
          {
            name: "Google Nest Thermostat",
            price: "from $130",
            href: "https://www.amazon.com/s?k=google+nest+thermostat+4th+generation&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Ecobee Premium Thermostat",
            price: "from $220",
            href: "https://www.amazon.com/s?k=ecobee+smart+thermostat+premium&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Noise Monitoring",
        products: [
          {
            name: "Minut Smart Home Sensor",
            notes: "Airbnb-approved",
            price: "from $180",
            href: "https://www.amazon.com/s?k=minut+smart+home+noise+sensor+airbnb&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Wi-Fi",
        products: [
          {
            name: "Eero 6+ Mesh Wi-Fi (3-Pack)",
            price: "from $250",
            href: "https://www.amazon.com/s?k=eero+6+plus+mesh+wifi+router+3+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Charging",
        products: [
          {
            name: "Surge Protector Power Strip",
            qty: "×4",
            price: "from $25",
            href: "https://www.amazon.com/s?k=surge+protector+power+strip+usb+6+outlet&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "winter-and-snow-gear",
    numeral: "XVIII.",
    title: "Winter & Snow Gear",
    intro: "Shovels, pet-safe ice melt, roof rake, boot dryer. Ski-season guests pay premium — earn it.",
    subsections: [
      {
        title: "Snow Removal",
        products: [
          {
            name: "Heavy-Duty Snow Shovel",
            qty: "×2",
            price: "from $35",
            href: "https://www.amazon.com/s?k=snow+shovel+heavy+duty+ergonomic&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Pet-Safe Ice Melt (50 lb)",
            price: "from $45",
            href: "https://www.amazon.com/s?k=pet+safe+ice+melt+50+lb+bucket&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Extendable Roof Rake",
            notes: "Prevents ice dams",
            price: "from $55",
            href: "https://www.amazon.com/s?k=roof+rake+snow+extendable+20+foot&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Car Essentials",
        products: [
          {
            name: "Ice Scraper + Snow Brush",
            qty: "×2",
            price: "from $20",
            href: "https://www.amazon.com/s?k=ice+scraper+snow+brush+2+pack+car&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Entry",
        products: [
          {
            name: "Heated Boot Dryer",
            price: "from $65",
            href: "https://www.amazon.com/s?k=heated+boot+dryer+ski+snowboard&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
    ],
  },
  {
    slug: "mudroom-and-entry",
    numeral: "XIX.",
    title: "Mudroom & Entry",
    intro: "Boot trays, coat hooks, entry bench. Where ski and lake days begin and end.",
    subsections: [
      {
        title: "Storage",
        products: [
          {
            name: "Large Boot Tray (Rust-Proof)",
            qty: "×2",
            price: "from $35",
            href: "https://www.amazon.com/s?k=boot+tray+large+rust+proof+rubber&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Entryway Bench with Shoe Storage",
            price: "from $180",
            href: "https://www.amazon.com/s?k=entryway+bench+shoe+storage+wood&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Wall-Mounted Coat Hooks",
            price: "from $32",
            href: "https://www.amazon.com/s?k=wall+mounted+coat+hook+rack+matte+black+6&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Weighted Umbrella Stand",
            price: "from $45",
            href: "https://www.amazon.com/s?k=umbrella+stand+weighted+metal&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Door Mats",
        products: [
          {
            name: "Washable Indoor Door Mat",
            qty: "×2",
            price: "from $30",
            href: "https://www.amazon.com/s?k=washable+indoor+door+mat+non+slip+entry&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Heavy-Duty Coir Welcome Mat",
            qty: "×2",
            price: "from $35",
            href: "https://www.amazon.com/s?k=coir+welcome+mat+heavy+duty+outdoor&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "safety-and-compliance",
    numeral: "XX.",
    title: "Safety & Compliance",
    intro: "Airbnb requires detectors, extinguishers, and escape ladders. Insurance demands it.",
    subsections: [
      {
        title: "Detectors",
        products: [
          {
            name: "Smoke Detectors (10-Year Sealed)",
            qty: "×4",
            price: "from $22",
            href: "https://www.amazon.com/s?k=first+alert+smoke+detector+10+year+sealed+battery&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Carbon Monoxide Detectors",
            qty: "×3",
            price: "from $30",
            href: "https://www.amazon.com/s?k=first+alert+carbon+monoxide+detector+10+year&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Combo Smoke + CO Detector",
            qty: "×3",
            price: "from $42",
            href: "https://www.amazon.com/s?k=combination+smoke+carbon+monoxide+detector+first+alert&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Fire Extinguishers",
        products: [
          {
            name: "Fire Extinguisher (ABC, 5 lb)",
            qty: "×3",
            price: "from $45",
            href: "https://www.amazon.com/s?k=fire+extinguisher+first+alert+5+lb+abc&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "2-Story Fire Escape Ladder",
            qty: "×2",
            price: "from $55",
            href: "https://www.amazon.com/s?k=fire+escape+ladder+2+story+collapsible&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "First Aid",
        products: [
          {
            name: "First Aid Kit (200+ Pieces)",
            price: "from $35",
            href: "https://www.amazon.com/s?k=first+aid+kit+200+piece+comprehensive&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Emergency Flashlights (4-Pack)",
            price: "from $22",
            href: "https://www.amazon.com/s?k=emergency+flashlight+led+4+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "NOAA Weather Radio",
            price: "from $45",
            href: "https://www.amazon.com/s?k=noaa+weather+radio+hand+crank+solar&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Visibility",
        products: [
          {
            name: "Illuminated House Number",
            price: "from $45",
            href: "https://www.amazon.com/s?k=illuminated+house+number+sign+solar+reflective&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "cleaning-supplies",
    numeral: "XXI.",
    title: "Cleaning Supplies",
    intro: "The complete crew kit — Bounty, Scott, O-Cedar, Swiffer, Windex, Dawn, Tide, and everything between.",
    subsections: [
      {
        title: "Paper Goods",
        products: [
          {
            name: "Bounty Paper Towels (Bulk)",
            notes: "Forteca standard",
            price: "from $36",
            href: "https://www.amazon.com/s?k=bounty+paper+towels+bulk+12+rolls&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Scott Toilet Paper (Bulk)",
            notes: "Forteca standard",
            price: "from $32",
            href: "https://www.amazon.com/s?k=scott+toilet+paper+36+roll+bulk&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Kitchen Trash Bags (13 Gallon)",
            price: "from $28",
            href: "https://www.amazon.com/s?k=kitchen+trash+bags+13+gallon+200+count+glad&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Tall Kitchen Drawstring Bags",
            price: "from $25",
            href: "https://www.amazon.com/s?k=tall+kitchen+trash+bag+drawstring+bulk&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Facial Tissues (Bulk Pack)",
            price: "from $24",
            href: "https://www.amazon.com/s?k=kleenex+facial+tissues+bulk+12+pack&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Floors",
        products: [
          {
            name: "O-Cedar EasyWring Spin Mop System",
            notes: "Cleaner favorite",
            price: "from $42",
            href: "https://www.amazon.com/s?k=o+cedar+easywring+spin+mop+bucket&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "O-Cedar Mop Refill Heads (2-Pack)",
            notes: "Rotate between properties",
            price: "from $18",
            href: "https://www.amazon.com/s?k=o+cedar+spin+mop+refill+head+2+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Swiffer WetJet Starter Kit",
            notes: "For quick touch-ups between deep cleans",
            price: "from $32",
            href: "https://www.amazon.com/s?k=swiffer+wetjet+starter+kit+floor+mop&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Swiffer WetJet Cleaning Pads (Bulk)",
            price: "from $22",
            href: "https://www.amazon.com/s?k=swiffer+wetjet+pad+refill+bulk+24+count&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Swiffer WetJet Solution Refill",
            price: "from $18",
            href: "https://www.amazon.com/s?k=swiffer+wetjet+liquid+refill+multi+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Swiffer Dusters (Heavy Duty)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=swiffer+duster+heavy+duty+refill&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Bona Hardwood Floor Cleaner",
            notes: "Safe for real wood floors",
            price: "from $24",
            href: "https://www.amazon.com/s?k=bona+hardwood+floor+cleaner+gallon+refill&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Pine-Sol All-Purpose Cleaner (Gallon)",
            price: "from $16",
            href: "https://www.amazon.com/s?k=pine+sol+cleaner+gallon&tag=fortecaesta08-20",
          },
          {
            name: "Broom + Dustpan Set (2 Sets)",
            qty: "×2",
            notes: "One indoor, one for deck/entry",
            price: "from $28",
            href: "https://www.amazon.com/s?k=broom+dustpan+set+heavy+duty&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Cordless Stick Vacuum (Shark)",
            price: "from $280",
            href: "https://www.amazon.com/s?k=shark+cordless+stick+vacuum&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Surfaces & Glass",
        products: [
          {
            name: "Windex Glass Cleaner (Gallon Refill)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=windex+glass+cleaner+gallon+refill&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Method All-Purpose Cleaner",
            notes: "Non-toxic, safe around kids",
            price: "from $22",
            href: "https://www.amazon.com/s?k=method+all+purpose+cleaner+spray+refill&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Clorox Disinfecting Wipes (Bulk)",
            price: "from $32",
            href: "https://www.amazon.com/s?k=clorox+disinfecting+wipes+bulk+value+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Lysol Disinfectant Spray",
            price: "from $22",
            href: "https://www.amazon.com/s?k=lysol+disinfectant+spray+3+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Mr. Clean Magic Erasers (Bulk)",
            notes: "Scuff removal on walls/baseboards",
            price: "from $22",
            href: "https://www.amazon.com/s?k=mr+clean+magic+eraser+bulk+20+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Stainless Steel Cleaner & Polish",
            notes: "For appliances",
            price: "from $15",
            href: "https://www.amazon.com/s?k=stainless+steel+cleaner+polish+appliance&tag=fortecaesta08-20",
          },
          {
            name: "Wood Furniture Polish (Pledge)",
            price: "from $12",
            href: "https://www.amazon.com/s?k=pledge+wood+furniture+polish&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Bathroom",
        products: [
          {
            name: "Scrubbing Bubbles Bathroom Cleaner",
            price: "from $16",
            href: "https://www.amazon.com/s?k=scrubbing+bubbles+bathroom+cleaner+foam&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Clorox Toilet Bowl Cleaner",
            price: "from $14",
            href: "https://www.amazon.com/s?k=clorox+toilet+bowl+cleaner+with+bleach&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "CLR Calcium Lime Rust Remover",
            notes: "Shower glass + faucet buildup",
            price: "from $15",
            href: "https://www.amazon.com/s?k=clr+calcium+lime+rust+remover+cleaner&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Mold & Mildew Remover (Tilex)",
            price: "from $14",
            href: "https://www.amazon.com/s?k=tilex+mold+mildew+remover+bathroom&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Disposable Toilet Brush Refills",
            notes: "Hygienic rotation",
            price: "from $18",
            href: "https://www.amazon.com/s?k=disposable+toilet+brush+refill+heads+clorox&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Kitchen",
        products: [
          {
            name: "Dawn Ultra Dish Soap (Gallon)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=dawn+ultra+dish+soap+gallon&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Cascade Dishwasher Pods (Bulk)",
            price: "from $28",
            href: "https://www.amazon.com/s?k=cascade+platinum+dishwasher+pods+bulk+100&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Dish Sponges (Scotch-Brite, 24-Pack)",
            notes: "Rotate fresh each turnover",
            price: "from $22",
            href: "https://www.amazon.com/s?k=scotch+brite+dish+sponge+bulk+24+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Non-Scratch Scrubbers",
            price: "from $14",
            href: "https://www.amazon.com/s?k=scotch+brite+non+scratch+scrubber+bulk&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Dishwasher Rinse Aid (Jet-Dry)",
            notes: "Prevents spotting",
            price: "from $12",
            href: "https://www.amazon.com/s?k=finish+jet+dry+rinse+aid+bulk&tag=fortecaesta08-20",
          },
          {
            name: "Dishwasher Cleaner (Monthly)",
            price: "from $14",
            href: "https://www.amazon.com/s?k=dishwasher+cleaner+affresh+tablets&tag=fortecaesta08-20",
          },
          {
            name: "Garbage Disposal Cleaner Pods",
            price: "from $12",
            href: "https://www.amazon.com/s?k=garbage+disposal+cleaner+pods+lemon&tag=fortecaesta08-20",
          },
          {
            name: "Oven Cleaner (Easy-Off)",
            price: "from $10",
            href: "https://www.amazon.com/s?k=easy+off+oven+cleaner+heavy+duty&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Microfiber Dish Towels (12-Pack)",
            notes: "Color-coded for cleaners",
            price: "from $22",
            href: "https://www.amazon.com/s?k=microfiber+dish+towel+bulk+12+pack+kitchen&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "OxiClean Stain Remover",
            notes: "For white linens",
            price: "from $24",
            href: "https://www.amazon.com/s?k=oxiclean+stain+remover+powder+bulk&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Laundry",
        products: [
          {
            name: "Tide Laundry Detergent (HE, Large)",
            notes: "Commercial size",
            price: "from $32",
            href: "https://www.amazon.com/s?k=tide+he+laundry+detergent+large+bottle&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "All Free & Clear Detergent",
            notes: "Unscented backup for sensitive guests",
            price: "from $22",
            href: "https://www.amazon.com/s?k=all+free+clear+laundry+detergent+hypoallergenic&tag=fortecaesta08-20",
          },
          {
            name: "Downy Fabric Softener",
            price: "from $16",
            href: "https://www.amazon.com/s?k=downy+fabric+softener+bulk&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Bounce Dryer Sheets (Bulk)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=bounce+dryer+sheets+bulk+240+count&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Clorox Bleach (Gallon)",
            notes: "For white linens",
            price: "from $10",
            href: "https://www.amazon.com/s?k=clorox+bleach+gallon+white&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Wool Dryer Balls (Set of 6)",
            notes: "Reduces drying time",
            price: "from $18",
            href: "https://www.amazon.com/s?k=wool+dryer+balls+set+6&tag=fortecaesta08-20",
          },
          {
            name: "Mesh Laundry Bags",
            notes: "For delicates + makeup towels",
            price: "from $14",
            href: "https://www.amazon.com/s?k=mesh+laundry+bag+set+delicates&tag=fortecaesta08-20",
          },
          {
            name: "Laundry Stain Pre-Treat Spray",
            price: "from $15",
            href: "https://www.amazon.com/s?k=shout+stain+remover+spray+bulk&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Cloths & Tools",
        products: [
          {
            name: "Microfiber Cleaning Cloths (Bulk)",
            notes: "Color-coded by room",
            price: "from $28",
            href: "https://www.amazon.com/s?k=microfiber+cleaning+cloth+bulk+50+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Cleaning Caddy / Carrier",
            qty: "×2",
            notes: "Organizes supplies per turnover",
            price: "from $22",
            href: "https://www.amazon.com/s?k=cleaning+caddy+carrier+tool&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Rubber Cleaning Gloves (Bulk)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=rubber+cleaning+gloves+medium+bulk&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Extendable Duster",
            notes: "For ceiling fans + vents",
            price: "from $22",
            href: "https://www.amazon.com/s?k=microfiber+extendable+duster+ceiling+fan&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Lint Rollers (Bulk Pack)",
            price: "from $15",
            href: "https://www.amazon.com/s?k=lint+roller+bulk+pack+8+count&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Small Step Stool (Folding)",
            notes: "For cleaners to reach high spots",
            price: "from $28",
            href: "https://www.amazon.com/s?k=folding+step+stool+2+step+kitchen&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Pest & Odor",
        products: [
          {
            name: "Febreze Air Freshener (Bulk)",
            price: "from $20",
            href: "https://www.amazon.com/s?k=febreze+air+freshener+spray+bulk+unscented&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Air Wick Plug-In Diffusers",
            notes: "Subtle, not overpowering",
            price: "from $18",
            href: "https://www.amazon.com/s?k=air+wick+plug+in+air+freshener+warm&tag=fortecaesta08-20",
          },
          {
            name: "Arm & Hammer Baking Soda (Bulk)",
            notes: "Odor absorber",
            price: "from $14",
            href: "https://www.amazon.com/s?k=arm+hammer+baking+soda+bulk&tag=fortecaesta08-20",
          },
          {
            name: "Mouse Traps (Humane, 6-Pack)",
            notes: "Pocono cabins get mice in fall",
            price: "from $22",
            href: "https://www.amazon.com/s?k=humane+mouse+trap+6+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Ant & Roach Spray (Raid)",
            price: "from $12",
            href: "https://www.amazon.com/s?k=raid+ant+roach+killer+spray&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Indoor Pest Repellent (Natural)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=indoor+pest+repellent+peppermint+natural+spray&tag=fortecaesta08-20",
          },
          {
            name: "Carpet & Rug Freshener Powder",
            price: "from $10",
            href: "https://www.amazon.com/s?k=carpet+rug+freshener+powder+glade&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Storage",
        products: [
          {
            name: "Lockable Cleaning Supply Cabinet",
            notes: "Child-safe chemical storage",
            price: "from $120",
            href: "https://www.amazon.com/s?k=lockable+cabinet+cleaning+supplies+storage&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Clear Storage Bins with Lids",
            notes: "For organized cleaning closet",
            price: "from $35",
            href: "https://www.amazon.com/s?k=clear+storage+bin+with+lid+set+stackable&tag=fortecaesta08-20",
          },
          {
            name: "Laundry Hamper (Tall)",
            qty: "×3",
            notes: "One per bedroom",
            price: "from $35",
            href: "https://www.amazon.com/s?k=laundry+hamper+tall+bamboo+bedroom&tag=fortecaesta08-20",
          },
        ],
      },
    ],
  },
  {
    slug: "guest-welcome-kit",
    numeral: "XXII.",
    title: "Guest Welcome Kit",
    intro: "Coffee, tea, snacks, bottled water, and a local touch or two. The first impression that sets the tone for the entire stay.",
    subsections: [
      {
        title: "Welcome Basket",
        products: [
          {
            name: "Welcome Basket / Tray (Woven)",
            notes: "Staged on counter at check-in",
            price: "from $40",
            href: "https://www.amazon.com/s?k=woven+welcome+basket+tray+wood+handles&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Decorative Gift Boxes (Set)",
            notes: "For packaging local treats",
            price: "from $22",
            href: "https://www.amazon.com/s?k=decorative+gift+box+set+welcome+kraft&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Coffee & Tea",
        products: [
          {
            name: "Starbucks K-Cup Variety Pack",
            notes: "Brand-name pods convert better than generic",
            price: "from $32",
            href: "https://www.amazon.com/s?k=starbucks+k+cup+variety+pack+40&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Green Mountain K-Cup Decaf",
            notes: "Decaf option — thoughtful detail",
            price: "from $22",
            href: "https://www.amazon.com/s?k=green+mountain+decaf+k+cup+bulk&tag=fortecaesta08-20",
          },
          {
            name: "Stash Tea Variety Pack",
            price: "from $18",
            href: "https://www.amazon.com/s?k=stash+tea+variety+pack+assortment&tag=fortecaesta08-20",
          },
          {
            name: "Honey Sticks (Individual)",
            notes: "For tea + oatmeal",
            price: "from $15",
            href: "https://www.amazon.com/s?k=honey+sticks+individual+honey+packets+100&tag=fortecaesta08-20",
          },
          {
            name: "Sugar Packets & Sweetener Variety",
            price: "from $14",
            href: "https://www.amazon.com/s?k=sugar+sweetener+variety+pack+individual&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Coffee Creamer (Shelf-Stable Singles)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=coffee+creamer+singles+shelf+stable+variety&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Snacks",
        products: [
          {
            name: "Pretzel Snack Packs (Bulk)",
            price: "from $16",
            href: "https://www.amazon.com/s?k=pretzels+individual+snack+packs+bulk&tag=fortecaesta08-20",
          },
          {
            name: "Granola Bars Variety (Kind/Clif)",
            price: "from $24",
            href: "https://www.amazon.com/s?k=kind+bars+variety+pack+18+count&tag=fortecaesta08-20",
          },
          {
            name: "Popcorn Microwave Variety",
            notes: "Movie-night snack",
            price: "from $14",
            href: "https://www.amazon.com/s?k=microwave+popcorn+variety+pack+bulk&tag=fortecaesta08-20",
          },
          {
            name: "Chocolate Truffle Assortment",
            notes: "Signature welcome touch",
            price: "from $22",
            href: "https://www.amazon.com/s?k=lindt+chocolate+truffle+assortment+box&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
      {
        title: "Water & Drinks",
        products: [
          {
            name: "Bottled Water (24-Pack)",
            price: "from $10",
            href: "https://www.amazon.com/s?k=bottled+water+24+pack+case+poland+spring&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Sparkling Water Variety (LaCroix)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=lacroix+sparkling+water+variety+pack&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Local Feel",
        products: [
          {
            name: "Pocono Mountains Trail Map / Guide",
            notes: "Local-feel touch for guests",
            price: "from $15",
            href: "https://www.amazon.com/s?k=pocono+mountains+hiking+trail+map+guidebook&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Welcome Card / Note Set",
            notes: "Handwritten by host",
            price: "from $12",
            href: "https://www.amazon.com/s?k=welcome+card+set+blank+kraft&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Wine Decanter (for Welcome Bottle)",
            notes: "For staged arrival wine",
            price: "from $35",
            href: "https://www.amazon.com/s?k=wine+decanter+crystal+gift&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
    ],
  },
  {
    slug: "outdoor-and-yard-maintenance",
    numeral: "XXIII.",
    title: "Outdoor & Yard Maintenance",
    intro: "Hose, sprinkler, leaf blower, trimmer, mosquito control. Keeps the yard photo-ready through four seasons.",
    subsections: [
      {
        title: "Watering",
        products: [
          {
            name: "Expandable Garden Hose (50 ft)",
            price: "from $45",
            href: "https://www.amazon.com/s?k=expandable+garden+hose+50+foot+kink+resistant&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Hose Reel / Storage",
            notes: "Keeps hose tidy + photo-ready",
            price: "from $55",
            href: "https://www.amazon.com/s?k=garden+hose+reel+wall+mount&tag=fortecaesta08-20",
          },
          {
            name: "Oscillating Sprinkler",
            price: "from $30",
            href: "https://www.amazon.com/s?k=oscillating+sprinkler+lawn+melnor&tag=fortecaesta08-20",
          },
          {
            name: "Hose Nozzle (Multi-Function)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=garden+hose+nozzle+multi+spray+pattern&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Leaf & Debris",
        products: [
          {
            name: "Cordless Leaf Blower",
            notes: "Pocono properties see heavy leaf drop",
            price: "from $150",
            href: "https://www.amazon.com/s?k=cordless+leaf+blower+battery+worx+ego&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Leaf Rake (Extendable)",
            price: "from $25",
            href: "https://www.amazon.com/s?k=leaf+rake+adjustable+heavy+duty&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Yard Waste Bags (Heavy Duty)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=yard+waste+bags+paper+heavy+duty+30+gallon&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Outdoor Broom / Push Broom",
            notes: "For deck and driveway",
            price: "from $28",
            href: "https://www.amazon.com/s?k=push+broom+outdoor+heavy+duty&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Trimming",
        products: [
          {
            name: "Cordless String Trimmer",
            price: "from $120",
            href: "https://www.amazon.com/s?k=cordless+string+trimmer+battery+lawn&tag=fortecaesta08-20",
          },
          {
            name: "Hedge Trimmer (Cordless)",
            price: "from $135",
            href: "https://www.amazon.com/s?k=cordless+hedge+trimmer+battery+operated&tag=fortecaesta08-20",
          },
          {
            name: "Garden Pruning Shears",
            price: "from $20",
            href: "https://www.amazon.com/s?k=garden+pruning+shears+bypass&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Insect Control",
        products: [
          {
            name: "Mosquito Repellent Zapper",
            notes: "Essential for Pocono summer evenings",
            price: "from $65",
            href: "https://www.amazon.com/s?k=outdoor+mosquito+repellent+zapper+bug&tag=fortecaesta08-20",
          },
          {
            name: "Tiki Torches / Citronella Set",
            price: "from $50",
            href: "https://www.amazon.com/s?k=tiki+torch+set+citronella+outdoor&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Wasp & Hornet Spray",
            price: "from $12",
            href: "https://www.amazon.com/s?k=wasp+hornet+spray+long+range&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "hallway-and-stairwell",
    numeral: "XXIV.",
    title: "Hallway & Stairwell",
    intro: "Runner rugs, stair treads, motion-sensor lighting, and wall art. The transitional spaces that photograph empty — until they don't.",
    subsections: [
      {
        title: "Rugs",
        products: [
          {
            name: "Hallway Runner Rug (Long, Washable)",
            price: "from $85",
            href: "https://www.amazon.com/s?k=hallway+runner+rug+washable+non+slip+long&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Stair Treads (Set of 13)",
            notes: "Reduces slip risk + softens aesthetic",
            price: "from $65",
            href: "https://www.amazon.com/s?k=stair+tread+rugs+non+slip+set+13&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
      {
        title: "Lighting",
        products: [
          {
            name: "Plug-In Motion Sensor Night Lights",
            notes: "Auto-on for hallways and stairs",
            price: "from $22",
            href: "https://www.amazon.com/s?k=motion+sensor+night+light+plug+in+4+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "LED Stair Strip Lights",
            notes: "Luxury touch for nighttime safety",
            price: "from $55",
            href: "https://www.amazon.com/s?k=led+stair+strip+lights+motion+sensor&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Wall Sconces (Battery, Stick-On)",
            notes: "For hallways without hardwired lighting",
            price: "from $45",
            href: "https://www.amazon.com/s?k=battery+wall+sconce+stick+on+warm&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Décor",
        products: [
          {
            name: "Large-Scale Framed Wall Art",
            notes: "Fills empty hallway walls",
            price: "from $85",
            href: "https://www.amazon.com/s?k=large+framed+wall+art+set+neutral&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Gallery Wall Picture Frames (Set)",
            price: "from $45",
            href: "https://www.amazon.com/s?k=gallery+wall+picture+frame+set+black&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Hallway Console Table (Narrow)",
            price: "from $120",
            href: "https://www.amazon.com/s?k=narrow+console+table+hallway+entryway&tag=fortecaesta08-20",
          },
          {
            name: "Faux Plant (Tall, Statement)",
            notes: "Anchors a hallway corner",
            price: "from $75",
            href: "https://www.amazon.com/s?k=faux+plant+tall+5+foot+fiddle+leaf&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
    ],
  },
  {
    slug: "office-and-work-nook",
    numeral: "XXV.",
    title: "Office & Work Nook",
    intro: "For the growing remote-worker guest segment. A small desk setup can unlock 1-2 week bookings that 'vacation' guests won't book.",
    subsections: [
      {
        title: "Desk Setup",
        products: [
          {
            name: "Compact Writing Desk",
            notes: "Remote-worker guest market",
            price: "from $140",
            href: "https://www.amazon.com/s?k=compact+writing+desk+small+bedroom&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Ergonomic Office Chair",
            price: "from $180",
            href: "https://www.amazon.com/s?k=ergonomic+office+chair+home+small&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Adjustable Desk Lamp",
            price: "from $45",
            href: "https://www.amazon.com/s?k=adjustable+desk+lamp+led+warm+usb&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Monitor Light Bar",
            notes: "Premium work-from-home upgrade",
            price: "from $75",
            href: "https://www.amazon.com/s?k=monitor+light+bar+led+computer&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Laptop Stand (Adjustable)",
            price: "from $35",
            href: "https://www.amazon.com/s?k=laptop+stand+adjustable+aluminum+ergonomic&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Connectivity",
        products: [
          {
            name: "Wi-Fi Extender (Backup)",
            notes: "For remote workers in dead zones",
            price: "from $55",
            href: "https://www.amazon.com/s?k=wifi+extender+booster+range&tag=fortecaesta08-20",
          },
          {
            name: "USB-C Hub / Docking Station",
            notes: "For laptops with limited ports",
            price: "from $45",
            href: "https://www.amazon.com/s?k=usb+c+hub+docking+station+hdmi&tag=fortecaesta08-20",
          },
          {
            name: "Printer (Compact, Wireless)",
            notes: "Optional — nice upgrade for extended-stay guests",
            price: "from $130",
            href: "https://www.amazon.com/s?k=compact+wireless+printer+home&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
      {
        title: "Supplies",
        products: [
          {
            name: "Stapler, Scissors, Tape Set",
            price: "from $25",
            href: "https://www.amazon.com/s?k=desk+accessories+stapler+scissors+tape+set&tag=fortecaesta08-20",
          },
          {
            name: "Notepad + Pen Set",
            notes: "For house notes / guest messages",
            price: "from $14",
            href: "https://www.amazon.com/s?k=notepad+pen+set+welcome&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Desktop Organizer (Wood)",
            price: "from $28",
            href: "https://www.amazon.com/s?k=desktop+organizer+wood+office+small&tag=fortecaesta08-20",
          },
        ],
      },
    ],
  },
  {
    slug: "pet-friendly-add-ons",
    numeral: "XXVI.",
    title: "Pet-Friendly Add-Ons",
    intro: "Opens your listing to the pet-friendly market — a premium segment willing to pay higher nightly rates for a small setup investment.",
    subsections: [
      {
        title: "Feeding",
        products: [
          {
            name: "Stainless Steel Pet Bowl Set",
            price: "from $18",
            href: "https://www.amazon.com/s?k=stainless+steel+pet+bowl+set+2+bowls&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Pet Food Mat (Silicone)",
            notes: "Protects floors",
            price: "from $14",
            href: "https://www.amazon.com/s?k=pet+food+mat+silicone+waterproof+large&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Pet Treat Jar (Decorative)",
            price: "from $22",
            href: "https://www.amazon.com/s?k=pet+treat+jar+decorative+ceramic&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Walking & Outdoor",
        products: [
          {
            name: "Outdoor Waste Bag Dispenser + Bags",
            notes: "Mount at exit door",
            price: "from $25",
            href: "https://www.amazon.com/s?k=dog+waste+bag+dispenser+outdoor+mount&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Collapsible Travel Water Bowl",
            price: "from $12",
            href: "https://www.amazon.com/s?k=collapsible+travel+pet+water+bowl&tag=fortecaesta08-20",
          },
          {
            name: "Outdoor Pet Tie-Out Stake",
            price: "from $22",
            href: "https://www.amazon.com/s?k=outdoor+pet+tie+out+stake+cable&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Comfort",
        products: [
          {
            name: "Washable Pet Bed",
            price: "from $45",
            href: "https://www.amazon.com/s?k=washable+pet+bed+medium+dog&tag=fortecaesta08-20",
          },
          {
            name: "Pet-Safe Throw Blanket",
            notes: "Save your couch and bedding",
            price: "from $25",
            href: "https://www.amazon.com/s?k=washable+pet+throw+blanket+fleece&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Cleaning",
        products: [
          {
            name: "Extra Lint Rollers (Jumbo)",
            notes: "Pet-stay essential",
            price: "from $18",
            href: "https://www.amazon.com/s?k=lint+roller+jumbo+pet+hair+bulk&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Pet Hair Vacuum Attachment",
            price: "from $20",
            href: "https://www.amazon.com/s?k=pet+hair+vacuum+attachment+brush&tag=fortecaesta08-20",
          },
          {
            name: "Enzyme Pet Stain & Odor Remover",
            notes: "Essential for pet accidents",
            price: "from $22",
            href: "https://www.amazon.com/s?k=enzyme+pet+stain+odor+remover+spray&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Safety",
        products: [
          {
            name: "Pet Safety Gate (Pressure Mount)",
            price: "from $45",
            href: "https://www.amazon.com/s?k=pet+gate+pressure+mount+indoor&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Welcome",
        products: [
          {
            name: "Pet Welcome Kit (Treats + Toy)",
            notes: "Signature touch for pet-friendly listings",
            price: "from $25",
            href: "https://www.amazon.com/s?k=pet+welcome+kit+treats+toy&tag=fortecaesta08-20",
            priority: "signature",
          },
        ],
      },
    ],
  },
  {
    slug: "other-supplies",
    numeral: "XXVII.",
    title: "Other Supplies",
    intro: "The small things that prevent late-night messages. Batteries, a working iron, the items nobody thinks of.",
    subsections: [
      {
        title: "Batteries",
        products: [
          {
            name: "AA Batteries (48-Pack)",
            price: "from $18",
            href: "https://www.amazon.com/s?k=aa+batteries+48+pack+duracell+alkaline&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "AAA Batteries (48-Pack)",
            price: "from $16",
            href: "https://www.amazon.com/s?k=aaa+batteries+48+pack+duracell+alkaline&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Laundry",
        products: [
          {
            name: "Ironing Board (Full Size)",
            price: "from $40",
            href: "https://www.amazon.com/s?k=ironing+board+full+size+extra+stable&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Steam Iron",
            price: "from $30",
            href: "https://www.amazon.com/s?k=steam+iron+auto+shutoff+stainless&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "hot-tub-maintenance",
    numeral: "XXVIII.",
    title: "Hot Tub Maintenance",
    intro: "The single biggest booking driver in the Poconos. Weekly-tested chemicals and maintenance tools.",
    subsections: [
      {
        title: "Maintenance",
        products: [
          {
            name: "Hot Tub Skimmer Net",
            price: "from $22",
            href: "https://www.amazon.com/s?k=hot+tub+skimmer+net+pool&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Hot Tub Jet Cleaner",
            price: "from $20",
            href: "https://www.amazon.com/s?k=hot+tub+jet+cleaner+spa&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Chemicals",
        products: [
          {
            name: "Hot Tub Chlorine Granules",
            price: "from $35",
            href: "https://www.amazon.com/s?k=hot+tub+chlorine+granules+spa&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Spa Alkalinity Increaser",
            price: "from $18",
            href: "https://www.amazon.com/s?k=spa+alkalinity+increaser+hot+tub&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Spa pH Balancer",
            price: "from $16",
            href: "https://www.amazon.com/s?k=spa+ph+balancer+hot+tub&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Spa 3-in-1 Weekly Cleaner",
            price: "from $22",
            href: "https://www.amazon.com/s?k=spa+3+in+1+weekly+cleaner+hot+tub&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Spa Bright & Clear",
            price: "from $18",
            href: "https://www.amazon.com/s?k=spa+bright+and+clear+water+clarifier&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Hot Tub Test Strips",
            price: "from $15",
            href: "https://www.amazon.com/s?k=hot+tub+water+test+strips+spa&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Spa Defoamer",
            price: "from $14",
            href: "https://www.amazon.com/s?k=spa+defoamer+hot+tub&tag=fortecaesta08-20",
          },
          {
            name: "Spa Shock Treatment",
            price: "from $25",
            href: "https://www.amazon.com/s?k=spa+shock+oxidizer+hot+tub&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
  {
    slug: "hot-tub-guest-experience",
    numeral: "XXIX.",
    title: "Hot Tub Guest Experience",
    intro: "Robes, dark-color towels, path lighting, unbreakable drinkware. Transform the hot tub into a spa moment.",
    subsections: [
      {
        title: "Guest Comfort",
        products: [
          {
            name: "Waffle Weave Bath Robes (Pair)",
            qty: "×2",
            price: "from $60",
            href: "https://www.amazon.com/s?k=waffle+weave+bath+robe+white+spa+2+pack&tag=fortecaesta08-20",
            priority: "signature",
          },
          {
            name: "Guest Flip Flops (6-Pack)",
            price: "from $30",
            href: "https://www.amazon.com/s?k=guest+flip+flops+spa+6+pack+bulk&tag=fortecaesta08-20",
          },
          {
            name: "Solar LED Path Lights (4-Pack)",
            price: "from $40",
            href: "https://www.amazon.com/s?k=solar+led+path+light+outdoor+4+pack&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Towels & Hooks",
        products: [
          {
            name: "Dark Hot Tub Towels (Navy)",
            qty: "×4",
            notes: "Separate from bath towels",
            price: "from $18",
            href: "https://www.amazon.com/s?k=pool+towels+navy+dark+color+bulk&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Outdoor Towel Rack (Weatherproof)",
            price: "from $55",
            href: "https://www.amazon.com/s?k=outdoor+towel+rack+weatherproof+wall+mount&tag=fortecaesta08-20",
          },
        ],
      },
      {
        title: "Safety & Rules",
        products: [
          {
            name: "Waterproof Hot Tub Rules Sign",
            price: "from $20",
            href: "https://www.amazon.com/s?k=hot+tub+rules+sign+waterproof+outdoor&tag=fortecaesta08-20",
            priority: "essential",
          },
          {
            name: "Non-Slip Hot Tub Step Mat",
            price: "from $32",
            href: "https://www.amazon.com/s?k=non+slip+outdoor+mat+hot+tub+pool&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
      {
        title: "Drinkware",
        products: [
          {
            name: "Unbreakable Wine Glasses",
            notes: "No glass near tub",
            price: "from $35",
            href: "https://www.amazon.com/s?k=unbreakable+wine+glasses+plastic+12+pack&tag=fortecaesta08-20",
            priority: "essential",
          },
        ],
      },
    ],
  },
];
