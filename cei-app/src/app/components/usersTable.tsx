import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import React from "react";
import type { User } from "../admin/users/page";
import { Spinner } from "@nextui-org/spinner";
import { Selection } from "@react-types/shared";

const columns = [
  { key: "name", label: "Nombre" },
  { key: "lastname", label: "Apellido" },
  { key: "dni", label: "DNI" },
  { key: "email", label: "Email" },
];

export default function UsersTable({ users, isLoading, onSelectionChange }: { users: User[], isLoading: boolean, onSelectionChange: (keys: Selection) => void }) {
  const rowsPerPage = 10;
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(users?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
    <>
      <Table
        aria-label="Users Table"
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
        onSelectionChange={onSelectionChange}
        classNames={
          {
            base: "",
          }
        }
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
              {(columnKey) => (
                <TableCell> {getKeyValue(item, columnKey)} </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
