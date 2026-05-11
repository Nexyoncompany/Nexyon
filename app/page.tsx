export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0ea5e922,transparent_50%)]"></div>

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-md">
        
        <h1 className="text-3xl font-bold tracking-[0.2em] text-cyan-400">
          NEXYON
        </h1>

        <nav className="hidden md:flex gap-8 text-sm text-white/70">
          <a href="#">Trending</a>
          <a href="#">Amazon Finds</a>
          <a href="#">Tech</a>
          <a href="#">Lifestyle</a>
        </nav>

        <button className="bg-cyan-400 text-black px-5 py-2 rounded-full font-medium hover:scale-105 transition">
          Explore
        </button>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">

        <div className="max-w-5xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">

          <span className="inline-block mb-6 px-4 py-1 rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 text-sm">
            FUTURE OF SHOPPING
          </span>

          <h2 className="text-5xl md:text-7xl font-black leading-tight">
            Viral Products <br />
            Powered by <span className="text-cyan-400">AI Trends</span>
          </h2>

          <p className="mt-8 text-lg text-white/60 max-w-2xl mx-auto">
            Discover the most viral products from TikTok, Instagram and Amazon.
            Curated globally with futuristic technology and premium experience.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <button className="bg-cyan-400 text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
              Shop Now
            </button>

            <button className="border border-white/20 px-8 py-4 rounded-2xl hover:bg-white/5 transition">
              View Trends
            </button>

          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="relative z-10 px-8 pb-24">

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-cyan-400/40 transition"
            >

              <div className="h-64 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-900/20 mb-6"></div>

              <h3 className="text-2xl font-bold mb-3">
                Viral Gadget #{item}
              </h3>

              <p className="text-white/60 mb-6">
                Futuristic trending product optimized for global ecommerce sales.
              </p>

              <button className="w-full bg-cyan-400 text-black py-3 rounded-xl font-semibold hover:scale-105 transition">
                View Product
              </button>

            </div>
          ))}

        </div>
      </section>

    </main>
  );
}
