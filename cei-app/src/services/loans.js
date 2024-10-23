export const saveLoan = async (loanData) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/loans`;

    console.log("Guardando préstamo:", loanData);
    try {
      const response = await fetch(apiUrl, {
        method: "POST", // PUT para modificar, POST para nuevo
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

      const savedLoanID = await response.json();
      console.log("Préstamo guardado con éxito");
      return savedLoanID;

    } catch (error) {
      console.error("Error en saveLoan:", error);
      throw error; // Re-lanza el error para que handleSaveLoan lo maneje
    }
  };

export const saveLoanItem = async (loanItemData) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/loan-items`;

    console.log("Guardando ítem de préstamo:", loanItemData);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify(loanItemData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al guardar el ítem del préstamo: ${errorMessage}`);
      }

      const savedLoanItemID = await response.json();
      console.log("Ítem de préstamo guardado con éxito");
      return savedLoanItemID;

    } catch (error) {
      console.error("Error en saveLoanItem:", error);
      throw error;
    }
}