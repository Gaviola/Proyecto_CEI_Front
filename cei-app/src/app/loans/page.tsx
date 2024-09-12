"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

import React from "react";

import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

import { useAsyncList } from "@react-stately/data";

import { Spinner } from "@nextui-org/spinner";

const rows = [
  {
    id: 1,
    deliveryDate: "2021-01-01",
    deliveryResponsible: "Nombre, Apellido",
    borrowerName: "Apellido, Nombre",
    fileNumber: "123456",
    cellphone: "1234567890",
    borrowedItem: "Elemento",
    clarification: "Aclaración",
    term: 7,
    returnDate: "2021-01-08",
    receptionResponsible: "Nombre, Apellido",
    amount: 100,
    paymentMethod: "Efectivo",
    observation: "Observación",
  },

  {
    id: 2,
    deliveryDate: "2021-01-01",
    deliveryResponsible: "Nombre, Apellido",
    borrowerName: "Apellido, Nombre",
    fileNumber: "123456",
    cellphone: "1234567890",
    borrowedItem: "Elemento",
    clarification: "Aclaración",
    term: 7,
    returnDate: "2021-01-08",
    receptionResponsible: "Nombre, Apellido",
    amount: 100,
    paymentMethod: "Efectivo",
    observation: "Observación",
  },

  {
    id: 3,
    deliveryDate: "2021-01-01",
    deliveryResponsible: "Nombre, Apellido",
    borrowerName: "Apellido, Nombre",
    fileNumber: "123456",
    cellphone: "1234567890",
    borrowedItem: "Elemento",
    clarification: "Aclaración",
    term: 7,
    returnDate: "2021-01-08",
    receptionResponsible: "Nombre, Apellido",
    amount: 100,
    paymentMethod: "Efectivo",
    observation: "Observación",
  },

  {
    id: 4,
    deliveryDate: "2021-01-01",
    deliveryResponsible: "Nombre, Apellido",
    borrowerName: "Apellido, Nombre",
    fileNumber: "123456",
    cellphone: "1234567890",
    borrowedItem: "Elemento",
    clarification: "Aclaración",
    term: 7,
    returnDate: "2021-01-08",
    receptionResponsible: "Nombre, Apellido",
    amount: 100,
    paymentMethod: "Efectivo",
    observation: "Observación",
  },

  {
    id: 5,
    deliveryDate: "2021-01-01",
    deliveryResponsible: "Nombre, Apellido",
    borrowerName: "Apellido, Nombre",
    fileNumber: "123456",
    cellphone: "1234567890",
    borrowedItem: "Elemento",
    clarification: "Aclaración",
    term: 7,
    returnDate: "2021-01-08",
    receptionResponsible: "Nombre, Apellido",
    amount: 100,
    paymentMethod: "Efectivo",
    observation: "Observación",
  },

  {
    id: 6,
    deliveryDate: "2021-01-01",
    deliveryResponsible: "Nombre, Apellido",
    borrowerName: "Apellido, Nombre",
    fileNumber: "123456",
    cellphone: "1234567890",
    borrowedItem: "Elemento",
    clarification: "Aclaración",
    term: 7,
    returnDate: "2021-01-08",
    receptionResponsible: "Nombre, Apellido",
    amount: 100,
    paymentMethod: "Efectivo",
    observation: "Observación",
  },

  {
    id: 7,
    deliveryDate: "2021-01-01",
    deliveryResponsible: "Nombre, Apellido",
    borrowerName: "Apellido, Nombre",
    fileNumber: "123456",
    cellphone: "1234567890",
    borrowedItem: "Elemento",
    clarification: "Aclaración",
    term: 7,
    returnDate: "2021-01-08",
    receptionResponsible: "Nombre, Apellido",
    amount: 100,
    paymentMethod: "Efectivo",
    observation: "Observación",
  },

  {
    id: 8,
    deliveryDate: "2021-01-01",
    deliveryResponsible: "Nombre, Apellido",
    borrowerName: "Apellido, Nombre",
    fileNumber: "123456",
    cellphone: "1234567890",
    borrowedItem: "Elemento",
    clarification: "Aclaración",
    term: 7,
    returnDate: "2021-01-08",
    receptionResponsible: "Nombre, Apellido",
    amount: 100,
    paymentMethod: "Efectivo",
    observation: "Observación",
  },

  {
    id: 9,
    deliveryDate: "2021-01-01",
    deliveryResponsible: "Nombre, Apellido",
    borrowerName: "Apellido, Nombre",
    fileNumber: "123456",
    cellphone: "1234567890",
    borrowedItem: "Elemento",
    clarification: "Aclaración",
    term: 7,
    returnDate: "2021-01-08",
    receptionResponsible: "Nombre, Apellido",
    amount: 100,
    paymentMethod: "Efectivo",
    observation: "Observación",
  },

  {
    id: 10,
    deliveryDate: "2021-01-01",
    deliveryResponsible: "Nombre, Apellido",
    borrowerName: "Apellido, Nombre",
    fileNumber: "123456",
    cellphone: "1234567890",
    borrowedItem: "Elemento",
    clarification: "Aclaración",
    term: 7,
    returnDate: "2021-01-08",
    receptionResponsible: "Nombre, Apellido",
    amount: 100,
    paymentMethod: "Efectivo",
    observation: "Observación",
  },

  {
    id: 11,
    deliveryDate: "2021-01-01",
    deliveryResponsible: "Nombre, Apellido",
    borrowerName: "Apellido, Nombre",
    fileNumber: "123456",
    cellphone: "1234567890",
    borrowedItem: "Elemento",
    clarification: "Aclaración",
    term: 7,
    returnDate: "2021-01-08",
    receptionResponsible: "Nombre, Apellido",
    amount: 100,
    paymentMethod: "Efectivo",
    observation: "Observación",
  },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "deliveryDate", label: "Fecha de entrega" },
  { key: "deliveryResponsible", label: "Responsable de entrega" },
  { key: "borrowerName", label: "Nombre Alumno/Prestatario" },
  { key: "fileNumber", label: "Legajo" },
  { key: "cellphone", label: "Celular" },
  { key: "borrowedItem", label: "Elemento prestado" },
  { key: "clarification", label: "Aclaración" },
  { key: "term", label: "Plazo (días)" },
  { key: "returnDate", label: "Fecha de devolución" },
  { key: "receptionResponsible", label: "Responsable de recepción" },
  { key: "amount", label: "Monto ($)" },
  { key: "paymentMethod", label: "Método de pago" },
  { key: "observation", label: "Observación" },
];

export default function LoansPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(false);

  let list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setIsLoading(false);
      }

      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(
        cursor || "https://swapi.py4e.com/api/people/?search=",
        { signal }
      );
      let json = await res.json();

      setHasMore(json.next !== null);

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });

  return (
    <Table
      removeWrapper
      isHeaderSticky
      baseRef={scrollerRef}
      bottomContent={
        hasMore ? (
          <div className="flex w-full justify-center">
            <Spinner ref={loaderRef} color="white" />
          </div>
        ) : null
      }
      classNames={{
        base: "max-h-[80vh] overflow-scroll m-10 p-4 bg-white rounded-xl shadow-lg",
        table: "min-h-[400px]",
        tbody: "divide-y divide-gray-200",
        tr: "hover:bg-gray-50",
        
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={rows}
        isLoading={isLoading}
        loadingContent={<Spinner color="white" />}
      >
        {(item) => (
          <TableRow key={item.id} >
            {(columnKey) => (
              <TableCell> {getKeyValue(item, columnKey)} </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
