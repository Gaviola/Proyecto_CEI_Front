export const getEveryItemType = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/item-types`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al obtener los tipos de ítems: ${errorMessage}`);
    }

    const itemTypes = await response.json();
    return itemTypes;
  } catch (error) {
    console.error("Error en getEveryItemType:", error);
    throw error;
  }
};

export const getItemsByType = async (itemType) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/items/available/${encodeURIComponent(itemType)}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al obtener los ítems del tipo ${itemType}: ${errorMessage}`);
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Error en getItemsByType:", error);
    throw error;
  }
}

export const getItemTypeByID = async (itemTypeID) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/item-types/${itemTypeID}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al obtener el tipo de ítem con ID ${itemTypeID}: ${errorMessage}`);
    }

    const itemType = await response.json();
    return itemType;
  } catch (error) {
    console.error("Error en getItemTypeByID:", error);
    throw error;
  }
}
