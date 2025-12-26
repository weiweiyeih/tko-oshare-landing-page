import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

export async function getLandingPages() {
  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEET_ID!,
    serviceAccountAuth
  );

  await doc.loadInfo();
  
  // Try to get sheet by title first, otherwise use the first sheet
  const sheet = doc.sheetsByTitle["landing_pages"] || doc.sheetsByIndex[0];
  
  if (!sheet) {
    throw new Error("No sheet found in the Google Spreadsheet");
  }
  
  const rows = await sheet.getRows();

  return rows.map(row => ({
    slug: row.get("slug"),
    title: row.get("title"),
    subtitle: row.get("subtitle"),
    heroImage: row.get("img_hero"),
    description: row.get("description"),
    category: row.get("category"),
    ctaText: row.get("cta_text"),
    ctaLink: row.get("cta_link"),
    price: row.get("price"),
    regularPrice: row.get("regular_price"),
    themeColor: row.get("theme_color"),
    tag: row.get("tag"),
    qty: row.get("qty"),
    img1: row.get("img_1"),
    img2: row.get("img_2"),
    img3: row.get("img_3"),
    spec: row.get("spec"),
    reviewerName: row.get("reviewer_name"),
    reviewerEmail: row.get("reviewer_email"),
    reviewerComment: row.get("reviewer_comment"),
    reviewerScore: row.get("reviewer_score"),
  }));
}
