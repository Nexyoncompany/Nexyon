export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NEXYON
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </a>
                <a href="#" className="text-white/70 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Trending
                </a>
                <a href="#" className="text-white/70 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Categories
                </a>
                <a href="#" className="text-white/70 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  About
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6">
            Discover the Future of{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Trending Products
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Curated viral products from global trends, powered by AI to bring you the most sought-after items in ecommerce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Shop Trending
            </button>
            <button className="border-2 border-white/20 hover:border-white/40 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 backdrop-blur-sm bg-white/5">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Trending Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Viral Product {item}</h3>
                <p className="text-gray-400 mb-4">Trending item curated by AI for maximum appeal.</p>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nexyon Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Why Nexyon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Curated</h3>
              <p className="text-gray-400">Advanced AI algorithms analyze global trends to curate the perfect products.</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Trends</h3>
              <p className="text-gray-400">Access trending products from around the world, from TikTok to Amazon.</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Selection</h3>
              <p className="text-gray-400">Only the highest quality, most viral products make it to our curated list.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            NEXYON
          </h3>
          <p className="text-gray-400 mb-6">The future of trending product discovery.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">© 2024 Nexyon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
