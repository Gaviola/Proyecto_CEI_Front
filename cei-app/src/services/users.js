// Asegúrate de tener estas variables de entorno configuradas en tu archivo .env.local
// NEXT_PUBLIC_API_URL=http://192.168.194.158:8080
// NEXT_PUBLIC_API_TOKEN=tu-token-jwt-aquí

export const getUserByEmail = async (email) => {
  try {
    // Construir la URL con el correo electrónico como parámetro de consulta
    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_URL
    }/admin/users/email/${encodeURIComponent(email)}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      // Manejar diferentes códigos de estado según tu API
      if (response.status === 404) {
        console.warn("Usuario no encontrado");
        return null;
      } else {
        const errorText = await response.text();
        throw new Error(`Error al obtener el usuario: ${errorText}`);
      }
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error en getUserByEmail:", error);
    throw error;
  }
};

export const getUserByID = async (id) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn("Usuario no encontrado");
        return null;
      } else {
        const errorText = await response.text();
        throw new Error(`Error al obtener el usuario: ${errorText}`);
      }
    }

    const user = await response.json();
    console.log("getUserByID", user);
    return user;
  } catch (error) {
    console.error("Error en getUserByID:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/users`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al obtener los usuarios: ${errorText}`);
    }

    const users = await response.json();

    console.log("fetchUsers", users);
    return users;
  } catch (error) {
    console.error("Error en fetchUsers:", error);
    throw error;
  }
}
