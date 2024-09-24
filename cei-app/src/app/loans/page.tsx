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
import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button";
import LoanModal from "../components/loanModal";
import { Selection } from "@react-types/shared";

export type Loan = {
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
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);

  const handleSelectedKey = (key: Selection) => {
    if (key === "all") {
      // Manejo si seleccionas "all"
      console.log("All items selected");
      setSelectedLoan(null); // Si seleccionas "all", no hay un préstamo específico seleccionado
    } else {
      // Aquí asumimos que key es un Set<Key>
      const selectedKey = Array.from(key)[0]; // Obtiene la primera clave del conjunto (si hay alguna)
      const selectedLoan = loans.find((loan) => loan.id.toString() === selectedKey) || null;
  
      setSelectedLoan(selectedLoan); // Actualiza el estado del préstamo seleccionado
    }
  };

  // Abre el modal para un nuevo préstamo
  const handleNewLoan = () => {
    setSelectedLoan(null); // Limpia el préstamo seleccionado
    setIsModalOpen(true); // Abre el modal
  };

  // Abre el modal para modificar un préstamo
  const handleEditLoan = (loan: Loan) => {
    setSelectedLoan(loan); // Establece el préstamo seleccionado
    setIsModalOpen(true); // Abre el modal
  };

  useEffect(() => {
    async function fetchLoans() {
      const res = await fetch("http://localhost:3000/api/loans");
      const data = await res.json();
      setLoans(data.loans);
      setIsLoading(false);
    }

    fetchLoans();
  }, []);

  const pages = Math.ceil(loans.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return loans.slice(start, end);
  }, [page, loans]);

  return (
    <div className="sm:m-10 m-5 h-screen overflow-x-hidden">
      <h1 className="text-4xl font-bold py-4">Préstamos</h1>
      <div className="flex flex-row">
        <LoanModal loan={selectedLoan} />
      </div>
      <Table
        aria-label="Loans Table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
              classNames={{
                
              }}
            />
          </div>
        }
        isHeaderSticky
        selectionMode="single"
        defaultSelectedKeys={["2"]}
        color="primary"
        onSelectionChange={handleSelectedKey}
       
        
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={isLoading}
          loadingContent={<Spinner color="current" />}
        >
          {(item) => (
            <TableRow
              key={item.id}
            >
              {(columnKey) => (
                <TableCell> {getKeyValue(item, columnKey)} </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center sticky h-auto">
        {/* <Pagination
          currentPage={page}
          totalPages={pages}
          onPageChange={(newPage) => setPage(newPage)}
        /> */}
      </div>
    </div>
  );
}
