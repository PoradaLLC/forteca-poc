import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const scraped = JSON.parse(readFileSync("/tmp/forteca-scraped.json", "utf8"));

const first5: Record<string, { description: string; amenities: string[] }> = {
  "blvck-cabin-i-w-wood-hot-tub-near-bushkill-falls": { description: "Escape to the designer Black Cabin near Bushkill Falls--your perfect mountain getaway. Surrounded by forest and within walking distance to peaceful creek access for kayaking or fishing.", amenities: ["AC", "Hot Tub", "Kitchen", "TV", "Wi-Fi", "BBQ", "Fire Pit", "Coffee Maker", "Free Parking", "Indoor Fireplace", "EV Charger", "Washer", "Dryer"] },
  "pocono-escape-w-hot-tub-pool": { description: "Escape to this spacious 4BD Poconos retreat. Enjoy a large backyard with a pool, fire pit, and a deck with dining area and hot tub overlooking an outdoor TV.", amenities: ["AC", "Hot Tub", "Kitchen", "Pool", "TV", "Wi-Fi", "BBQ", "Fire Pit", "Coffee Maker", "Free Parking", "Indoor Fireplace", "Washer", "Dryer", "Pool Table"] },
  "scenic-cabin-by-bushkill-falls-shawnee-whot-tub": { description: "Cozy cabin near Bushkill Falls with wood burning hot tub and fire pit. Three spacious bedrooms and an open concept kitchen with modern appliances.", amenities: ["AC", "Hot Tub", "Kitchen", "TV", "Wi-Fi", "BBQ", "Fire Pit", "Coffee Maker", "Free Parking", "Home Theater", "EV Charger", "Washer", "Dryer"] },
  "newest-blvck-cabin-4-wpool-hot-tub-outdoor-tv": { description: "Modern rustic luxury at our all-black 3BR cabin in the Poconos. In-ground pool, wood-fired hot tub, and cozy firepit.", amenities: ["AC", "Hot Tub", "Kitchen", "Pool", "TV", "Wi-Fi", "BBQ", "Fire Pit", "Coffee Maker", "Free Parking", "Indoor Fireplace", "Washer", "Dryer"] },
  "cabin-retreat-in-catskills-by-the-river-w-hot-tub": { description: "Cozy A-frame cabin on 50 acres of private land near Minnewaska Park. Wood and stone interior with fireplace. Hot tub, fire pit, and hammock.", amenities: ["AC", "Hot Tub", "Kitchen", "TV", "Wi-Fi", "BBQ", "Fire Pit", "Hammock", "Coffee Maker", "Free Parking", "Washer", "Dryer"] },
};

const scrapedMap: Record<string, { description: string; amenities: string[] }> = {};
for (const s of scraped) {
  const desc = (s.description || "").replace(/^[:\s"]+/, "").replace(/["\s,]+$/, "").substring(0, 500);
  const amenities = (s.amenities || [])
    .map((a: string) => a.replace(/^["\s[\]]+|["\s[\]]+$/g, "").trim())
    .filter((a: string) => a && a.length > 1 && a.length < 40 && !a.startsWith("{"));
  scrapedMap[s.slug] = { description: desc, amenities };
}
Object.assign(scrapedMap, first5);

const listings: [string, string, string, number, number, number][] = [
  ["Cabin at WLE by Wallenpaupack w/Game Room & Hot Tub", "lake-wallenpaupack-poconos-wle-pa-pet-friendly", "Lake Ariel, PA", 5, 2, 12],
  ["Pocono Escape w/ Hot Tub & Pool", "pocono-escape-w-hot-tub-pool", "Albrightsville, PA", 4, 2, 12],
  ["Mountain-Lake Getaway with Hot Tub", "mountain-lake-getaway-with-hot-tub", "Albrightsville, PA", 2, 1, 7],
  ["Bushkill Bliss w/ Hot tub near Falls & Shawnee", "bushkill-bliss-w-hot-tub-near-falls-shawnee", "East Stroudsburg, PA", 3, 2, 10],
  ["Log Cabin Retreat W/ Hot Tub in Poconos/Jim Thorpe", "log-cabin-retreat-w-hot-tub-in-poconosjim-thorpe", "Albrightsville, PA", 2, 1, 6],
  ["Poconos Mountain Escape w/Hot Tub, Game Room & Pool", "poconos-mountain-escape-whot-tub-game-room-pool", "Albrightsville, PA", 3, 2, 10],
  ["Cozy Long Island 1BD Apartment near the beaches", "cozy-long-island-1bd-apartment-near-the-beaches", "Copiague, NY", 1, 1, 2],
  ["4BD Ultimate Country Retreat w/ Pool in Warwick", "5bd-ultimate-country-retreat-w-pool-in-warwick", "Warwick, NY", 4, 3, 15],
  ["Perfect Pocono Escape Hot Tub Sauna Outdoor TV", "perfect-pocono-escape-hot-tub-sauna-outdoor-tv", "Albrightsville, PA", 2, 1, 6],
  ["Cozy Mountain Getaway near Bushkill w/HotTub & Sauna", "cozy-mountaingetaway-near-bushkill-whottubsauna", "East Stroudsburg, PA", 3, 2, 8],
  ["BlueStone Retreat w/ HotTub & Game Room in Poconos", "bluestone-retreat-w-hottub-game-room-in-poconos", "Coolbaugh Township, PA", 4, 3, 12],
  ["BLVCK Cabin 4 w/ In-ground Pool, Hot tub & Firepit", "newest-blvck-cabin-4-wpool-hot-tub-outdoor-tv", "Albrightsville, PA", 3, 2, 10],
  ["BLVCK Cabin I w/ wood Hot Tub near Bushkill Falls", "blvck-cabin-i-w-wood-hot-tub-near-bushkill-falls", "East Stroudsburg, PA", 3, 2, 8],
  ["BLVCK Cabin 2 near Falls w/HotTub, Sauna & Game Room", "modern-blvck-cabin-2-near-bushkill-falls-hot-tub", "East Stroudsburg, PA", 3, 2, 10],
  ["BLVE Cabin With Hottub/Sauna/Cold Plunge/Game Room", "blve-cabin-wood-hottub-near-bushkill-falls", "East Stroudsburg, PA", 3, 2, 10],
  ["Scenic Cabin by Bushkill Falls & Shawnee w/Hot Tub", "scenic-cabin-by-bushkill-falls-shawnee-whot-tub", "East Stroudsburg, PA", 3, 2, 10],
  ["Arctic Getaway w/Hot Tub & Sauna near Bushkill", "arctic-getaway-whot-tub-outdoor-tv-near-bushkill", "East Stroudsburg, PA", 3, 2, 8],
  ["Cozy Ranch by the Lake w/Hot Tub in the Mountains", "cozy-ranch-by-the-lake-whot-tub-in-the-mountains", "Albrightsville, PA", 4, 3, 14],
  ["Spacious 4BR Escape Pool, Hot tub, Sauna & Game Room", "gorgeous-4br-with-hot-tub-pool", "East Stroudsburg, PA", 4, 2, 10],
  ["Cabin Retreat in Catskills by the River w/ Hot Tub", "cabin-retreat-in-catskills-by-the-river-w-hot-tub", "Grahamsville, NY", 4, 1, 9],
  ["Charming 3BD Lake Cabin by Wallenpaupack", "charming-3bd-lake-cabin-by-wallenpaupack", "Greentown, PA", 3, 1, 6],
  ["Cozy Chalet by Lake Wallenpaupack w/ HotTub", "cozy-chalet-by-lake-wallenpaupack-w-hottub", "Greentown, PA", 3, 2, 10],
  ["Lovely Rental Unit on Long Island", "lovely-rental-unit-on-long-island", "Copiague, NY", 1, 1, 3],
  ["BLVCK Cabin 3 Hot Tub/Sauna Near Bushkill/Shawnee", "modern-blvck-cabin-3-near-bushkill-fall-hot-tub", "East Stroudsburg, PA", 4, 2, 10],
  ["Mountain Zen Townhome Private Hot Tub Lake Harmony", "mountain-zen-townhome-private-hot-tub-lake-harmony", "Lake Harmony, PA", 3, 3, 15],
  ["Nature Escape w/ Wood Burning Hot Tub in Poconos", "nature-escape-w-wood-burning-hot-tub-in-poconos", "Albrightsville, PA", 4, 2, 12],
  ["Ocean Breeze in Pensacola 10 min from Beach", "ocean-breeze-in-pensacola-10-min-from-beach", "Pensacola, FL", 3, 2, 10],
  ["Pine Getaway by Bushkill Falls w/ Hot tub", "pine-getaway-by-bushkill-falls-w-hot-tub", "East Stroudsburg, PA", 3, 2, 8],
  ["Pocono Retreat W/ Hottub/Games/Camelback/Kalahari", "pocono-retreat-w-hottubgamescamelbackkalahari", "Tobyhanna, PA", 5, 3, 10],
  ["Relaxing Luxury Townhome w/Hot Tub by Daytona Beach", "relaxing-luxury-townhome-whot-tub-by-daytonabeach", "Port Orange, FL", 2, 2, 6],
  ["White Cabin by Lake w/Hot Tub Sauna & Game Room", "white-cabin-by-lake-whot-tub-sauna-game-room", "Albrightsville, PA", 3, 2, 8],
  ["Mountain Escape w/Pool, Hot Tub, Sauna & Game Room", "mountain-escape-wpool-hot-tub-sauna-game-room", "East Stroudsburg, PA", 4, 2, 10],
  ["Blue Forest Hideaway w/Hot Tub by Pocono Raceway", "nice-house-in-blakeslee", "Blakeslee, PA", 2, 1, 4],
  ["Natures Retreat w/ Pond, Sauna, HotTub & FirePit", "pond-haven-retreat-wwood-burning-hottub-firepit", "Mount Bethel, PA", 2, 1, 6],
  ["Beaver Creek Hut 2BD Log Cabin Retreat in Catskills", "beaver-creek-hut-2bdlog-cabin-retreat-in-catskills", "East Branch, NY", 2, 1, 4],
  ["Jack Frost Townhome Escape Ski In & Out W/ Hot Tub", "jack-frost-townhome-escape-ski-in-out-w-hot-tub", "White Haven, PA", 3, 3, 10],
  ["The Green Utopia w/Hot tub & FirePit by Kalahari", "the-green-utopia-whot-tub-firepit-by-kalahari", "Long Pond, PA", 3, 2, 8],
  ["Summitgrove Cabin w/ Hot tub, Game Room & Outdoor TV", "summitgrove-cabin-w-hot-tub-game-room-outdoortv", "Long Pond, PA", 3, 2, 6],
  ["Pocono Country Place Getaway w/Hot Tub & Fire Pit", "pocono-country-place-getaway-whot-tub-fire-pit", "Tobyhanna, PA", 4, 2, 8],
  ["Modern A-Frame Retreat w/ Hot Tub, Sauna & Game Room", "modern-a-frame-retreat-w-hot-tub-saunagame-room", "Emerald Lakes, PA", 3, 2, 8],
  ["Lake Naomi-Mountain Treehouse Retreat w/Game Room", "lake-naomi-mountain-treehouse-retreat-wgame-room", "Pocono Pines, PA", 4, 2, 10],
  ["4BD Modern Rustic Heaven w/Hot Tub & Sauna in Pocono", "4bd-modern-rustic-heaven-whot-tubsauna-in-pocono", "Albrightsville, PA", 4, 2, 9],
  ["Chic Retreat In Pocono - Hot Tub, Sauna & Outdoor TV", "chic-forest-cabin-in-pocono-hot-tub-outdoor-tv", "Indian Mountain Lake, PA", 2, 1, 6],
  ["Charming Cabin in the Woods w/Hot tub & Firepit", "charming-cabin-in-the-woods-whot-tub-firepit", "Albrightsville, PA", 2, 1, 6],
];

const pricing: Record<number, number> = { 1: 100, 2: 175, 3: 250, 4: 325, 5: 400 };
const cleaningFees: Record<number, number> = { 1: 75, 2: 100, 3: 150, 4: 175, 5: 200 };

async function main() {
  const rows = listings.map(([name, slug, location, bedrooms, bathrooms, max_guests]) => {
    const s = scrapedMap[slug] || { description: name, amenities: ["Hot Tub", "Wi-Fi", "Kitchen", "Free Parking"] };
    return {
      slug,
      name,
      tagline: name,
      description: s.description,
      location,
      bedrooms,
      bathrooms,
      max_guests,
      base_price: pricing[bedrooms] || 250,
      cleaning_fee: cleaningFees[bedrooms] || 150,
      min_nights: 2,
      amenities: [...new Set(s.amenities)].slice(0, 15),
      images: [] as string[],
      status: "active",
    };
  });

  console.log(`Inserting ${rows.length} properties...`);
  const { error } = await supabase.from("properties").insert(rows);
  if (error) {
    console.error("Insert error:", error.message);
    process.exit(1);
  }

  const { count } = await supabase.from("properties").select("*", { count: "exact", head: true });
  console.log(`Done! ${count} properties in DB.`);
}

main().catch(console.error);
