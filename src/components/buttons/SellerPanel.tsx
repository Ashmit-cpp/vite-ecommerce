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

function SellerPanel() {
  const { token } = useAuth();

  return (
    <div>
      <ul className="mx-1 hidden md:flex items-start font-semibold gap-5">
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
              <Link to="/addproducts">
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
              <Link to="/deleteproducts">
                <DropdownMenuItem>
                  <Button variant={"ghost"} className="min-w-32" size={"sm"}>
                    Manage Account
                  </Button>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <></>
        )}
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
      </ul>
    </div>
  );
}

export default SellerPanel;
