import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const sql = readFileSync("/tmp/image-updates.sql", "utf8");
  const statements = sql.split("\n").filter((s) => s.trim().startsWith("UPDATE"));

  console.log(`Executing ${statements.length} image updates...`);

  let success = 0;
  let failed = 0;

  for (const stmt of statements) {
    const { error } = await supabase.rpc("exec_sql", { query: stmt }).maybeSingle();
    if (error) {
      // Try direct approach - parse the SQL and use the client
      const slugMatch = stmt.match(/WHERE slug = '([^']+)'/);
      const imagesMatch = stmt.match(/images = '(.+)'::jsonb/);
      if (slugMatch && imagesMatch) {
        const slug = slugMatch[1];
        const images = JSON.parse(imagesMatch[1]);
        const { error: err2 } = await supabase
          .from("properties")
          .update({ images })
          .eq("slug", slug);
        if (err2) {
          console.error(`  ✗ ${slug}: ${err2.message}`);
          failed++;
        } else {
          success++;
        }
      } else {
        console.error(`  ✗ Parse error`);
        failed++;
      }
    } else {
      success++;
    }
  }

  console.log(`Done! ${success} updated, ${failed} failed.`);

  // Verify
  const { data } = await supabase
    .from("properties")
    .select("slug, images")
    .limit(3);
  for (const p of data || []) {
    const imgs = Array.isArray(p.images) ? p.images : [];
    console.log(`  ${p.slug}: ${imgs.length} images`);
  }
}

main().catch(console.error);
