export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h1 className="text-3xl font-bold text-center mb-2">Entrar</h1>
          <p className="text-gray-400 text-center mb-8">Acesse sua conta NEXYON</p>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="seu-email@exemplo.com"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Não tem conta?{' '}
            <a href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Criar uma
            </a>
          </p>

          <p className="text-center text-gray-400 mt-4 text-sm">
            É administrador?{' '}
            <a href="/admin/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Acessar painel
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
