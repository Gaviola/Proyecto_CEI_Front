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
import { Item } from "../user/loans/page";
import { itemsData } from "@/data/inventory";
import { ItemCard } from "../admin/inventory/page";
import { createUserLoan } from "@/services/loans";
import { toast } from "react-toastify";

type ItemDisplay = {
    name: string;
    price: number | undefined;
};

export default function NewUserLoanModal({
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
        name: item?.item_type || "",
        price: itemsData.find((data: ItemCard) => data.id == item?.id)?.price,
    });


    const updateItem = useCallback(() => {
        if (item) {
            const itemDisplayData = {
                name: item.item_type,
                price: item.price,
            };
            setFormData(itemDisplayData);
            onOpen();
        }
    }, [item, onOpen]);

    useEffect(() => {
        updateItem();
    }, [item, updateItem]);


    const onPressCreateLoan = async () => {
        try {
            await createUserLoan(formData);
            fetchItems();
            onClose();
        }
        catch (error) {
            toast.error("Error al pedir prestamo");
        }
    };

    return (
        <>
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
                        {"Pedir prestado"}
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            label="Nombre"
                            value={formData.name}
                            disabled
                        />
                        <Input
                            label="Precio"
                            value={formData.price?.toString()}
                            disabled
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="flat" onPress={onPressCreateLoan}>
                            Pedir
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
