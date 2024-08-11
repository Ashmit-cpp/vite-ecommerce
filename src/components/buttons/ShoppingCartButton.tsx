import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { resetNotification } from "@/redux/slices/notificationSlice";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import CartComponent from "../pages/Cart";

function ShoppingCartButton() {
  const notificationCount = useSelector(
    (state: RootState) => state.notification.notificationCount
  );
  const dispatch = useDispatch();

  const resetNotiState = () => {
    dispatch(resetNotification());
  };
  return (
    <div>
      {" "}
      <Drawer>
        <DrawerTrigger asChild>
          <div className="relative">
            <Button
              className="relative block p-2"
              size={"icon"}
              variant="outline"
              onClick={resetNotiState}
            >
              <ShoppingCart />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white rounded-full px-2 py-1 text-xs -mt-2 -mr-2 ">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex text-slate-700 dark:text-slate-200 opacity-75 text-xl font-semibold tracking-tighter sm:text-4xl md:text-3xl lg:text-4xl/none">
                Your Cart
              </div>{" "}
            </DrawerTitle>
            <DrawerDescription>Following are the items:</DrawerDescription>
          </DrawerHeader>
          <CartComponent />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default ShoppingCartButton;
