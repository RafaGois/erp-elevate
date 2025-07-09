import { NextRequest, NextResponse } from 'next/server';
import * as service from '@/lib/services/equipamentExit.service';
import { HttpError } from 'http-errors';
import { handleError } from '@/lib/utils/withErrorHandler';
import EquipamentExit from '@/lib/models/EquipamentExit';

export async function GET() {
  try {
    const data = await service.findAll();
    return NextResponse.json(data, { status: 200 });

  } catch (err) {
    return handleError(err as HttpError);
  }
};

export async function POST(request: NextRequest) {
  try {

    const body = await request.json() as EquipamentExit;
    const data = await service.create(body);

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return handleError(err as HttpError);
  }
};