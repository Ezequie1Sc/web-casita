export interface SurpriseGift {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  includes: string[];
  occasion: 'san valentin' | 'cumpleaños' | 'aniversario' | 'amor' | 'amistad' | 'gracias' | 'personalizado';
  occasionLabel: string;
  whatsappMessage: string;
  isPopular?: boolean;
}

export const surpriseGifts: SurpriseGift[] = [
  {
    id: 'san-valentin-1',
    title: 'Desayuno San Valentín',
    description: 'El detalle perfecto para expresar tu amor',
    image: '/src/assets/hotcakes.jpg',
    price: 189,
    occasion: 'san valentin',
    occasionLabel: '💕 San Valentín',
    includes: [
      '3 Hot Cakes en forma de corazón',
      'Fresas con chocolate',
      'Jugo de naranja natural',
      'Mensaje personalizado',
      'Globo metálico',
      'Caja decorativa'
    ],
    whatsappMessage: 'Hola, me interesa el Desayuno San Valentín para sorprender a mi persona especial',
    isPopular: true
  },
  {
    id: 'cumpleanos-1',
    title: 'Desayuno Cumpleaños',
    description: 'Celebra un año más de vida con un desayuno especial',
    image: '/src/assets/hotcakes.jpg',
    price: 169,
    occasion: 'cumpleaños',
    occasionLabel: '🎂 Cumpleaños',
    includes: [
      '3 Hot Cakes con vela',
      'Frutas frescas',
      'Café o chocolate caliente',
      'Tarjeta de felicitación',
      'Confeti comestible',
      'Corona de cumpleaños'
    ],
    whatsappMessage: 'Hola, quiero sorprender a alguien especial con un Desayuno de Cumpleaños',
    isPopular: true
  },
  {
    id: 'aniversario-1',
    title: 'Desayuno Aniversario',
    description: 'Celebra tu amor con un desayuno inolvidable',
    image: '/src/assets/hotcakes.jpg',
    price: 199,
    occasion: 'aniversario',
    occasionLabel: '💑 Aniversario',
    includes: [
      'Hot Cakes con Nutella y fresas',
      'Copa de fresas con crema',
      'Café especial',
      'Botella de vino espumoso',
      'Foto polaroid',
      'Carta de amor'
    ],
    whatsappMessage: 'Hola, quiero celebrar mi aniversario con un desayuno sorpresa',
    isPopular: true
  },
  {
    id: 'amor-1',
    title: 'Caja Sorpresa Amor',
    description: 'Una cajita llena de amor y antojitos',
    image: '/src/assets/hotcakes.jpg',
    price: 149,
    occasion: 'amor',
    occasionLabel: '💘 Para enamorar',
    includes: [
      'Mini hot cakes',
      'Chocolates',
      'Mensaje personalizado',
      'Osito de peluche pequeño',
      'Globo mini',
      'Fresas cubiertas'
    ],
    whatsappMessage: 'Hola, quiero regalar la Caja Sorpresa de Amor'
  },
  {
    id: 'amistad-1',
    title: 'Desayuno Amigas',
    description: 'Para celebrar la amistad más especial',
    image: '/src/assets/hotcakes.jpg',
    price: 159,
    occasion: 'amistad',
    occasionLabel: '👯 Amistad',
    includes: [
      '2 porciones de hot cakes',
      '2 cafés o jugos',
      'Frutas mixtas',
      'Mensaje para amigas',
      'Pulseras de la amistad',
      'Fotos instantáneas'
    ],
    whatsappMessage: 'Hola, quiero sorprender a mi mejor amiga con un desayuno especial'
  },
  {
    id: 'gracias-1',
    title: 'Desayuno Agradecimiento',
    description: 'Demuestra tu gratitud de una manera deliciosa',
    image: '/src/assets/hotcakes.jpg',
    price: 139,
    occasion: 'gracias',
    occasionLabel: '🙏 Gracias',
    includes: [
      'Hot Cakes sencillos',
      'Bebida caliente',
      'Tarjeta de agradecimiento',
      'Dulce artesanal',
      'Detalle sorpresa'
    ],
    whatsappMessage: 'Hola, quiero dar las gracias con un desayuno especial'
  },
  {
    id: 'personalizado-1',
    title: 'Desayuno Personalizado',
    description: 'Crea tu propio desayuno sorpresa',
    image: '/src/assets/hotcakes.jpg',
    price: 0, // Precio variable
    occasion: 'personalizado',
    occasionLabel: '✨ Personalizado',
    includes: [
      'Elige tus hot cakes',
      'Elige tus untables',
      'Elige tus frutas',
      'Elige tu bebida',
      'Elige tu mensaje',
      'Elige tu peluche'
    ],
    whatsappMessage: 'Hola, quiero personalizar un desayuno sorpresa, ¿pueden ayudarme?'
  }
];