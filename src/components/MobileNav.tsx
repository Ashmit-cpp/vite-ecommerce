import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import {
  BookHeart,
  LogIn,
  LogOut,
  Menu,
  SquareUserRound,
  TableProperties,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function MobileNav() {
  const { token, logout } = useAuth();

  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Button variant="link" size="icon">
            <Menu />
          </Button>{" "}
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg:white md:hidden">
          <ul className="flex items-center gap-5 md:flex-between m-w-[90px] md:flex-row flex-col ">
            <h1 className="font-semibold text-xl ">Navigate</h1>
            <li>
              {token ? (
                <Link to="/wishlist">
                  <SheetClose>
                    <Button variant={"link"} className="min-w-32">
                      {" "}
                      <BookHeart />
                      <h1 className="ml-2">Wishlist</h1>
                    </Button>
                  </SheetClose>
                </Link>
              ) : (
                <></>
              )}
            </li>
            {token ? (
              <li>
                <Link to="/myproducts">
                  <SheetClose>
                    <Button variant={"link"} className=" min-w-32">
                      <TableProperties /> <h1 className="ml-2">My Products</h1>
                    </Button>
                  </SheetClose>
                </Link>
              </li>
            ) : (
              <></>
            )}

            {token ? (
              <li>
                <Link to="/manageaccount">
                  <SheetClose>
                    <Button variant={"link"} className=" min-w-32">
                      <SquareUserRound /> <h1 className="ml-2">My Account</h1>
                    </Button>
                  </SheetClose>
                </Link>
              </li>
            ) : (
              <></>
            )}
            <li className="">
              {" "}
              {token ? (
                <SheetClose>
                  <Button variant="link" className="my-1" onClick={logout}>
                    <LogOut />
                    <h1 className="ml-2">Logout</h1>
                  </Button>
                </SheetClose>
              ) : (
                <Button variant="link" className="my-1">
                  <LogIn />
                  <Link to="/signup">
                    <SheetClose>
                      <h1 className="ml-2"> Sign In</h1>
                    </SheetClose>
                  </Link>
                </Button>
              )}
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default MobileNav;
