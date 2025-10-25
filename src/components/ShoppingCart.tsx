import { X, ShoppingCart as CartIcon, Trash2 } from 'lucide-react';
import { CartItem } from '../lib/types';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (beatId: string) => void;
  onCheckout: () => void;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onCheckout,
}: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div className="fixed right-0 top-0 h-full w-full md:w-[450px] glass border-l border-purple-500/30 z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <CartIcon className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold neon-glow">Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-purple-900/30 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <CartIcon className="w-20 h-20 text-purple-400/30 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all neon-border-subtle"
              >
                Browse Beats
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div
                    key={`${item.beat.id}-${item.license}-${index}`}
                    className="glass rounded-xl p-4 neon-border-subtle"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.beat.artwork_url}
                        alt={item.beat.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-purple-200">
                          {item.beat.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          {item.beat.artist}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-purple-900/30 rounded-full border border-purple-500/30">
                            {item.license.charAt(0).toUpperCase() + item.license.slice(1)}
                          </span>
                          <span className="text-xs text-gray-400">
                            {item.beat.bpm} BPM • {item.beat.key}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => onRemoveItem(item.beat.id)}
                          className="p-2 hover:bg-red-900/30 rounded-lg transition-all text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-purple-300">
                          €{item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-purple-500/30 pt-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg text-gray-400">Subtotal</span>
                  <span className="text-2xl font-bold text-purple-300 neon-glow">
                    €{total.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  All beats include instant download and license agreement
                </p>
                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-lg transition-all neon-border hover:scale-105"
                >
                  Proceed to Checkout
                </button>
              </div>

              <div className="glass rounded-xl p-4 neon-border-subtle">
                <h3 className="font-semibold mb-2 text-purple-200">License Info</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Basic: MP3 download, unlimited plays</li>
                  <li>• Premium: WAV + stems, commercial use</li>
                  <li>• Exclusive: Full rights, no resale</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
