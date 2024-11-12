// Cargar datos desde localStorage
const storedItemsData = JSON.parse(localStorage.getItem('itemsData')) || [];

export const itemsData = storedItemsData.length > 0 ? storedItemsData : [
  { id: 1, name: "Zapatilla", price:0, img:"" },

  { id: 2, name: "Ping-Pong", price:0, img:""  },

  { id: 3, name: "Mate Completo", price:0, img:"/mate-termo.jpg"  },

  { id: 4, name: "Cubiertos", price:0, img:"" },

  { id: 5, name: "Platos", price:0, img:"" },

  { id: 6, name: "Casco", price:0 , img:"" },

  { id: 7, name: "Calculadora", price:0, img:""  },

  { id: 9, name: "Escalimetro", price:0, img:"" },

  { id: 10, name: "Hojas", price:0, img:"" },
  { id: 11, name: "Taza", price:0 , img:"" },

  { id: 12, name: "Termo", price:0 , img:"" },

  { id: 13, name: "Cartas de Truco", price:0, img:"" },

  { id: 14, name: "Cable USB-C\n", price:0, img:"" },

  { id: 15, name: "Tupper\n", price:0, img:"" },

  { id: 17, name: "Cargador", price:0, img:""  },

  { id: 8, name: "Mouse", price:0, img:""  },
];

export const updateItemPrice = (id, newPrice) => {
  const item = itemsData.find((item) => item.id === id);
  if (item) {
    item.price = newPrice;
    // Guardar datos actualizados en localStorage
    localStorage.setItem('itemsData', JSON.stringify(itemsData));
  }
};
