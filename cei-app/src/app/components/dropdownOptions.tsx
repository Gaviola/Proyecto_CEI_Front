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
import { LuUsers } from "react-icons/lu";
import { MdOutlineInventory, MdOutlineShoppingCart } from "react-icons/md";

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

        <DropdownSection title={"Vistas"} className="block sm:hidden">
          <DropdownItem
            key="usuarios"
            href="/admin/users"
            startContent={<LuUsers className="size-5 text-zinc-500" />}
          >
            {<h2 className="">Usuarios</h2>}
          </DropdownItem>

          <DropdownItem
            key="inventario"
            href="/admin/inventory"
            startContent={
              <MdOutlineShoppingCart className="size-5 text-zinc-500" />
            }
          >
            {<h2 className="">Inventario</h2>}
          </DropdownItem>
          <DropdownItem
            showDivider
            key="prestamos"
            href="/admin/loans"
            startContent={
              <MdOutlineInventory className="size-5 text-zinc-500" />
            }
          >
            {<h2 className="">Préstamos</h2>}
          </DropdownItem>
        </DropdownSection>

        <DropdownSection title={"Opciones"}>
          <DropdownItem
            key="edit"
            startContent={<TbUserEdit className="size-5 text-zinc-500" />}
          >
            Editar Usuario
          </DropdownItem>
          <DropdownItem
            showDivider
            key="config"
            startContent={<GoGear className="size-5 text-zinc-500" />}
          >
            Configuración
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="logout"
            color="danger"
            className="text-danger-500 self-center"
          >
            Cerrar Sesión
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
