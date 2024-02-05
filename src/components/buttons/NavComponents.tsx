import { BookHeart, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function NavComponents() {
  const { token, logout } = useAuth();

  return (
    <div>
      <ul className="mx-2 hidden md:flex items-center gap-4 font-semibold">
        <li>
          {token ? (
            <Link to="/wishlist">
              <Button size={"icon"} variant={"outline"}>
                {" "}
                <BookHeart />
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </li>
        <li>
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="pr-2">
                  Sell on Acme
                  <ChevronDown className="mt-1" size={"24"} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" gap-3 rounded-lg mt-3 border-4 bg-gray-100 dark:bg-slate-950  m-w-20 transition-transform duration-300 ease-in-out transform">
                <Link to="/myproducts">
                  <DropdownMenuItem>
                    <Button
                      variant={"ghost"}
                      className="min-w-32 border-b-4"
                      size={"sm"}
                    >
                      Manage Products
                    </Button>
                  </DropdownMenuItem>
                </Link>
                <Link to="/manageaccount">
                  <DropdownMenuItem>
                    <Button
                      variant={"ghost"}
                      className="min-w-32 border-b-4"
                      size={"sm"}
                    >
                      Manage Account
                    </Button>
                  </DropdownMenuItem>
                </Link>
                <Link to="/contact">
                  <DropdownMenuItem>
                    <Button
                      variant={"ghost"}
                      className="min-w-32 border-b-4"
                      size={"sm"}
                    >
                      Help & Support
                    </Button>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <></>
          )}
        </li>

        <li className="">
          {" "}
          {token ? (
            <Button className="my-1" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button className="my-1">
              <Link to="/signup">Sign In</Link>
            </Button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default NavComponents;
