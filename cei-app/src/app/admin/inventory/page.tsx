"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
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

export default function InventoryPage() {
  const list = [
    {
      title: "Set Mate",
      img: "/mate-termo.jpg",
      price: "$5.50",
    },
    {
      title: "Lockers",
      img: "",
      price: "$3.00",
    },
    {
      title: "Cargador",
      img: "",
      price: "$10.00",
    },
    {
      title: "Cartas",
      img: "",
      price: "$5.30",
    },
    {
      title: "Tablero",
      img: "",
      price: "$15.70",
    },
    {
      title: "Zapatilla",
      img: "",
      price: "$15.70",
    },
    {
      title: "Fotocopia",
      img: "",
      price: "$15.70",
    },
    {
      title: "Juego",
      img: "",
      price: "$15.70",
    },
    {
      title: "Ping Pong",
      img: "",
      price: "$15.70",
    },
  ];

  // const [formData, setFormData] = useState({
  //   title: 
  // })

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold m-10">Inventario</h1>
      {/* <Modal
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
                {"Modificar Elemento"}
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

              </ModalBody>
              <ModalFooter>
                <Button onPress={handleSaveLoan}>Guardar</Button>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
      <div className="gap-2 sm:gap-2 md:gap-3  grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 sm:max-h-[60vh]  m-10 ">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
