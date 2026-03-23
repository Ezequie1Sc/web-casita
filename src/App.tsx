import { useState } from 'react';
import { Navbar, Footer } from './components/common';
import { Hero, Menu, Promotions, SurpriseGifts } from './components/sections';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleWhatsApp = (message: string) => {
    if (!message.trim()) return;

    const phoneNumber = '529961136244';
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
        <Hero 
          onNavigate={handleNavigate}
          onCartClick={() => setIsCartOpen(true)}  // ← Aquí la prop faltante
        />
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