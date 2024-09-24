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
import { Loan } from "../loans/page";

export default function LoanModal({ loan }: { loan: Loan | null }) {
  const [formData, setFormData] = useState<Loan>({
    id: loan?.id || 0,
    deliveryDate: loan?.deliveryDate || "",
    deliveryResponsible: loan?.deliveryResponsible || "",
    borrowerName: loan?.borrowerName || "",
    fileNumber: loan?.fileNumber || "",
    cellphone: loan?.cellphone || "",
    borrowedItem: loan?.borrowedItem || "",
    clarification: loan?.clarification || "",
    term: loan?.term || 0,
    returnDate: loan?.returnDate || "",
    receptionResponsible: loan?.receptionResponsible || "",
    amount: loan?.amount || 0,
    paymentMethod: loan?.paymentMethod || "",
    observation: loan?.observation || "",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onPressNewLoan = () => {
    setFormData({
      id: 0,
      deliveryDate: "",
      deliveryResponsible: "",
      borrowerName: "",
      fileNumber: "",
      cellphone: "",
      borrowedItem: "",
      clarification: "",
      term: 0,
      returnDate: "",
      receptionResponsible: "",
      amount: 0,
      paymentMethod: "",
      observation: "",
    });
    onOpen();
  };

  useEffect(() => {
    if (loan) {
      setFormData(loan);
    }
  }, [loan]);

  //   const handleSubmit = () => {
  //     // Envía la solicitud para agregar o modificar el préstamo
  //     console.log("Préstamo guardado:", formData);
  //     onClose(); // Cierra el modal
  //   };

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
          console.log("Modificando préstamo:", loan);
          if (loan) {
            console.log("Modificando préstamo:", loan);
            setFormData(loan);
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
                  label="Nombre Alumno/Prestatario"
                  placeholder="Nombre Alumno/Prestatario"
                  value={formData.borrowerName}
                  onChange={(e) =>
                    setFormData({ ...formData, borrowerName: e.target.value })
                  }
                />
                <Input
                  label="Legajo"
                  placeholder="Legajo"
                  value={formData.fileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, fileNumber: e.target.value })
                  }
                />
                <Input
                  label="Celular"
                  placeholder="Celular"
                  value={formData.cellphone}
                  onChange={(e) =>
                    setFormData({ ...formData, cellphone: e.target.value })
                  }
                />
                <Input
                  placeholder="Elemento prestado"
                  label="Elemento prestado"
                  value={formData.borrowedItem}
                  onChange={(e) =>
                    setFormData({ ...formData, borrowedItem: e.target.value })
                  }
                />
                <Input
                  placeholder="Aclaración"
                  label="Aclaración"
                  value={formData.clarification}
                  onChange={(e) =>
                    setFormData({ ...formData, clarification: e.target.value })
                  }
                />
                <Input
                  placeholder="Plazo (días)"
                  label="Plazo (días)"
                  value={formData.term.toString()}
                  onChange={(e) =>
                    setFormData({ ...formData, term: parseInt(e.target.value) })
                  }
                />
                <Input
                  placeholder="Fecha de devolución"
                  label="Fecha de devolución"
                  value={formData.returnDate}
                  onChange={(e) =>
                    setFormData({ ...formData, returnDate: e.target.value })
                  }
                />
                <Input
                  placeholder="Monto ($)"
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
                  placeholder="Método de pago"
                  label="Método de pago"
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                />
                <Input
                  placeholder="Observación"
                  label="Observación"
                  value={formData.observation}
                  onChange={(e) =>
                    setFormData({ ...formData, observation: e.target.value })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Guardar</Button>
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
