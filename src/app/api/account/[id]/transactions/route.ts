import {NextRequest} from 'next/server';
import flexxNextApiService from '@/app/api/FlexxNextApiService/FlexxNextApiService';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  const {id} = await params;
  return flexxNextApiService().get({url: `account/${id}/transactions`, req});
}
