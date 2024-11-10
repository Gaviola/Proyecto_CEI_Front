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
