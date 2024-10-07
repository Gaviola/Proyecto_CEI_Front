"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

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

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold m-10">Inventario</h1>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 sm:max-h-[60vh]  m-10 ">
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
