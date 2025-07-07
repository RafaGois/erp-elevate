import { NextApiRequest, NextApiResponse } from 'next';
import controller from '@/lib/controllers/user.controller';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const data = await controller.getAllItems(req, res);
  return NextResponse.json(data)
}

export async function POST(req: NextRequest, res: NextResponse) {
  return controller.createItem(req, res);
}
