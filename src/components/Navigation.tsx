import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Music } from 'lucide-react';

interface NavigationProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export default function Navigation({ cartItemCount, onCartClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 glass border-b border-purple-500/30 backdrop-blur-xl shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <Music className="w-10 h-10 text-purple-400 neon-glow group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <span className="text-2xl font-black neon-glow bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">JONNA RINCON</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-white hover:text-purple-400 transition-all duration-300 font-bold hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Home
            </a>
            <a
              href="#beats"
              className="text-white hover:text-purple-400 transition-all duration-300 font-bold hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Beats
            </a>
            <a
              href="#music"
              className="text-white hover:text-purple-400 transition-all duration-300 font-bold hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Music
            </a>
            <a
              href="#contact"
              className="text-white hover:text-purple-400 transition-all duration-300 font-bold hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden md:block px-4 py-2 glass rounded-lg neon-border-subtle hover:neon-border transition-all hover:scale-105 text-white font-medium"
            >
              Login
            </Link>
            <Link
              to="/admin/dashboard"
              className="hidden md:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 text-white font-medium"
            >
              Admin
            </Link>
            <button
              onClick={onCartClick}
              className="relative p-3 glass rounded-full neon-border-subtle hover:neon-border transition-all hover:scale-110 active:scale-95 group/cart"
            >
              <ShoppingCart className="w-6 h-6 group-hover/cart:animate-pulse" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-xs font-black neon-border-subtle animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 glass rounded-full neon-border-subtle hover:neon-border transition-all hover:scale-110 active:scale-95"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-purple-500/30">
            <div className="flex flex-col gap-4">
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#beats"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Beats
              </a>
              <a
                href="#music"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Music
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
