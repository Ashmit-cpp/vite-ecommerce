import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import { Dog, ShoppingCart } from "lucide-react";
import { ModeToggle } from "./buttons/mode-toggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { SearchField } from "./SearchBar";
import { useScrollPosition } from "./hooks/useScrollPosition";
import NavComponents from "./buttons/NavComponents";
import ShoppingCartButton from "./buttons/ShoppingCartButton";

const Header = () => {
  const scrollPosition = useScrollPosition();

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow  ${
        scrollPosition > 0
          ? "bg-gray-600 bg-opacity-20 shadow-none backdrop-blur-sm backdrop-brightness-80 dark:backdrop-brightness-95"
          : "bg-gray-400 bg-opacity-20  shadow-lg  shadow-slate-500/50	"
      }`}
    >
      <div className="px-1 py-2 border-b opacity-80 lg:px-4">
        <div className="wrapper flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button size={"icon"} variant={"ghost"}>
              <Link to="/">
                <Dog className="text-primary" size={32} />
              </Link>
            </Button>
            <ul className="hidden md:flex items-start gap-2">
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

          <div className=" flex justify-start items-center md:flex gap-1">
            <ul className="mx-2">
              {" "}
              <ModeToggle />
            </ul>
            <ul>
              <ShoppingCartButton />
            </ul>
            <NavComponents />
            <ul>
              <MobileNav />
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
