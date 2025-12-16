import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function Navigation({ cartItemCount = 0, onCartClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/login';

    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'artist':
        return '/artist/dashboard';
      case 'user':
        return '/customer/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 glass border-b border-purple-500/30 backdrop-blur-xl shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/Logo.png"
              alt="Jonna Rincon"
              className="w-20 h-20 group-hover:scale-110 transition-all duration-300"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.8)) drop-shadow(0 0 40px rgba(236, 72, 153, 0.6))',
              }}
            />
            <span
              className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.8)) drop-shadow(0 0 20px rgba(236, 72, 153, 0.6))',
              }}
            >
              JONNA RINCON
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-white hover:text-purple-400 transition-all duration-300 font-bold hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Home
            </Link>
            <Link
              to="/shop/beats"
              className="text-white hover:text-purple-400 transition-all duration-300 font-bold hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Shop
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="hidden md:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 text-white font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hidden md:block px-4 py-2 glass rounded-lg neon-border-subtle hover:neon-border transition-all hover:scale-105 text-white font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:block px-4 py-2 glass rounded-lg neon-border-subtle hover:neon-border transition-all hover:scale-105 text-white font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden md:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 text-white font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}

            {onCartClick && (
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
            )}

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
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/shop/beats"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Shop
              </Link>
              {user ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-purple-400 transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    className="text-white hover:text-purple-400 transition-colors font-medium text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-purple-400 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-purple-400 transition-colors font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
