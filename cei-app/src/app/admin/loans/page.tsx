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
import { get } from "lodash";
import { getItemsByType, getEveryItemType } from "@/services/inventory";
import InputSearcher from "@/app/components/inputSearcher";
import { debounce, set } from "lodash";

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
  itemType: number;
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
  itemType: number;
};

const columns = [
  { key: "id", label: "ID" },
  { key: "status", label: "Estado" },
  { key: "borrowerName", label: "Nombre Alumno/Prestatario" },
  { key: "legajo", label: "Legajo" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Celular" },
  { key: "itemType", label: "Elemento prestado" },
  { key: "deliveryDate", label: "Fecha de entrega" },
  { key: "returnDate", label: "Fecha de devolución" },
  { key: "amount", label: "Monto ($)" },
  { key: "paymentMethod", label: "Método de pago" },
  { key: "deliveryResponsible", label: "Responsable de entrega" },
  { key: "observation", label: "Observación" },
];

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [loansTable, setLoansTable] = useState<TableLoan[]>([]);
  const [loanItems, setLoanItems] = useState<
    { id: number; name: string; isGeneric: boolean }[]
  >([]);
  const [searchContent, setSearchContent] = useState("");
  const [filteredLoans, setFilteredLoans] = useState<TableLoan[]>([]);
  const hasMounted = React.useRef(false);

  const searchLoans = (searchContent: string) => {
    
    debounce(() => {
      const filtered = loansTable.filter(
        (loan) =>
          (loan.borrowerName &&
            loan.borrowerName.toLowerCase().includes(searchContent.toLowerCase())) ||
          (loan.email &&
            loan.email.toLowerCase().includes(searchContent.toLowerCase()))
      );
      setFilteredLoans(filtered);
      
    }, 100)();
  };

  useEffect(() => {
    if (hasMounted.current) {
      searchLoans(searchContent);
    } else {
      hasMounted.current = true;
    }
  }, [searchContent]);

  const handleSelectedKey = (key: Selection) => {
    if (key === "all") {
      // Manejo si seleccionas "all"
      setSelectedLoan(null); // Si seleccionas "all", no hay un préstamo específico seleccionado
    } else {
      // Aquí asumimos que key es un Set<Key>
      const selectedKey = Array.from(key)[0]; // Obtiene la primera clave del conjunto (si hay alguna)
      const selectedLoan =
        loans.find((loan) => loan.id.toString() === selectedKey) || null;

      setSelectedLoan(selectedLoan); // Actualiza el estado del préstamo seleccionado
    }
  };

  const fetchAndFormatLoans = async () => {
    const data = await fetchLoans();
    setLoans(data);

    const formattedLoans = await Promise.all(
      data.map((loan: Loan) => formatItem(loan))
    );
    setLoansTable(formattedLoans);
  };

  const fetchItems = async () => {
    try {
      const items = await getEveryItemType();
      setLoanItems(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchItems(); // Espera a que se carguen los items
      await fetchAndFormatLoans(); // Luego carga los préstamos y los formatea
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const pages = Math.ceil(loans?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredLoans.slice(start, end);
  }, [page, filteredLoans]);

  interface FormattedItem {
    [key: string]: any;
  }

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

  const formatItem = async (item: Loan): Promise<TableLoan> => {
    const userData: User = await getUserByID(item.borrowerName);
    const deliveryResponsible: User = await getUserByID(
      item.deliveryResponsible
    );

    const borrowerName =
      (userData?.name || "") + " " + (userData?.lastname || "");

    const borrowedItem = loanItems.find((i) => i.id === item.itemType);

    const formattedItem = {
      id: item?.id || 0,
      borrowerName: borrowerName || "",
      legajo: userData?.student_id || "",
      email: userData?.email || "",
      phone: userData?.phone || 0,
      itemType: item?.itemType || "",
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
      <div className="flex flex-row  ">

        <div className="align-top">
          <InputSearcher
          onChange={debounce(setSearchContent, 300)}
          onEnter={setSearchContent}
          placeholder="Filtrar préstamo"
        />
        </div>
        

        <LoanModal
          loan={selectedLoan}
          loans={loans}
          setLoans={setLoans}
          fetchAndFormatLoans={fetchAndFormatLoans}
          items={loanItems}
        />
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
