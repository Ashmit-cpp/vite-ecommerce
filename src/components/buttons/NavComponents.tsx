import { BookHeart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Sell on Acme</NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-wrap align-middle justify-center">
                    <NavigationMenuLink>
                      <Link to="/myproducts">
                        <Button variant={"ghost"} className="m-w-20 border-b-2">
                          Manage Products
                        </Button>
                      </Link>
                    </NavigationMenuLink>

                    <NavigationMenuLink>
                      <Link to="/manageaccount">
                        <Button variant={"ghost"} className="m-w-20 border-b-2">
                          Manage Account
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink>
                      <Link to="/contact">
                        <Button variant={"ghost"}>Help & Support</Button>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
