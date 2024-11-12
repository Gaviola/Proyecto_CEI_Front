import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown";
import { FaCircleUser } from "react-icons/fa6";
import { Avatar } from "@nextui-org/avatar";
import { User, useUser } from "@/app/context/userContext";
import { MdOutlineInventory, MdOutlineShoppingCart } from "react-icons/md";
import { LuUsers } from "react-icons/lu";



export default function DropdownOptions({ user }: { user: User }) {
  const { setUser } = useUser();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className=" bg-stone-50 hover:bg-stone-200">
          {<FaCircleUser />}
        </Avatar>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu">
        <DropdownSection>
          <DropdownItem key="name" isReadOnly>
            {user.name && <h2 className="font-bold">{user.name}</h2>}
          </DropdownItem>

          <DropdownItem key="email" isReadOnly>
            {user.email && <h2>{user.email}</h2>}
          </DropdownItem>
        </DropdownSection>

        {user.role === "admin" ? (
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
        ) :
          // If user is not admin, do not show any options
          <DropdownItem></DropdownItem>
        }

        <DropdownSection>
          <DropdownItem
            key="logout"
            color="danger"
            className="text-danger-500 self-center"
            onClick={() => {
              // remove user from context
              setUser(null);

              // Clear local storage
              localStorage.removeItem("sessionToken");

              // Redirect to login page
              window.location.href = "/auth/login";
            }}
          >
            Cerrar Sesión
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
