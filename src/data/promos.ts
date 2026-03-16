export interface Promo {
  id: string;
  title: string;
  description: string;
  image: string;
  originalPrice?: number;
  promoPrice: number;
  includes: string[];
  whatsappMessage: string;
  badge?: string;
}

export const promos: Promo[] = [
  {
    id: 'promo-cuernito-licuado',
    title: 'Cuernito Especial + Licuado',
    description: 'Cuernito de jamón, queso, huevo estrellado, tocino y salchicha + Licuado de Chocomilk',
    image: '/src/assets/promo/promo1.png',
    originalPrice: 95,
    promoPrice: 75,
    includes: [
      'Cuernito con jamón',
      'Queso derretido',
      'Huevo estrellado',
      'Tocino',
      'Salchicha',
      'Licuado de Chocomilk'
    ],
    whatsappMessage:
      'Hola, me interesa la promoción del Cuernito Especial con jamón, queso, huevo estrellado, tocino y salchicha + Licuado de Chocomilk por $75 MXN',
    badge: 'Promo'
  },

  {
    id: 'promo-hotcakes-licuado',
    title: 'Hot Cakes + Licuado',
    description: '3 Hot Cakes con fruta (plátano o manzana) + Licuado de Chocomilk o plátano',
    image: '/src/assets/promo/promo2.png',
    originalPrice: 110,
    promoPrice: 95,
    includes: [
      '3 Hot Cakes',
      'Fruta (Plátano o Manzana)',
      'Miel o topping',
      'Licuado de Chocomilk o Plátano'
    ],
    whatsappMessage:
      'Hola, me interesa la promoción de 3 Hot Cakes con fruta + Licuado de Chocomilk o plátano por $95 MXN',
    badge: 'Promo'
  }
  
];
