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
import LoanModal from "../../components/loanModal";
import { Selection } from "@react-types/shared";
import { CalendarDate, DateValue, parseDate } from "@internationalized/date";
import { fetchLoans } from "@/services/loans";
import { getUserByID } from "@/services/users";
import { User } from "../users/page";

type ValidString = {
  String: string;
  Valid: boolean;
};

type ValidDate = {
  String: string;
  Valid: boolean;
};

export type Loan = {
  id: number;
  deliveryDate: ValidDate;
  returnDate: ValidDate;
  endingDate?: ValidDate;
  deliveryResponsible: number;
  borrowerName?: number;
  observation: ValidString;
  amount: number;
  paymentMethod: ValidString;
  status: string;
  borrowedItem: number;
};

type TableLoan = {
  id: number;
  borrowerName: string;
  legajo: string;
  email: string;
  phone: number;
  deliveryDate: string;
  returnDate: string;
  endingDate?: string;
  deliveryResponsible?: string;
  observation: string;
  amount: number;
  paymentMethod: string;
  status: string;
  borrowedItem: string;
};

const mockLoans: Loan[] = [
  {
    id: 1,
    deliveryDate: { String: "2023-10-01", Valid: true },
    returnDate: { String: "2023-10-15", Valid: true },
    deliveryResponsible: 12345,
    borrowerName: 67890,
    observation: { String: "Ninguna observación", Valid: true },
    amount: 1000,
    paymentMethod: { String: "Tarjeta de crédito", Valid: true },
    status: "Pendiente",
    borrowedItem: 1,
  },
  {
    id: 2,
    deliveryDate: { String: "2023-09-20", Valid: true },
    returnDate: { String: "2023-10-05", Valid: true },
    deliveryResponsible: 54321,
    borrowerName: 98765,
    observation: { String: "Revisar al devolver", Valid: true },
    amount: 500,
    paymentMethod: { String: "Efectivo", Valid: true },
    status: "Completado",
    borrowedItem: 2,
  },
  {
    id: 3,
    deliveryDate: { String: "2023-08-15", Valid: true },
    returnDate: { String: "2023-09-01", Valid: true },
    deliveryResponsible: 11223,
    borrowerName: 44556,
    observation: { String: "Urgente", Valid: true },
    amount: 750,
    paymentMethod: { String: "Transferencia bancaria", Valid: true },
    status: "Pendiente",
    borrowedItem: 3,
  },
  {
    id: 4,
    deliveryDate: { String: "2023-07-10", Valid: true },
    returnDate: { String: "2023-07-25", Valid: true },
    deliveryResponsible: 33445,
    borrowerName: 66778,
    observation: { String: "Ninguna observación", Valid: true },
    amount: 1200,
    paymentMethod: { String: "Cheque", Valid: true },
    status: "Completado",
    borrowedItem: 4,
  },
  {
    id: 5,
    deliveryDate: { String: "2023-06-05", Valid: true },
    returnDate: { String: "2023-06-20", Valid: true },
    deliveryResponsible: 55667,
    borrowerName: 88990,
    observation: { String: "Revisar al devolver", Valid: true },
    amount: 300,
    paymentMethod: { String: "Tarjeta de débito", Valid: true },
    status: "Pendiente",
    borrowedItem: 5,
  },
];

export const mockUser: User = {
  id: 1,
  name: "John",
  lastName: "Doe",
  idNumber: "12345678",
  legajo: "20230001",
  registrationDate: parseDate("2023-10-01"),
  email: "john.doe@example.com",
  phone: "1234567890",
};

// const formatDate = (date: DateValue | undefined): string => {
//   if (
//     date &&
//     date.day !== undefined &&
//     date.month !== undefined &&
//     date.year !== undefined
//   ) {
//     const day = date.day.toString().padStart(2, "0");
//     const month = date.month.toString().padStart(2, "0");
//     const year = date.year.toString();
//     return `${day}/${month}/${year}`;
//   } else {
//     return "-";
//   }
// };

const formatDate = (date: ValidDate): string => {
  if (date && date.Valid) {
    const isoDate = date.String.split("T")[0]; // Remueve la parte de la zona horaria
    const parsedDate = parseDate(isoDate); // Analiza solo la fecha
    const formatedDate = `${parsedDate.day
      .toString()
      .padStart(2, "0")}/${parsedDate.month.toString().padStart(2, "0")}/${
      parsedDate.year
    }`;
    return formatedDate;
  }
  return "-";
};

const columns = [
  { key: "id", label: "ID" },
  { key: "borrowerName", label: "Nombre Alumno/Prestatario" },
  { key: "legajo", label: "Legajo" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Celular" },
  { key: "borrowedItem", label: "Elemento prestado" },
  { key: "deliveryDate", label: "Fecha de entrega" },
  { key: "returnDate", label: "Fecha de devolución" },
  { key: "amount", label: "Monto ($)" },
  { key: "paymentMethod", label: "Método de pago" },
  { key: "deliveryResponsible", label: "Responsable de entrega" },
  { key: "observation", label: "Observación" },
  { key: "status", label: "Estado" },
];

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [loansTable, setLoansTable] = useState<TableLoan[]>([]);

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
    const fetchAndFormatLoans = async () => {
      setIsLoading(true);
      const data = await fetchLoans();
      //const data = mockLoans;
      setLoans(data);

      console.log("data:", data);

      const formattedLoans = await Promise.all(
        data.map((loan: Loan) => formatItem(loan))
      );
      console.log("formattedLoans:", formattedLoans);
      setLoansTable(formattedLoans);
      setIsLoading(false);
    };

    fetchAndFormatLoans();
  }, []);

  const pages = Math.ceil(loans.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return loansTable.slice(start, end);
  }, [page, loansTable]);

  interface FormattedItem {
    [key: string]: any;
  }

  const formatItem = async (item: Loan): Promise<TableLoan> => {
    const userData: User = await getUserByID(item.borrowerName);
    const deliveryResponsible: User = await getUserByID(
      item.deliveryResponsible
    );
    //const userData: User = mockUser;
    //const deliveryResponsible: User = mockUser;

    const borrowerName = (userData?.name || "") + " " + (userData?.lastName || "");

    const formattedItem = {
      id: item?.id || 0,
      borrowerName: borrowerName || "",
      legajo: userData?.legajo || "",
      email: userData?.email || "",
      phone: userData?.phone || 0,
      borrowedItem: "",
      deliveryDate: formatDate(item?.deliveryDate) || "",
      returnDate: formatDate(item?.returnDate) || "",
      //endingDate: formatDate(item.endingDate),
      amount: item?.amount || 0,
      paymentMethod: item?.paymentMethod.String || "",
      deliveryResponsible: deliveryResponsible?.name || "",
      observation: item?.observation.String || "",
      status: item?.status || "",
    };

    return formattedItem as TableLoan;
  };

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
              {(columnKey) => {
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
