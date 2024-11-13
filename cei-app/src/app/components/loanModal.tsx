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
import { Key, useEffect, useState } from "react";
import { Loan } from "../admin/loans/page";
import { DateInput } from "@nextui-org/date-input";
import { DateValue, parseDate } from "@internationalized/date";
import type { PressEvent } from "@react-types/shared";
import { User } from "../admin/users/page";
import { form } from "framer-motion/client";
import { saveLoan, saveLoanItem, updateLoan } from "../../services/loans";
import { getUserByEmail } from "../../services/users";
import { getEveryItemType, getItemsByType } from "../../services/inventory";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { CustomCheckbox } from "./customCheckbox";
import { useMemo } from "react";
import {
  Select,
  SelectSection,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { set } from "lodash";
import { send } from "process";

type LoanFormData = {
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
  borrowedItem: number;
};

type ValidString = {
  String: string;
  Valid: boolean;
};

type ValidDate = {
  String: string;
  Valid: boolean;
};

type SendDataFormat = {
  id: number;
  deliveryDate: ValidDate;
  returnDate: ValidDate;
  endingDate?: ValidDate;
  deliveryResponsible: number | string;
  borrowerName?: number;
  //email: string;
  observation: ValidString;
  amount: number;
  paymentMethod: ValidString;
  status: string;
  itemType: number;
};

export default function LoanModal({
  loan,
  loans,
  setLoans,
  fetchAndFormatLoans,
  items,
}: {
  loan: Loan | null;
  loans: Loan[];
  setLoans: (loans: Loan[]) => void;
  fetchAndFormatLoans: () => void;
  items: { id: number; name: string }[];
}) {
  const [formData, setFormData] = useState<LoanFormData>({
    id: loan?.id || 0,
    deliveryDate: {
      String: loan?.deliveryDate.String || "",
      Valid: loan?.deliveryDate.String !== "",
    },
    deliveryResponsible: loan?.deliveryResponsible || "",
    borrowedItem: loan?.itemType || 0,
    returnDate: {
      String: loan?.returnDate.String || "",
      Valid: loan?.returnDate.String !== "",
    },
    amount: loan?.amount || 0,
    paymentMethod: {
      String: loan?.paymentMethod.String || "",
      Valid: loan?.paymentMethod.String !== "",
    },
    observation: {
      String: loan?.observation.String || "",
      Valid: loan?.observation.String !== "",
    },
    status: loan?.status || "",
    email: "",
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [error, setError] = useState<string | null>(null);
  const [groupSelected, setGroupSelected] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<Key>();
  //const [items, setItems] = useState<{ id: number; name: string }[]>([]);

  const onPressNewLoan = () => {
    setFormData({
      id: 0,
      deliveryDate: {
        String: "2000-01-01",
        Valid: true,
      },
      deliveryResponsible: 1,
      borrowedItem: 0,
      returnDate: {
        String: "2000-01-01",
        Valid: true,
      },
      amount: 0,
      paymentMethod: {
        String: "",
        Valid: false,
      },
      observation: {
        String: "",
        Valid: false,
      },
      status: "Active",
      email: "",
    });
    onOpen();
  };

  const onPressEditLoan = () => {
    if (loan) {
      setFormData({
        id: loan?.id,
        deliveryDate: {
          String: formatDateYMD(loan?.deliveryDate),
          Valid: loan?.deliveryDate.Valid,
        },
        deliveryResponsible: loan?.deliveryResponsible,
        borrowedItem: loan?.itemType,
        returnDate: {
          String: formatDateYMD(loan?.returnDate),
          Valid: loan?.returnDate.Valid,
        },
        amount: loan?.amount,
        paymentMethod: {
          String: loan?.paymentMethod.String,
          Valid: loan?.paymentMethod.Valid,
        },
        observation: {
          String: loan?.observation.String,
          Valid: loan?.observation.Valid,
        },
        status: loan?.status,
        email: "", //TODO: Get user email
      });
      onOpen();
    }
  };

  const handleSaveLoan = async () => {
    while (!isInvalidEmail && !isInvalidItem) {
      try {
        const user = await getUserByEmail(formData.email);

        if (user.dni !== 0) {
          const sendData: SendDataFormat = {
            id: user.id,
            deliveryDate: formData.deliveryDate,
            returnDate: formData.returnDate,
            endingDate: formData.returnDate,
            deliveryResponsible: formData.deliveryResponsible,
            borrowerName: user.id,
            observation: formData.observation,
            amount: formData.amount,
            paymentMethod: formData.paymentMethod,
            status: formData.status,
            itemType: formData.borrowedItem,
          };

          const savedLoanID = await saveLoan(sendData);

          console.log("Préstamo guardado:", savedLoanID);

          if (formData.email === "") {
            setLoans([...loans, savedLoanID]);
          } else {
            const updatedLoans = loans.map((l) =>
              l.id === savedLoanID.id ? savedLoanID : l
            );
            setLoans(updatedLoans);
          }
          fetchAndFormatLoans();
        } else {
          // Mostrar mensaje al usuario de que no se encontró el email
          setError("No se encontró un usuario con ese email.");
          alert("No se encontró un usuario con ese email.");
        }

        onClose();
      } catch (error) {
        console.error("Error saving loan:", error);
        setError(
          "Hubo un problema al guardar el préstamo. Por favor, inténtalo de nuevo."
        );
      }
      return
    }

  };

  const handleUpdateLoan = async () => {
    if (loan) {
      const updatedLoan = {
        ...loan,
        deliveryDate: formData.deliveryDate,
        returnDate: formData.returnDate,
        endingDate: formData.returnDate,
        observation: formData.observation,
        amount: formData.amount,
        paymentMethod: formData.paymentMethod,
        itemType: formData.borrowedItem,
      };
      await updateLoan(updatedLoan);
      fetchAndFormatLoans();
    }

    onClose();
  };

  const handleFinalizeLoan = async () => {
    if (loan) {
      const updatedLoan = {
        ...loan,
        status: "Finished",
        endingDate: { String: new Date().toISOString(), Valid: true },
      };
      await updateLoan(updatedLoan);
      fetchAndFormatLoans();
    }

    onClose();
  };

  // const items = [
  //   { key: "mate", value: "Mate" },
  //   { key: "termo", value: "Termo" },
  //   { key: "zapatilla", value: "Zapatilla" },
  // ];

  const formatDateYMD = (date: ValidDate): string => {
    if (date && date.Valid) {
      const isoDate = date.String.split("T")[0]; // Remueve la parte de la zona horaria
      const parsedDate = parseDate(isoDate); // Analiza solo la fecha
      const formatedDate = `${parsedDate.year}-${parsedDate.month
        .toString()
        .padStart(2, "0")}-${parsedDate.day.toString().padStart(2, "0")}`;
      return formatedDate;
    }
    return "-";
  };

  const validateEmail = (value:string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = useMemo(() => {
    if (formData.email === "") return false;

    return validateEmail(formData.email) ? false : true;
  }, [formData.email]);

  const isInvalidItem = useMemo(() => {
    return formData.borrowedItem === 0;
  }, [formData.borrowedItem]);


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
        onPress={onPressEditLoan}
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
                {formData.id !== 0 ? "Modificar Préstamo" : "Nuevo Préstamo"}
              </ModalHeader>
              <ModalBody>
                {formData?.id == 0 && (
                  <Input
                  label="Email"
                  type="email"
                  isInvalid={isInvalidEmail}
                  errorMessage="Por favor, ingrese un email correcto."
                  color={isInvalidEmail ? "danger" : "default"}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                )}
                <div className="h-5 mb-12 w-full">
                  <Select
                    label="Seleccioná un item"
                    items={items}
                    isInvalid={isInvalidItem}
                    errorMessage="Por favor, seleccioná un item."
                    color={isInvalidItem ? "danger" : "default"}
                    classNames={{
                      errorMessage: "",
                    }}
                    onChange={(e) => {
                      setSelectedItem(e.target.value);
                      setFormData({
                        ...formData,
                        borrowedItem: Number(e.target.value),
                      });
                    }}
                  >
                    {(item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    )}
                  </Select>
                </div>

                <DateInput
                  label="Fecha de entrega"
                  value={parseDate(formData.deliveryDate.String)}
                  onChange={(newDate) =>
                    setFormData({
                      ...formData,
                      deliveryDate: { String: newDate.toString(), Valid: true },
                    })
                  }
                />

                <DateInput
                  label="Fecha de devolución"
                  value={parseDate(formData.returnDate.String)}
                  onChange={(newDate) =>
                    setFormData({
                      ...formData,
                      returnDate: { String: newDate.toString(), Valid: true },
                    })
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
                  value={formData.paymentMethod.String}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentMethod: { String: e.target.value, Valid: true },
                    })
                  }
                />
                <Input
                  label="Observación"
                  value={formData.observation.String}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      observation: { String: e.target.value, Valid: true },
                    })
                  }
                />
              </ModalBody>
              <ModalFooter>
                {/* {error && <p className="text-red-500">{error}</p>} */}
                {formData?.id === 0 && (
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={handleSaveLoan}
                  >
                    Guardar
                  </Button>
                )}
                {formData?.id !== 0 && (
                  <Button
                    color="success"
                    variant="flat"
                    onPress={handleFinalizeLoan}
                  >
                    Finalizar Préstamo
                  </Button>
                )}
                {formData?.id !== 0 && (
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={handleUpdateLoan}
                  >
                    Actualizar
                  </Button>
                )}

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
