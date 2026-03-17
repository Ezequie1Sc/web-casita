import { Navbar, Footer } from './components/common';
import { Hero, Menu, Promotions, SurpriseGifts } from './components/sections';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';
import { useState } from 'react';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = (message: string) => {
    const phoneNumber = '521234567890';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <CartProvider>
      <Navbar 
        onNavigate={handleNavigate} 
        onCartClick={() => setIsCartOpen(true)}
      />
      <Hero onNavigate={handleNavigate} />
      <Menu />
      <Promotions onWhatsAppClick={handleWhatsApp} />
      <SurpriseGifts />
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </CartProvider>
  );
}

export default App;