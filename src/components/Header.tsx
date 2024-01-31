import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import { Dog } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { SearchField } from "./SearchBar";
import { useScrollPosition } from "./hooks/useScrollPosition";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const scrollPosition = useScrollPosition();
  const { token, logout } = useAuth();

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow ${
        scrollPosition > 0
          ? "bg-slate-500 bg-opacity-20 shadow-none backdrop-blur-lg backdrop-filter"
          : "bg-slate-500 bg-opacity-20  shadow-lg shadow-slate-500/50	"
      }`}
    >
      <div className="px-4 py-2 border-b">
        <div className="wrapper flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Dog size={32} />
            </Link>
            <ul className="hidden md:flex items-start gap-5">
              <li className="text-xl font-bold pr-2">
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
              <li>{token ? <Link to="/wishlist">Wishlist</Link> : <></>}</li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
            <ModeToggle />
            {token ? (
              <Button className="my-1" onClick={logout} >
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
