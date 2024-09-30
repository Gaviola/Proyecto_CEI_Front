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
import { User } from "../users/page";

export default function UserModal({
  user,
  users,
  setUsers,
}: {
  user: User | null;
  users: User[];
  setUsers: (users: User[]) => void;
}) {
  const [formData, setFormData] = useState<User>({
    id: user?.id || 0,
    name: user?.name || "",
    lastName: user?.lastName || "",
    idNumber: user?.idNumber || "",
    email: user?.email || "",
    registrationDate: user?.registrationDate || "",
  });

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onPressNewUser = () => {
    setFormData({
      id: 0,
      name: "",
      lastName: "",
      idNumber: "",
      email: "",
      registrationDate: "",
    });
    onOpen();
  };

  const onPressEditUser = (user: User) => {
    setFormData(user);
    onOpen();
  };

  const onPressSaveUser = () => {
    if (formData.id === 0) {
      setUsers([...users, formData]);
    } else {
      setUsers(
        users.map((u) => {
          if (u.id === formData.id) {
            return formData;
          }
          return u;
        })
      );
    }
    onClose();
  };

  const onPressDeleteUser = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id));
  };

  return (
    <>
      <Button
        onClick={onPressNewUser}
        color="default"
        className="border-primaryGreen-500 bg-primaryGreen-500 text-white mr-4 mb-4"
      >
        Nuevo Usuario
      </Button>

      <Button
        color="default"
        className="border-primaryGreen-500 bg-primaryGreen-500 text-white mb-4"
        onPress={() => {
          console.log("Modificando préstamo:", user);
          if (user) {
            console.log("Modificando préstamo:", user);
            setFormData(user);
            onOpen();
          }
        }}
      >
        Modificar Usuario
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
          <ModalHeader>
            {user ? "Modificar Préstamo" : "Nuevo Préstamo"}
          </ModalHeader>
          <ModalBody>
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              label="Lastname"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <Input
              label="ID Number"
              value={formData.idNumber}
              onChange={(e) =>
                setFormData({ ...formData, idNumber: e.target.value })
              }
            />
            <Input
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <Input
              label="Registration Date"
              value={formData.registrationDate}
              onChange={(e) =>
                setFormData({ ...formData, registrationDate: e.target.value })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="flat" onClick={onPressSaveUser}>Guardar</Button>
            <Button color="danger" variant="flat" onPress={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
