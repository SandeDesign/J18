import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import BeatStore from './components/BeatStore';
import Music from './components/Music';
import LiveStudio from './components/LiveStudio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import { Beat, CartItem } from './lib/types';
import { database } from './lib/database';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (beat: Beat, license: 'basic' | 'premium' | 'exclusive') => {
    let price = beat.price;
    if (license === 'premium') price = beat.price * 1.5;
    if (license === 'exclusive') price = beat.price * 3;

    const newItem: CartItem = { beat, license, price };
    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  const handleRemoveItem = (beatId: string) => {
    setCartItems(cartItems.filter((item) => item.beat.id !== beatId));
  };

  const handleCheckout = () => {
    // Create order in Bolt database
    const order = {
      email: 'customer@example.com', // This would come from a form
      beat_ids: cartItems.map(item => item.beat.id),
      total_amount: cartItems.reduce((sum, item) => sum + item.price, 0),
      license_types: cartItems.reduce((acc, item) => {
        acc[item.beat.id] = item.license;
        return acc;
      }, {} as Record<string, string>),
      status: 'pending',
    };
    
    database.orders.create(order).then(() => {
      alert('Order created successfully! Check console for details.');
      console.log('Order created:', order);
      setCartItems([]); // Clear cart
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation cartItemCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <main className="pt-20">
        <Hero />
        <About />
        <BeatStore onAddToCart={handleAddToCart} />
        <Music />
        <LiveStudio />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
