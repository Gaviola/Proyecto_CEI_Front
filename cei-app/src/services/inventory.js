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
