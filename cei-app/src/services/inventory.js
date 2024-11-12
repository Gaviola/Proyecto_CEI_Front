export const getEveryItemType = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/item-types`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
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
  const apiUrl = `${
    process.env.NEXT_PUBLIC_API_URL
  }/admin/items/available/${encodeURIComponent(itemType)}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error al obtener los ítems del tipo ${itemType}: ${errorMessage}`
      );
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Error en getItemsByType:", error);
    throw error;
  }
};

export const getItemTypeByID = async (itemTypeID) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/item-types/${itemTypeID}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error al obtener el tipo de ítem con ID ${itemTypeID}: ${errorMessage}`
      );
    }

    const itemType = await response.json();
    return itemType;
  } catch (error) {
    console.error("Error en getItemTypeByID:", error);
    throw error;
  }
};

export const createItemType = async (itemType) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/item-types`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: JSON.stringify(itemType),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al crear el tipo de ítem: ${errorMessage}`);
    }

    console.log("Item creado correctamente");
  } catch (error) {
    console.error("Error en createItemType:", error);
    throw error;
  }
};

export const updateItemType = async (itemType) => {
  console.log("updateItemType", itemType);
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/item-types/${itemType.id}`;

  try {
    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: JSON.stringify(itemType),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error al actualizar el tipo de ítem con ID ${itemType.id}: ${errorMessage}`
      );
    }

    console.log("Tipo de ítem actualizado con éxito");
  } catch (error) {
    console.error("Error en updateItemType:", error);
    throw error;
  }
};

export const deleteItemType = async (itemTypeID) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/item-types/${itemTypeID}`;

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error al eliminar el tipo de ítem con ID ${itemTypeID}: ${errorMessage}`
      );
    }

    console.log("Tipo de ítem eliminado con éxito");
  } catch (error) {
    console.error("Error en deleteItemType:", error);
    throw error;
  }
};

export const getItemsForUser = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/getItems`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al obtener los ítems: ${errorMessage}`);
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Error en getItemsForUser:", error);
    throw error;
  }
};
