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
import { use, useEffect, useState, useCallback } from "react";
import { Item } from "../admin/inventory/page";
import { itemsData, updateItemPrice } from "@/data/inventory";
import { u } from "framer-motion/client";
import { updateItemType, createItemType, deleteItemType } from "@/services/inventory";
import { ItemCard } from "../admin/inventory/page";

type ItemDisplay = {
  name: string;
  price: number | undefined;
};

export default function InventoryModal({
  item,
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
  fetchItems,
}: {
  item: Item | undefined;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  isOpen: boolean;
  fetchItems: () => void;
}) {
  const [formData, setFormData] = useState<ItemDisplay>({
    name: item?.name || "",
    price: itemsData.find((data:ItemCard) => data.id == item?.id)?.price,
  });

  //const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const updateItem = useCallback(() => {
    if (item) {
      const itemDisplayData = {
        name: item.name,
        price: itemsData.find((data:ItemCard) => data.id == item.id)?.price,
      };
      setFormData(itemDisplayData);
      onOpen();
    }
  }, [item, onOpen]);

  useEffect(() => {
    updateItem();
  }, [item, updateItem]);

  const onPressNewItem = () => {
    setFormData({
      name: "",
      price: 0,
    });
    onOpen();
  };

  const onPressUpdateItem = async () => {
    if (item) {
      const updatedItem: Item = {
        ...item,
        name: formData.name,
      };
      await updateItemType(updatedItem);
      // Actualizar el precio del item en itemsData
      updateItemPrice(item.id, formData.price);
      fetchItems();
    }
    onClose();
  };

  const onPressSaveItem = async () => {
    console.log("creando item:", formData);
    await createItemType(formData);

    fetchItems();
    onClose();
  };

  const onPressDeleteItem = async () => {
    if (item) {
      await deleteItemType(item.id);
      fetchItems();
      onClose();
    }
  }

  return (
    <>
      <Button
        onPress={onPressNewItem}
        color="default"
        className="border-primaryGreen-500 bg-primaryGreen-500 text-white mr-4 mb-4 "
      >
        + Nuevo Item
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
            {formData.name !== "" ? "Modificar Item" : "Nuevo Item"}
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
              label="Precio"
              value={formData.price?.toString()}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
            />
          </ModalBody>
          <ModalFooter>
            {formData?.name == "" && (
              <Button color="primary" variant="flat" onPress={onPressSaveItem}>
                Guardar
              </Button>
            )}
            {formData?.name !== "" && (
              <Button
                color="primary"
                variant="flat"
                onPress={onPressUpdateItem}
              >
                Actualizar
              </Button>
            )}

            {formData?.name !== "" && (
              <Button
                color="secondary"
                variant="flat"
                onPress={onPressDeleteItem}
              >
                Eliminar
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
