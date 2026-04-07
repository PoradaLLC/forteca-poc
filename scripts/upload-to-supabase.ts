/**
 * Upload property photos to Supabase Storage
 *
 * Usage: npx tsx scripts/upload-to-supabase.ts
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { config } from "dotenv";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = "property-images";
const ASSETS_DIR = "/Users/michalbienias/Documents/PSM_Github/forteca-poc-assets/directstays-all-photos";
const MAX_PHOTOS_PER_PROPERTY = 12; // hero + featured + 10 gallery

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function uploadFile(localPath: string, storagePath: string): Promise<string | null> {
  const file = readFileSync(localPath);
  const contentType = localPath.endsWith(".png") ? "image/png" : "image/jpeg";

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error(`  ✗ ${storagePath}: ${error.message}`);
    return null;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function main() {
  console.log("Uploading property photos to Supabase Storage...\n");

  const folders = readdirSync(ASSETS_DIR).filter(
    (f) => !f.startsWith(".") && f !== "MANIFEST.txt"
  );

  const results: Record<string, string[]> = {};

  for (const folder of folders) {
    const folderPath = join(ASSETS_DIR, folder);
    const files = readdirSync(folderPath)
      .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort()
      .slice(0, MAX_PHOTOS_PER_PROPERTY);

    console.log(`${folder} (${files.length} photos)...`);
    const urls: string[] = [];

    for (const file of files) {
      const localPath = join(folderPath, file);
      const storagePath = `${folder}/${file}`;
      const url = await uploadFile(localPath, storagePath);
      if (url) urls.push(url);
    }

    results[folder] = urls;
    console.log(`  ✓ ${urls.length} uploaded\n`);
  }

  // Output SQL updates
  console.log("\n--- SQL to update properties with image URLs ---\n");

  // Mapping from folder names to slugs
  const folderToSlug: Record<string, string> = {
    "01-cabin-wle-wallenpaupack": "lake-wallenpaupack-poconos-wle-pa-pet-friendly",
    "02-pocono-escape-hot-tub-pool": "pocono-escape-w-hot-tub-pool",
    "03-mountain-lake-getaway": "mountain-lake-getaway-with-hot-tub",
    "04-bushkill-bliss": "bushkill-bliss-w-hot-tub-near-falls-shawnee",
    "05-log-cabin-retreat-jim-thorpe": "log-cabin-retreat-w-hot-tub-in-poconosjim-thorpe",
    "06-poconos-mountain-escape-pool": "poconos-mountain-escape-whot-tub-game-room-pool",
    "07-cozy-long-island-apartment": "cozy-long-island-1bd-apartment-near-the-beaches",
    "08-country-retreat-warwick": "5bd-ultimate-country-retreat-w-pool-in-warwick",
    "09-perfect-pocono-escape": "perfect-pocono-escape-hot-tub-sauna-outdoor-tv",
    "10-cozy-mountain-getaway-bushkill": "cozy-mountaingetaway-near-bushkill-whottubsauna",
    "11-bluestone-retreat": "bluestone-retreat-w-hottub-game-room-in-poconos",
    "12-blvck-cabin-4": "newest-blvck-cabin-4-wpool-hot-tub-outdoor-tv",
    "13-blvck-cabin-1": "blvck-cabin-i-w-wood-hot-tub-near-bushkill-falls",
    "14-blvck-cabin-2": "modern-blvck-cabin-2-near-bushkill-falls-hot-tub",
    "15-blve-cabin": "blve-cabin-wood-hottub-near-bushkill-falls",
    "16-scenic-cabin-bushkill": "scenic-cabin-by-bushkill-falls-shawnee-whot-tub",
    "17-arctic-getaway": "arctic-getaway-whot-tub-outdoor-tv-near-bushkill",
    "18-cozy-ranch-by-lake": "cozy-ranch-by-the-lake-whot-tub-in-the-mountains",
    "19-spacious-4br-escape-pool": "gorgeous-4br-with-hot-tub-pool",
    "20-cabin-retreat-catskills": "cabin-retreat-in-catskills-by-the-river-w-hot-tub",
    "21-charming-lake-cabin-wallenpaupack": "charming-3bd-lake-cabin-by-wallenpaupack",
    "22-cozy-chalet-wallenpaupack": "cozy-chalet-by-lake-wallenpaupack-w-hottub",
    "23-lovely-rental-long-island": "lovely-rental-unit-on-long-island",
    "24-blvck-cabin-3": "modern-blvck-cabin-3-near-bushkill-fall-hot-tub",
    "25-mountain-zen-lake-harmony": "mountain-zen-townhome-private-hot-tub-lake-harmony",
    "26-nature-escape-wood-hot-tub": "nature-escape-w-wood-burning-hot-tub-in-poconos",
    "27-ocean-breeze-pensacola": "ocean-breeze-in-pensacola-10-min-from-beach",
    "28-pine-getaway-bushkill": "pine-getaway-by-bushkill-falls-w-hot-tub",
    "29-pocono-retreat-camelback-kalahari": "pocono-retreat-w-hottubgamescamelbackkalahari",
    "30-luxury-townhome-daytona-beach": "relaxing-luxury-townhome-whot-tub-by-daytonabeach",
    "31-white-cabin-by-lake": "white-cabin-by-lake-whot-tub-sauna-game-room",
    "32-mountain-escape-pool-sauna": "mountain-escape-wpool-hot-tub-sauna-game-room",
    "33-blue-forest-hideaway": "nice-house-in-blakeslee",
    "34-natures-retreat-pond": "pond-haven-retreat-wwood-burning-hottub-firepit",
    "35-beaver-creek-hut-catskills": "beaver-creek-hut-2bdlog-cabin-retreat-in-catskills",
    "36-jack-frost-townhome-ski": "jack-frost-townhome-escape-ski-in-out-w-hot-tub",
    "37-green-utopia-kalahari": "the-green-utopia-whot-tub-firepit-by-kalahari",
    "38-summitgrove-cabin": "summitgrove-cabin-w-hot-tub-game-room-outdoortv",
    "39-pocono-country-place": "pocono-country-place-getaway-whot-tub-fire-pit",
    "40-modern-a-frame-retreat": "modern-a-frame-retreat-w-hot-tub-saunagame-room",
    "41-lake-naomi-treehouse": "lake-naomi-mountain-treehouse-retreat-wgame-room",
    "42-rustic-heaven-4bd": "4bd-modern-rustic-heaven-whot-tubsauna-in-pocono",
    "43-chic-retreat-indian-mountain": "chic-forest-cabin-in-pocono-hot-tub-outdoor-tv",
    "44-charming-cabin-woods": "charming-cabin-in-the-woods-whot-tub-firepit",
  };

  for (const [folder, urls] of Object.entries(results)) {
    const slug = folderToSlug[folder];
    if (!slug || urls.length === 0) continue;

    const images = urls.map((url, i) => ({
      src: url,
      alt: i === 0 ? "Hero" : i === 1 ? "Featured" : `Gallery ${i - 1}`,
    }));

    const imagesJson = JSON.stringify(images).replace(/'/g, "''");
    console.log(
      `UPDATE properties SET images = '${imagesJson}'::jsonb WHERE slug = '${slug}';`
    );
  }

  console.log("\nDone!");
}

main().catch(console.error);
