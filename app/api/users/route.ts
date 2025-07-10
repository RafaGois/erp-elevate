import { NextRequest, NextResponse } from 'next/server';
import * as service from '@/lib/services/user.service';
import { HttpError } from 'http-errors';
import {User} from '@/lib/models/User';
import { handleError } from '@/lib/utils/withErrorHandler';


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

    const body = await request.json() as User;
    const data = await service.create(body);

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return handleError(err as HttpError);
  }
};