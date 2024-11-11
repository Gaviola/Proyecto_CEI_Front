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
import { User } from "../admin/users/page";
import { DateInput } from "@nextui-org/date-input";
import { DateValue, parseDate } from "@internationalized/date";
import { createUser, updateUser } from "@/services/users";

export default function UserModal({
  user,
  users,
  setUsers,
  fetchUsers,
}: {
  user: User | null;
  users: User[];
  setUsers: (users: User[]) => void;
  fetchUsers: () => void;
}) {
  const [formData, setFormData] = useState<User>({
    id: user?.id || 0,
    name: user?.name || "",
    lastname: user?.lastname || "",
    dni: user?.dni || 0,
    student_id: user?.student_id || 0,
    email: user?.email || "",
    phone: user?.phone || 0,
    is_verified: user?.is_verified || false,
    creator_id: user?.creator_id || 0,
    role: user?.role || "",
    school: user?.school || "",
  });

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onPressNewUser = () => {
    setFormData({
      id: 0,
      name: "",
      lastname: "",
      dni: 0,
      student_id: 0,
      email: "",
      phone: 0,
      is_verified: false,
      creator_id: 0,
      role: "student",
      school: "",
    });
    onOpen();
  };

  const onPressUpdateUser = async () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        lastname: formData.lastname,
        dni: formData.dni,
        student_id: formData.student_id,
        email: formData.email,
        phone: formData.phone,
        school: formData.school,
      };
      await updateUser(updatedUser);
      fetchUsers();
    }
    onClose();
  };

  const onPressVerifyUser = async () => {
    if (user) {
      const updatedUser = {
        ...user,
        is_verified: true,
      };
      await updateUser(updatedUser);
      fetchUsers();
    }
    onClose();
  };

  const onPressSaveUser = async () => {
    console.log("creando usuario:", formData);
    await createUser(formData);

    fetchUsers();
    onClose();
  };

  const onPressDeleteUser = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id));
  };

  return (
    <>
      <Button
        onPress={onPressNewUser}
        color="default"
        className="border-primaryGreen-500 bg-primaryGreen-500 text-white mr-4 mb-4"
      >
        Nuevo Usuario
      </Button>

      <Button
        color="default"
        className="border-primaryGreen-500 bg-primaryGreen-500 text-white mb-4"
        onPress={() => {
          if (user) {
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
              label="Nombre"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              label="Apellido"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
            <Input
              label="DNI"
              value={formData.dni.toString()}
              onChange={(e) =>
                setFormData({ ...formData, dni: Number(e.target.value) })
              }
            />
            <Input
              label="Facultad"
              value={formData.school}
              onChange={(e) =>
                setFormData({ ...formData, school: e.target.value })
              }
            />
            <Input
              label="Legajo"
              value={formData.student_id.toString()}
              onChange={(e) =>
                setFormData({ ...formData, student_id: Number(e.target.value) })
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
              label="Celular"
              value={formData.phone.toString()}
              onChange={(e) =>
                setFormData({ ...formData, phone: Number(e.target.value) })
              }
            />
          </ModalBody>
          <ModalFooter>
            {formData?.id !== 0 && (
              <Button
                color="secondary"
                variant="flat"
                onPress={onPressVerifyUser}
              >
                Verificado
              </Button>
            )}

            {formData?.id == 0 && (
              <Button color="primary" variant="flat" onPress={onPressSaveUser}>
                Guardar
              </Button>
            )}
            {formData?.id !== 0 && (
              <Button
                color="primary"
                variant="flat"
                onPress={onPressUpdateUser}
              >
                Actualizar
              </Button>
            )}

            <Button color="danger" variant="flat" onPress={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
