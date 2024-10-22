import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { Loan } from "../admin/loans/page";
import { DateInput } from "@nextui-org/date-input";
import { DateValue, parseDate } from "@internationalized/date";
import type { PressEvent } from "@react-types/shared";
import { User } from "../admin/users/page";
import { form } from "framer-motion/client";

type LoanFormData = {
  id: number;
  deliveryDate: DateValue;
  deliveryResponsible: string;
  email: string;
  borrowedItem: string;
  term: number;
  returnDate: DateValue;
  receptionResponsible: string;
  amount: number;
  paymentMethod: string;
  observation: string;
  status: string;
};

type ValidString = {
  String: string;
  Valid: boolean;
};

type ValidDate = {
  String: DateValue;
  Valid: boolean;
}

type SendDataFormat = {
  id: number;
  deliveryDate: ValidDate; 
  returnDate: ValidDate;   
  endingDate?: ValidDate; 
  deliveryResponsible: number | string; 
  borrowerName?: number; 
  email: string;
  observation: ValidString;  
  amount: number;
  paymentMethod: ValidString; 
  status: string; 
  borrowedItem: string;
}

export default function LoanModal({
  loan,
  loans,
  setLoans,
}: {
  loan: Loan | null;
  loans: Loan[];
  setLoans: (loans: Loan[]) => void;
}) {
  const [formData, setFormData] = useState<LoanFormData>({
    id: loan?.id || 0,
    deliveryDate: loan?.deliveryDate ? parseDate(loan.deliveryDate) : parseDate("2024-04-04"),
    deliveryResponsible: loan?.deliveryResponsible || "",
    email: loan?.email || "",
    borrowedItem: loan?.borrowedItem || "",
    term: loan?.term || 0,
    returnDate: loan?.returnDate ? parseDate(loan.returnDate) : parseDate("2024-04-04"),
    receptionResponsible: loan?.receptionResponsible || "",
    amount: loan?.amount || 0,
    paymentMethod: loan?.paymentMethod || "",
    observation: loan?.observation || "",
    status:loan?.status || "Active",
  });

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [error, setError] = useState<string | null>(null);

  const onPressNewLoan = () => {
    setFormData({
      id: 0,
      deliveryDate: parseDate("2024-04-04"),
      deliveryResponsible: "",
      email: "",
      borrowedItem: "",
      term: 0,
      returnDate: parseDate("2024-04-04"),
      receptionResponsible: "",
      amount: 0,
      paymentMethod: "",
      observation: "",
      status:"Active",
    });
    onOpen();
  };

 

  // const handleSaveLoan = () => {
  //   // Si el ID es 0, es un nuevo préstamo
  //   if (formData.id === 0) {
  //     // Asigna un nuevo ID, asumiendo que los IDs son números consecutivos
  //     const newId = loans.length > 0 ? loans[loans.length - 1].id + 1 : 1;
  //     const newLoan = { ...formData, id: newId };
  //     setLoans([...loans, newLoan]);
  //   } else {
  //     // Actualiza el préstamo existente
  //     const updatedLoans = loans.map((l) =>
  //       l.id === formData.id ? formData : l
  //     );
  //     setLoans(updatedLoans);
  //   }
  //   // Cierra el modal
  //   onClose();
  // };

  const handleSaveLoan = async () => {
    try {

      console.log(formData.email)

      const user = await getUserByEmail(formData.email);
      
      if (user) {

        console.log(user)

        //Sets data format to send to the API
        const cleanData:SendDataFormat = {
          id: user.id,
          deliveryDate: {String:formData.deliveryDate, Valid:formData.deliveryDate.toString() !== ""}, 
          deliveryResponsible: formData.deliveryResponsible,
          email: user.email,
          borrowerName: user.id,
          borrowedItem: formData.borrowedItem,
          returnDate: {String:formData.returnDate, Valid:formData.returnDate.toString() !== ""}, 
          amount: formData.amount,
          paymentMethod: {String:formData.paymentMethod, Valid:formData.paymentMethod !== ""},
          observation: {String:formData.observation, Valid:formData.observation !== ""},
          status:formData.status,
        };

        const savedLoan = await saveLoan(cleanData);

        if (formData.email === "") {
          // Nuevo préstamo
          setLoans([...loans, savedLoan]);
        } else {
          // Préstamo existente
          const updatedLoans = loans.map((l) =>
            l.id === savedLoan.id ? savedLoan : l
          );
          setLoans(updatedLoans);
        }

      }

      // Cierra el modal
      onClose();
    } catch (error) {
      console.error("Error saving loan:", error);
      setError(
        "Hubo un problema al guardar el préstamo. Por favor, inténtalo de nuevo."
      );
    }
  };

  const saveLoan = async (loanData: SendDataFormat) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/loans`;

    try {
      const response = await fetch(apiUrl, {
        method: loanData.id ? "PUT" : "POST", // PUT para modificar, POST para nuevo
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Usa variables de entorno
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


  // Asegúrate de tener estas variables de entorno configuradas en tu archivo .env.local
  // NEXT_PUBLIC_API_URL=http://192.168.194.158:8080
  // NEXT_PUBLIC_API_TOKEN=tu-token-jwt-aquí

  const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      // Construir la URL con el correo electrónico como parámetro de consulta
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/users/email/${encodeURIComponent(email)}`;

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

      const user: User = await response.json();
      return user;
    } catch (error) {
      console.error("Error en getUserByEmail:", error);
      throw error;
    }
  };

  return (
    <>
      <Button
        color="default"
        className="border-primaryGreen-500 bg-primaryGreen-500 text-white mr-4 mb-4"
        onPress={onPressNewLoan}
      >
        Nuevo Préstamo
      </Button>

      <Button
        color="default"
        className="border-primaryGreen-500 bg-primaryGreen-500 text-white mb-4"
        onPress={() => {
          if (loan) {
            console.log("Modificando préstamo:", loan); 

            setFormData({
              id: loan.id,
              deliveryDate: parseDate(loan.deliveryDate),
              deliveryResponsible: loan.deliveryResponsible,
              email: loan.email,
              borrowedItem: loan.borrowedItem,
              term: loan.term,
              returnDate: parseDate(loan.returnDate),
              receptionResponsible: loan.receptionResponsible,
              amount: loan.amount,
              paymentMethod: loan.paymentMethod,
              observation: loan.observation,
              status: loan.status,
            });
            onOpen();
          }
        }}
      >
        Modificar Préstamo
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
        placement="center"
        classNames={{
          base: "w-[80%] max-h-[80%] ",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {loan ? "Modificar Préstamo" : "Nuevo Préstamo"}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <Input
                  label="Plazo (días)"
                  value={formData.term.toString()}
                  onChange={(e) =>
                    setFormData({ ...formData, term: parseInt(e.target.value) })
                  }
                />

                <DateInput
                  label="Fecha de entrega"
                  value={formData.deliveryDate}
                  onChange={(newDate) =>
                    setFormData({ ...formData, deliveryDate: newDate })
                  }
                />

                <DateInput
                  label="Fecha de devolución"
                  value={formData.returnDate}
                  onChange={(newDate) =>
                    setFormData({ ...formData, returnDate: newDate })
                  }
                />

                <Input
                  label="Monto ($)"
                  value={formData.amount.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: parseInt(e.target.value),
                    })
                  }
                />
                <Input
                  label="Método de pago"
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                />
                <Input
                  label="Observación"
                  value={formData.observation}
                  onChange={(e) =>
                    setFormData({ ...formData, observation: e.target.value })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={handleSaveLoan}>
                  Guardar
                </Button>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}