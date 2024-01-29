import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
function MobileNav() {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Button variant="outline" size="icon">
            <ChevronRightIcon className="h-4 w-4" />
          </Button>{" "}
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg:white md:hidden">
          <ul className="flex items-start gap-5 md:flex-between md:flex-row flex-col">
            <Link to="/home">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default MobileNav;
