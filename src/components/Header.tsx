import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import { BookHeart, Dog, ShoppingCart } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { SearchField } from "./SearchBar";
import { useScrollPosition } from "./hooks/useScrollPosition";
import { useAuth } from "@/contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { resetNotification } from "@/redux/slices/notificationSlice";

const Header = () => {
  const scrollPosition = useScrollPosition();
  const { token, logout } = useAuth();
  const notificationCount = useSelector(
    (state: RootState) => state.notification.notificationCount
  );
  const dispatch = useDispatch();

  const resetNotiState = () => {
    dispatch(resetNotification());
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow  ${
        scrollPosition > 0
          ? "bg-gray-300 bg-opacity-20 shadow-none backdrop-blur-sm backdrop-brightness-80 dark:backdrop-brightness-95"
          : "bg-gray-400 bg-opacity-20  shadow-lg  shadow-slate-500/50	"
      }`}
    >
      <div className="px-4 py-2 border-b opacity-80">
        <div className="wrapper flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Dog className="text-primary" size={32} />
            </Link>
            <ul className="hidden md:flex items-start gap-5">
              <li className="text-xl font-bold pr-2 text-primary ">
                <Link to="/">Acme</Link>
              </li>
            </ul>
          </div>
          <Separator />
          <nav className="w-full md:flex-between md:flex-row flex-col md:flex items-center justify-center">
            <SearchField />
          </nav>
          <Separator />

          <div className=" flex justify-end gap-3 items-center">
            <ul className="mx-1 hidden md:flex items-start font-semibold gap-5">
              {token ? (
                <li>
                  <Link to="/addproduct">
                    <Button variant={"outline"}>Sell</Button>
                  </Link>
                </li>
              ) : (
                <></>
              )}
              <li>
                {token ? (
                  <Link to="/wishlist">
                    <Button variant={"outline"}>
                      {" "}
                      <BookHeart />
                    </Button>
                  </Link>
                ) : (
                  <></>
                )}
              </li>
              <li className="relative">
                <Link to="/cart" className="relative block">
                  <Button variant="outline" onClick={resetNotiState}>
                    <ShoppingCart />
                  </Button>
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 bg-primary text-white rounded-full px-2 py-1 text-xs -mt-2 -mr-2">
                      {notificationCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
            <ModeToggle />
            {token ? (
              <Button className="my-1" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button className="my-1">
                <Link to="/signup">Sign In</Link>
              </Button>
            )}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
