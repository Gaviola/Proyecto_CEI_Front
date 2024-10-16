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
import { Spinner } from "@nextui-org/spinner";
import { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/pagination";
import LoanModal from "../components/loanModal";
import { Selection } from "@react-types/shared";
import { CalendarDate, DateValue, parseDate } from "@internationalized/date";

export type Loan = {
  id: number;
  deliveryDate: string;
  deliveryResponsible: string;
  email: string;
  borrowedItem: string;
  term: number;
  returnDate: string;
  receptionResponsible: string;
  amount: number;
  paymentMethod: string;
  observation: string;
  status: string;
};

const formatDate = (date: DateValue | undefined): string => {
  if (date && date.day !== undefined && date.month !== undefined && date.year !== undefined) {
    const day = date.day.toString().padStart(2, "0");
    const month = date.month.toString().padStart(2, "0");
    const year = date.year.toString();
    return `${day}/${month}/${year}`;
  } else {
    return "-";
  }
};
const columns = [
  { key: "id", label: "ID" },
  { key: "borrowerName", label: "Nombre Alumno/Prestatario" },
  { key: "fileNumber", label: "Legajo" },
  { key: "email", label: "Email" },
  { key: "cellphone", label: "Celular" },
  { key: "borrowedItem", label: "Elemento prestado" },
  { key: "clarification", label: "Aclaración" },
  { key: "term", label: "Plazo (días)" },
  { key: "deliveryDate", label: "Fecha de entrega" },
  { key: "returnDate", label: "Fecha de devolución" },
  { key: "amount", label: "Monto ($)" },
  { key: "paymentMethod", label: "Método de pago" },
  { key: "deliveryResponsible", label: "Responsable de entrega" },
  { key: "receptionResponsible", label: "Responsable de recepción" },
  { key: "observation", label: "Observación" },
];

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const handleSelectedKey = (key: Selection) => {
    if (key === "all") {
      // Manejo si seleccionas "all"
      console.log("All items selected");
      setSelectedLoan(null); // Si seleccionas "all", no hay un préstamo específico seleccionado
    } else {
      // Aquí asumimos que key es un Set<Key>
      const selectedKey = Array.from(key)[0]; // Obtiene la primera clave del conjunto (si hay alguna)
      const selectedLoan =
        loans.find((loan) => loan.id.toString() === selectedKey) || null;

      setSelectedLoan(selectedLoan); // Actualiza el estado del préstamo seleccionado
    }
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
        <LoanModal loan={selectedLoan} loans={loans} setLoans={setLoans} />
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
              classNames={{}}
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
            <TableRow key={item.id}>
              {(columnKey) =>
                columnKey === "returnDate" || columnKey === "deliveryDate" ? (
                  <TableCell>
                    {" "}
                    {formatDate(getKeyValue(item, columnKey))}{" "}
                  </TableCell>
                ) : (
                  <TableCell> {getKeyValue(item, columnKey)} </TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
