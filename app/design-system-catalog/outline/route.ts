import { getFullCatalogOutline } from '@/mresalat/catalog-book/FullCatalogBook';

export function GET() {
  return Response.json(getFullCatalogOutline());
}
