import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { BookHeart, Menu, Receipt, ShoppingCart } from "lucide-react";
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
            {token ? (
              <li>
                <Link to="/addproduct">
                  <Button variant={"link"} className=" min-w-32">
                    <Receipt />
                    Sell
                  </Button>
                </Link>
              </li>
            ) : (
              <></>
            )}
            <li>
              {token ? (
                <Link to="/wishlist">
                  <Button variant={"link"} className="min-w-32">
                    {" "}
                    <BookHeart />
                    <h1 className="ml-2">Wishlist</h1>
                  </Button>
                </Link>
              ) : (
                <></>
              )}
            </li>
            <li className="relative">
              <Link to="/cart" className="relative block">
                <Button variant="link" className="min-w-32">
                  <ShoppingCart />
                  <h1 className="ml-2">Cart</h1>
                </Button>
                {/* {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 bg-primary text-white rounded-full px-2 py-1 text-xs -mt-2 -mr-2">
                      {notificationCount}
                    </span>
                  )} */}
              </Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default MobileNav;
