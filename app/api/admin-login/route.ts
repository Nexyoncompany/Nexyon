import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Usar variáveis de ambiente com fallback
    const adminEmail = process.env.ADMIN_EMAIL || 'nexyoncompany@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Nexyonadm1981';

    // Validar credenciais
    if (email === adminEmail && password === adminPassword) {
      // Criar resposta com cookie
      const response = NextResponse.json(
        { success: true, message: 'Login realizado com sucesso' },
        { status: 200 }
      );

      // Definir cookie com role=admin e duração de 7 dias
      response.cookies.set('admin-session', JSON.stringify({ role: 'admin' }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 dias em segundos
        path: '/',
      });

      return response;
    } else {
      // Credenciais inválidas
      return NextResponse.json(
        { success: false, message: 'Email ou senha inválidos.' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Erro ao processar login:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao processar login.' },
      { status: 500 }
    );
  }
}

