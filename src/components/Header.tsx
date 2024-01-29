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
          <Dog />
          <ul className="hidden md:flex items-start gap-5">
            <li>Home</li>
          </ul>
        </div>
        <Separator />
        <nav className="w-full md:flex-between md:flex-row flex-col md:flex items-center justify-center">
          <SearchField />
        </nav>
        <Separator />

        <div className=" flex justify-end gap-3 items-center">
          <ul className="mx-1 hidden md:flex items-start gap-5">
            <li>Cart</li>
            <li>Profile</li>
          </ul>
          <ModeToggle />

          <Button className="my-1">Sign In</Button>

          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
