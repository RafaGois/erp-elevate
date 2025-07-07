import { NextRequest, NextResponse } from 'next/server';

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    /* const users = await fetchUsers();
    return NextResponse.json(users); */
    return NextResponse.json([{id: 1, name: "Item 1"}, {id: 2, name: "Item 2"}])
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' }, 
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newUser = await createUser(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar usuário' }, 
      { status: 400 }
    );
  }
}

// PUT /api/users
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updatedUser = await updateUser(body);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário' }, 
      { status: 400 }
    );
  }
}

// DELETE /api/users
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await deleteUser(id);
    return NextResponse.json({ message: 'Usuário deletado' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar usuário' }, 
      { status: 400 }
    );
  }
}