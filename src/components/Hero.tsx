import { Music, Sparkles, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/TN-DJSet.jpg"
          alt="Jonna Rincon"
          className="w-full h-full object-cover lg:object-right"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-purple-700 rounded-full filter blur-3xl opacity-15" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center px-4 sm:px-8 lg:px-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Image Focus (on desktop it's already shown, on mobile it's hidden) */}
            <div className="hidden lg:block relative h-screen -ml-16 -my-32">
              {/* This is where the background image will shine through */}
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center space-y-8 animate-fade-in">
              {/* Icon */}
              <div className="flex justify-start">
                <div className="relative">
                  <Music className="w-16 h-16 text-purple-400 neon-glow animate-pulse float-animation" />
                  <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl"></div>
                </div>
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-spin" style={{animationDuration: '4s'}} />
                  <span className="text-sm md:text-base font-semibold text-purple-300 tracking-widest uppercase">
                    Producer • Designer • Beatmaker
                  </span>
                </div>

                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight tracking-tighter">
                  <span className="block bg-gradient-to-r from-purple-200 via-purple-400 to-pink-400 bg-clip-text text-transparent neon-glow animate-slide-up" style={{animationDelay: '0s'}}>
                    JONNA
                  </span>
                  <span className="block bg-gradient-to-r from-purple-300 to-purple-600 bg-clip-text text-transparent neon-glow animate-slide-up" style={{animationDelay: '0.1s'}}>
                    RINCON
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg font-light animate-fade-in" style={{animationDelay: '0.3s'}}>
                Crafting premium beats and sonic experiences that elevate your artistry
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in" style={{animationDelay: '0.5s'}}>
                <a
                  href="#beats"
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-lg font-bold text-lg transition-all duration-300 neon-border hover:scale-105 active:scale-95 shadow-2xl hover:shadow-purple-500/50 overflow-hidden flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Play className="w-5 h-5" fill="currentColor" />
                    Browse Beats
                  </span>
                  <div className="absolute inset-0 shimmer"></div>
                </a>

                <a
                  href="#music"
                  className="group relative px-8 py-4 border-2 border-purple-500/50 rounded-lg font-bold text-lg transition-all duration-300 hover:border-purple-400 hover:bg-purple-600/20 hover:scale-105 active:scale-95 backdrop-blur-sm bg-white/5 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span className="relative z-10">Listen Now</span>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-12 border-t border-purple-500/20 animate-fade-in" style={{animationDelay: '0.7s'}}>
                <div className="group">
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    500+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold tracking-wider uppercase">
                    Beats
                  </div>
                </div>
                <div className="group">
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    1K+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold tracking-wider uppercase">
                    Clients
                  </div>
                </div>
                <div className="group">
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    5+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold tracking-wider uppercase">
                    Years
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20 lg:hidden">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-purple-400 rounded-full neon-glow"></div>
        </div>
      </div>

      {/* Scroll Indicator Desktop */}
      <div className="absolute bottom-12 right-12 hidden lg:block animate-bounce z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-purple-300 font-light">Scroll</span>
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}