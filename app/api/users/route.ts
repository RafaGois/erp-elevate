import { NextResponse } from 'next/server';
import * as service from '@/lib/services/user.service';

const HTTP_STATUS_500 = 500;
const INTERNAL_SERVER_ERROR = 'Erro interno do servidor';

export async function GET() {
    try {
      const data = await service.findAll();
      return NextResponse.json(data, { status: 200 });

    } catch (err) {
      console.log(err);
      
      return new Response(null, {
        status: HTTP_STATUS_500,
        statusText:  INTERNAL_SERVER_ERROR,
      });
    }
};


/* 
export const POST = withErrorHandler(async (req: NextRequest) => {
  const data = await controller.createItem(req);
  return NextResponse.json(data, { status: 201 });
});
*/

// PUT /api/users?id=123 - Atualizar usuário
/* export const PUT = withErrorHandler(async (req: NextRequest) => {
  const data = await service.updateUser(req);
  return NextResponse.json(data, { status: 200 });
}); */