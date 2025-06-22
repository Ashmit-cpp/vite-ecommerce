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
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function MobileNav() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Button variant="link" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg:white md:hidden">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-xl">Navigate</h1>
            
            {isAuthenticated ? (
              <>
                <div className="text-sm text-muted-foreground mb-2">
                  Welcome, {user?.email}
                </div>
                
                <SheetClose asChild>
                  <Link to="/wishlist">
                    <Button variant={"link"} className="min-w-32 justify-start">
                      <BookHeart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link to="/myproducts">
                    <Button variant={"link"} className="min-w-32 justify-start">
                      <TableProperties className="mr-2 h-4 w-4" />
                      My Products
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link to="/manageaccount">
                    <Button variant={"link"} className="min-w-32 justify-start">
                      <SquareUserRound className="mr-2 h-4 w-4" />
                      Manage Account
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Button 
                    variant={"link"} 
                    className="min-w-32 justify-start text-red-600 hover:text-red-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </SheetClose>
              </>
            ) : (
              <>
                <SheetClose asChild>
                  <Link to="/login">
                    <Button variant={"link"} className="min-w-32 justify-start">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link to="/signup">
                    <Button variant={"link"} className="min-w-32 justify-start">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default MobileNav;
