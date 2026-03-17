import type { MenuCategory } from '../types/menu';

export const menuData: MenuCategory[] = [
  {
    id: 'todos',
    name: 'Todos',
    icon: 'menu',
    items: [] // Se llenará dinámicamente
  },
  {
    id: 'chilaquiles',
    name: 'Chilaquiles',
    icon: 'fire',
    items: [
      {
        id: 'chilaquiles-rojos',
        name: 'Chilaquiles Rojos',
        description: 'Deliciosos chilaquiles bañados en salsa roja, acompañados de pollo deshebrado',
        price: { regular: 60 },
        image: '/src/assets/menu/chilaquiles.jpg',
        category: 'Chilaquiles',
        extras: ['Huevo estrellado +$10'],
        isPopular: true
      }
    ]
  },
  {
    id: 'enchiladas',
    name: 'Enchiladas Rojas',
    icon: 'fire',
    items: [
      {
        id: 'enchiladas-pollo',
        name: 'Enchiladas Rojas de Pollo',
        description: '3 enchiladas bañadas en salsa roja, rellenas de pollo, con crema, queso y cebolla',
        price: { regular: 75 },
        image: '/src/assets/menu/enchilidas.jpg',
        category: 'Enchiladas',
        extras: ['Huevo estrellado +$10', 'Crema extra +$5', 'Queso extra +$5'],
        isPopular: true
      },
    ]
  },
 
  {
    id: 'hotcakes',
    name: 'Hot Cakes',
    icon: 'layers',
    items: [
      {
        id: 'hotcakes-sencillo',
        name: 'Sencillo (3 piezas)',
        description: '3 hot cakes con 1 untable',
        price: { regular: 50 },
        image: '/src/assets/menu/hotcakes.jpg',
        category: 'Hot Cakes Normales',
        options: ['Lechera', 'Miel', 'Dulce de Leche', 'Mermelada', 'Hershey\'s', 'Nutella']
      },
      {
        id: 'hotcakes-fruta',
        name: 'Con Fruta (3 piezas)',
        description: '3 hot cakes con 1 untable y manzana o plátano',
        price: { regular: 65 },
        image: '/src/assets/menu/hotcake-manza.jpg',
        category: 'Hot Cakes Normales'
      },
      {
        id: 'hotcakes-fresa-chocolate',
        name: 'Fresa y Chocolate (3 piezas)',
        description: '3 hot cakes con fresa y chocolate',
        price: { regular: 70 },
        image: '/src/assets/menu/hotcakes-fresa.jpg',
        category: 'Hot Cakes Normales',
        isPopular: true
      },
      {
        id: 'hotcakes-philadelphia',
        name: 'Glaseado Philadelphia (3 piezas)',
        description: '3 hot cakes con 2 frutas y 2 untables',
        price: { regular: 90 },
        image: '/src/assets/menu/hotcakes.jpg',
        category: 'Hot Cakes Normales'
      },
      {
        id: 'minis-10',
        name: 'Minis 10 piezas',
        description: 'Hot cakes minis con 1 fruta y 1 untable',
        price: { regular: 35 },
        image: '/src/assets/menu/mini-fresa.jpg',
        category: 'Hot Cakes Minis'
      }
    ]
  },
  {
    id: 'sandwiches',
    name: 'Sándwiches y Cuernitos',
    icon: 'rectangle-stack',
    items: [
      {
        id: 'sandwich-clasico',
        name: 'Clásica Jamón y Queso',
        description: 'Incluye vegetales',
        price: { regular: 30 },
        image: '/src/assets/menu/sanwich-clasico.jpg',
        category: 'Sándwiches'
      },
      {
        id: 'sandwich-especial',
        name: 'Especial',
        description: 'Jamón, queso, huevo estrellado, pollo y vegetales',
        price: { regular: 55 },
        image: '/src/assets/menu/sanwich-especial.jpg',
        category: 'Sándwiches',
        isPopular: true
      },
      {
        id: 'club-papas',
        name: 'Club con Papas',
        description: 'Jamón, queso, salchicha, huevo estrellado, pollo y vegetales',
        price: { regular: 75 },
        image: '/src/assets/menu/club-con-papas.jpg',
        category: 'Sándwiches'
      },
      {
        id: 'cuernito-papas',
        name: 'Cuernito con Papas',
        description: 'Jamón, queso, salchicha, huevo estrellado, pollo, vegetales y una orden de papas',
        price: { regular: 75 },
        image: '/src/assets/menu/cuernito-papas.jpg',
        category: 'Sándwiches'
      },
      {
        id: 'cuernito',
        name: 'Cuernito',
        description: 'Jamón, queso, salchicha, huevo estrellado, pollo, vegetales',
        price: { regular: 55 },
        image: '/src/assets/menu/cuernito.jpg',
        category: 'Sándwiches'
      }
    ]
  },
  {
    id: 'hotdogs',
    name: 'Hot Dogs',
    icon: 'minus',
    items: [
      {
        id: 'hotdog',
        name: 'Hot Dog',
        description: 'Orden de 2 piezas con salchicha, tomate, cebolla frita, tocino, jalapeño y romantía',
        price: { regular: 60 },
        image: '/src/assets/menu/hotdog-papas.jpg',
        category: 'Hot Dogs',
        options: ['Con papas']
      }
    ]
  },
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    icon: 'circle-stack-3x',
    items: [
      {
        id: 'hamburguesa-papas',
        name: 'Hamburguesa con Papas',
        description: 'Hamburguesa con carne casera, lechuga, tomate, cebolla frita, jamón, queso, tocino, jalapeño y papas',
        price: { regular: 75 },
        image: '/src/assets/menu/hamburguesa.jpg',
        category: 'Hamburguesas'
      }
    ]
  },
  {
    id: 'burritas',
    name: 'Burritas',
    icon: 'chevron-right',
    items: [
      {
        id: 'burritas',
        name: 'Burritas',
        description: 'Orden de 3 piezas con jamón, queso, romantía y salsas',
        price: { regular: 50 },
        image: '/src/assets/menu/burritas.jpg',
        category: 'Burritas'
      }
    ]
  },
  {
    id: 'papas',
    name: 'Papas',
    icon: 'queue-list',
    items: [
      {
        id: 'papas-fritas',
        name: 'Orden de Papas',
        description: 'Crujientes papas a la francesa',
        price: { regular: 35 },
        image: '/src/assets/menu/papas.jpg',
        category: 'Papas'
      }
    ]
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    icon: 'beaker',
    items: [
      {
        id: 'coca-600',
        name: 'Coca-Cola 600 ml',
        price: { regular: 25 },
        image: '/src/assets/menu/coca.png',
        category: 'Embotellados'
      },
      {
        id: 'sabor-600',
        name: 'Refresco de Sabor 600 ml',
        price: { regular: 25 },
        image: '/src/assets/menu/sabor.png',
        category: 'Embotellados'
      },
      {
        id: 'jumex',
        name: 'Jugo Jumex Cajita',
        price: { regular: 15 },
        image: '/src/assets/menu/jumex.png',
        category: 'Embotellados'
      },
      {
        id: 'chocomilk',
        name: 'Licuado de Chocomilk',
        price: { regular: 40 },
        image: '/src/assets/menu/licuado-chocomilk.jpg',
        category: 'Licuados'
      },
      {
        id: 'platano-licuado',
        name: 'Licuado de Plátano',
        price: { regular: 40 },
        image: '/src/assets/menu/licuado-avena.png',
        category: 'Licuados'
      },
      {
        id: 'manzana-licuado',
        name: 'Licuado de Manzana',
        price: { regular: 40 },
        image: '/src/assets/menu/licuado-avena.png',
        category: 'Licuados'
      },
      {
        id: 'frutos-rojos',
        name: 'Licuado de Frutos Rojos',
        price: { regular: 40 },
        image: '/src/assets/menu/frutos-rojos.png',
        category: 'Licuados',
        isPopular: true
      },
      {
        id: 'fresa-licuado',
        name: 'Licuado de Fresa',
        price: { regular: 45 },
        image: '/src/assets/menu/licuado-frutos.jpg',
        category: 'Licuados'
      },
      {
        id: 'avena',
        name: 'Licuado de Avena',
        price: { regular: 45 },
        image: '/src/assets/menu/licuado-avena.png',
        category: 'Licuados'
      }
    ]
  }
];

// Función para obtener todos los items (para la categoría "Todos")
export const getAllMenuItems = () => {
  const allItems: any[] = [];
  menuData.forEach(category => {
    if (category.id !== 'todos') {
      allItems.push(...category.items);
    }
  });
  return allItems;
};

// Llenar la categoría "Todos" con todos los items
menuData[0].items = getAllMenuItems();