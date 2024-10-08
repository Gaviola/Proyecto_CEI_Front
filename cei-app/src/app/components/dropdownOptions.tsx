import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown";
import { Button, ButtonGroup } from "@nextui-org/button";
import { TbUserEdit } from "react-icons/tb";
import { GoGear } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import { Avatar } from "@nextui-org/avatar";
import { color } from "framer-motion";

export default function DropdownOptions() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className=" bg-stone-50 hover:bg-stone-200">
          {<FaCircleUser />}
        </Avatar>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu">
        <DropdownItem showDivider key="admin" description="Admin">
          {<h2 className="font-bold">Gabriel</h2>}
        </DropdownItem>
        <DropdownItem
          showDivider
          key="edit"
          startContent={<TbUserEdit className="size-8" />}
        >
          Editar Usuario
        </DropdownItem>
        <DropdownItem
          showDivider
          key="config"
          startContent={<GoGear className="size-8" />}
        >
          Configuración
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger-500 self-center"
        >
          Cerrar Sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
