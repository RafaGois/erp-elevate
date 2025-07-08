import { NextResponse } from "next/server";
import { NextRequest } from 'next/server';

import * as service from '@/lib/services/user.service';
import { handleError } from "@/lib/utils/withErrorHandler";
import { HttpError } from "http-errors";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {

        const id = (await params).id;
        const data = await service.findById(id);

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return handleError(err as HttpError);
    }
};

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {

        const id = (await params).id;
        const data = await service.remove(id);

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return handleError(err as HttpError);
    }
}