export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
              NEXYON Admin
            </h1>
            <p className="text-gray-400">Painel administrativo</p>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email Administrativo</label>
              <input
                type="email"
                placeholder="admin@exemplo.com"
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Acessar Painel
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              ← Voltar para homepage
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
