import { NextResponse } from "next/server";
import pgClient from "../../../../pg/pg"

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { searchTerm: string };
  }
) {
  const client = await pgClient.connect();
  
  try {
    const searchTerm = params.searchTerm;

    const query = `
      SELECT 
        scryfall_id,
        name,
        set,
        border_crop_url
      FROM scryfall
      WHERE LOWER(name) LIKE LOWER($1)
      LIMIT 15;
    `;
    
    const res = await client.query(query, [`%${searchTerm}%`]);
  
    const data = res.rows;

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    client.release();
  }
}
