import postgres from "postgres";

async function main() {
  const url = process.env.DATABASE_URL ?? "postgresql://finans:finans@127.0.0.1:5432/finans";
  const sql = postgres(url);

  const tables = await sql`
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' 
    ORDER BY tablename
  `;
  console.log(
    "Mevcut tablolar:",
    tables.map((t) => t.tablename),
  );

  try {
    const w = await sql`SELECT count(*) as c FROM weeks`;
    console.log("weeks count:", w[0]?.c);
  } catch (e) {
    console.error("weeks ERROR:", (e as Error).message);
  }

  try {
    const l = await sql`SELECT count(*) as c FROM lessons`;
    console.log("lessons count:", l[0]?.c);
  } catch (e) {
    console.error("lessons ERROR:", (e as Error).message);
  }

  try {
    const ls = await sql`SELECT count(*) as c FROM lesson_sources`;
    console.log("lesson_sources count:", ls[0]?.c);
  } catch (e) {
    console.error("lesson_sources ERROR:", (e as Error).message);
  }

  try {
    const lp = await sql`SELECT count(*) as c FROM lesson_prompts`;
    console.log("lesson_prompts count:", lp[0]?.c);
  } catch (e) {
    console.error("lesson_prompts ERROR:", (e as Error).message);
  }

  await sql.end();
}

main();
