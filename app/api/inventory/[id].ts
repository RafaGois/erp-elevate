import { NextRequest, NextResponse } from 'next/server';

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    /* const users = await fetchUsers();
    return NextResponse.json(users); */
    const { id } = request.nextUrl.searchParams;

    return NextResponse.json({id: id});
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' }, 
      { status: 500 }
    );
  }
}