import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import { Dog } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { SearchField } from "./SearchBar";

const Header = () => {
  return (
    <div className="m-2 border-b">
      <div className="wrapper flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Dog size={32} />

          <ul className="hidden md:flex items-start gap-5">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        <Separator />
        <nav className="w-full md:flex-between md:flex-row flex-col md:flex items-center justify-center">
          <SearchField />
        </nav>
        <Separator />

        <div className=" flex justify-end gap-3 items-center">
          <ul className="mx-1 hidden md:flex items-start gap-5">
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
          <ModeToggle />

          <Button className="my-1">
            <Link to="/signup">Sign In</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
