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
import { saveLoan, saveLoanItem } from "../../services/loans";
import { getUserByEmail } from "../../services/users";
import { getEveryItemType, getItemsByType } from "../../services/inventory";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { CustomCheckbox } from "./customCheckbox";
import {
  Select,
  SelectSection,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

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
  String: string;
  Valid: boolean;
};

type SendDataFormat = {
  //id: number;
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
  //borrowedItem: string;
};

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
    deliveryDate: loan?.deliveryDate
      ? parseDate(loan.deliveryDate)
      : parseDate("2024-04-04"),
    deliveryResponsible: loan?.deliveryResponsible || "",
    email: loan?.email || "",
    borrowedItem: loan?.borrowedItem || "",
    term: loan?.term || 0,
    returnDate: loan?.returnDate
      ? parseDate(loan.returnDate)
      : parseDate("2024-04-04"),
    receptionResponsible: loan?.receptionResponsible || "",
    amount: loan?.amount || 0,
    paymentMethod: loan?.paymentMethod || "",
    observation: loan?.observation || "",
    status: loan?.status || "Active",
  });

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [error, setError] = useState<string | null>(null);
  const [groupSelected, setGroupSelected] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<Key>();
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [instances, setInstances] = useState<{ id: number; value: string }[]>(
    []
  );

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getEveryItemType();
        console.log(items);
        setItems(items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

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
      status: "Active",
    });
    onOpen();
  };

  const handleSaveLoan = async () => {
    try {
      console.log(formData.email);

      const user = await getUserByEmail(formData.email);

      if (user) {
        console.log(user);

        //Sets data format to send to the API
        const cleanData: SendDataFormat = {
          //id: user.id,
          deliveryDate: {
            String: formData.deliveryDate.toString(),
            Valid: formData.deliveryDate.toString() !== "",
          },
          deliveryResponsible: 2,
          //email: user.email,
          borrowerName: user.id,
          //borrowedItem: formData.borrowedItem,
          returnDate: {
            String: formData.returnDate.toString(),
            Valid: formData.returnDate.toString() !== "",
          },
          amount: formData.amount,
          paymentMethod: {
            String: formData.paymentMethod,
            Valid: formData.paymentMethod !== "",
          },
          observation: {
            String: formData.observation,
            Valid: formData.observation !== "",
          },
          status: formData.status,
          endingDate: {
            String: formData.returnDate.toString(),
            Valid: formData.returnDate.toString() !== "",
          },
        };

        //Envía el préstamo a la API
        const savedLoanID = await saveLoan(cleanData);

        const loanItemData = {
          loan_id: savedLoanID,
          item_id: 1,
        };

        //Envía el item prestado a la API
        const savedLoanItemID = await saveLoanItem(loanItemData);

        if (formData.email === "") {
          // Nuevo préstamo
          setLoans([...loans, savedLoanID]);
        } else {
          // Préstamo existente
          const updatedLoans = loans.map((l) =>
            l.id === savedLoanID.id ? savedLoanID : l
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

  const handleSelectionChange = async (key: Key) => {
    setSelectedItem(key);
    const items = await getItemsByType(key);
    setInstances(items);

    console.log("instancias:", items);
  };

  const handleItemSelection = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {};

  // const items = [
  //   { key: "mate", value: "Mate" },
  //   { key: "termo", value: "Termo" },
  //   { key: "zapatilla", value: "Zapatilla" },
  // ];

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

                <div className="h-5 mb-4 w-full">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button >Selecciona un Item</Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      items={items}
                      onAction={handleSelectionChange}
                    >

                      {(item) => (
                        <DropdownItem key={item.id}>
                          <Select
                            label={item.name}
                            items={instances}
                            onChange={handleItemSelection}
                          >
                            {(instance) => (
                              <SelectItem key={instance.id}>
                                {instance.value}
                              </SelectItem>
                            )}
                          </Select>
                          {/* {item.name} */}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </div>

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
