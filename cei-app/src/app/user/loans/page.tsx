"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { getItemsForUser } from "@/services/inventory";
import { itemsData } from "@/data/inventory";
import NewUserLoanModal from "@/app/components/newUserLoanModal";
import { getItemsByType } from "@/services/inventory";

export type Item = {
  id: number;
  name: string;
  is_generic: boolean;
  img: string;
  price: number;
};

export type ItemCard = {
  id: number;
  name: string;
  img: string;
  price: number;
};

export default function LoansPage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [itemsCard, setItemsCard] = useState<ItemCard[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [numItems, setNumItems] = useState<{ id: number; number: number }[]>(
    []
  );

  const fetchItems = async () => {
    const items = await getItemsForUser();
    console.log(items);
    const formatedItems = items.map((item: Item) => ({
      id: item.id,
      name: item.name,
      img: itemsData.find((data: ItemCard) => data.id == item.id)?.img,
      price: item.price,
    }));
    setItemsList(items);
    setItemsCard(formatedItems);

    // Buscar la cantidad de items de cada tipo
    // const numItemsPromises = items.map(async (item: Item) => {
    //     const numberOfItems = await getNumberOfItems(item);
    //     console.log(`Item ${item.name} tiene ${numberOfItems} items`);
    //     return { id: item.id, number: numberOfItems };
    //   });
  
      //const numItemsResults = await Promise.all(numItemsPromises);
      //setNumItems(numItemsResults);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const getNumberOfItems = async (item: Item) => {
    const typeObjects = await getItemsByType(item.id);
    if(typeObjects != null){
      return typeObjects.length;
    } else {
      return 0;
    }
};

  const handleSelect = (item: ItemCard) => {
    const selectedItem = itemsList.find((i) => i.id == item.id);
    setSelectedItem(selectedItem);
    onOpen();
  };

  return (
    <div className="sm:m-10 m-5 h-screen overflow-x-hidden w-full">
      <h1 className="text-4xl font-bold py-4">Inventario</h1>
      <NewUserLoanModal
        item={selectedItem}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        fetchItems={fetchItems}
      />
      <div className="gap-2 sm:gap-2 md:gap-3  grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 sm:max-h-[60vh]   ">
        {itemsCard.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => handleSelect(item)}
            classNames={{
              base: "",
            }}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.name}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.name}</b>
              {/* <p className="text-default-500">{`${
                numItems.find((data) => data.id == item.id)?.number || 0
              }`}</p> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
