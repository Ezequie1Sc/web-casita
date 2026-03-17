import { useState } from 'react';
import { Navbar, Footer } from './components/common';
import { Hero, Menu, Promotions, SurpriseGifts } from './components/sections';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const handleNavigate = (section: string): void => {
    const element = document.getElementById(section);
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = (message: string): void => {
    if (!message) return;

    const phoneNumber = '521234567890';
    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <CartProvider>
      <Navbar
        onNavigate={handleNavigate}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main>
        <Hero onNavigate={handleNavigate} />
        <Menu />
        <Promotions onWhatsAppClick={handleWhatsApp} />
        <SurpriseGifts />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </CartProvider>
  );
}

export default App;