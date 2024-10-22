export const saveLoan = async (loanData) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/loans`;

    try {
      const response = await fetch(apiUrl, {
        method: loanData.id ? "PUT" : "POST", // PUT para modificar, POST para nuevo
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify(loanData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al guardar el préstamo: ${errorMessage}`);
      }

      const savedLoan = await response.json(); // Asumiendo que el back-end devuelve el préstamo guardado
      console.log("Préstamo guardado con éxito:", savedLoan);
      return savedLoan;
    } catch (error) {
      console.error("Error en saveLoan:", error);
      throw error; // Re-lanza el error para que handleSaveLoan lo maneje
    }
  };