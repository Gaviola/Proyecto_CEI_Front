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
import { useState, useEffect } from "react";

type Loan = {
  id: number;
  deliveryDate: string;
  deliveryResponsible: string;
  borrowerName: string;
  fileNumber: string;
  cellphone: string;
  borrowedItem: string;
  clarification: string;
  term: number;
  returnDate: string;
  receptionResponsible: string;
  amount: number;
  paymentMethod: string;
  observation: string;
};


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
  const [loans, setLoans] = useState<Loan []> ([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(false);


  useEffect( () => {
    async function fetchLoans(){
      const res = await fetch("http://localhost:3000/api/loans");
      const data = await res.json();
      setLoans(data.loans);
      setIsLoading(false);
    }

    fetchLoans();
  }, []);

  


  return (
    <Table
      aria-label="Loans Table"
      removeWrapper
      isHeaderSticky
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
        items={loans}
        isLoading={isLoading}
        loadingContent={<Spinner color="current" />}
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
