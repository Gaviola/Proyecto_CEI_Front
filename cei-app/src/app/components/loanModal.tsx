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
    deliveryDate: {
      String: loan?.deliveryDate.String || "",
      Valid: loan?.deliveryDate.String !== "",
    },
    deliveryResponsible: loan?.deliveryResponsible || "",
    borrowedItem: loan?.borrowedItem || 0,
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
      deliveryDate: {
        String: "2000-01-01",
        Valid: false,
      },
      deliveryResponsible: "",
      borrowedItem: 0,
      returnDate: {
        String: "2000-01-01",
        Valid: false,
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
      status: "",
      email: "",
    });
    onOpen();
  };

  const onPressEditLoan = () => {
    if (loan) {
      console.log("Modificando préstamo:", loan);

      setFormData({
        id: loan?.id,
        deliveryDate: {
          String: loan?.deliveryDate.String,
          Valid: loan?.deliveryDate.Valid,
        },
        deliveryResponsible: loan?.deliveryResponsible,
        borrowedItem: loan?.borrowedItem,
        returnDate: {
          String: loan?.returnDate.String,
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
    try {
      const user = await getUserByEmail(formData.email);

      if (user) {
        //Envía el préstamo a la API
        const savedLoanID = await saveLoan(formData);

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
                      <Button>Selecciona un Item</Button>
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
                  value={parseDate(formData.deliveryDate.String)}
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
