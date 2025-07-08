import { NextRequest, NextResponse } from 'next/server';

// GET /api/users
export async function GET(request: NextRequest) {
  try {

    return NextResponse.json({id: id});
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' }, 
      { status: 500 }
    );
  }
}