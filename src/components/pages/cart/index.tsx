import CartTable from "@/components/CartTable";
import { Button } from "@/components/ui/button";
import { DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { useCart } from "./use-cart";
import { Loader2 } from "lucide-react";

export default function CartPage() {
  const { cartData, loading, fetchCartData, handleRemoveFromCart, handleCheckout } =
    useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      {cartData && cartData.items.length > 0 ? (
        <div className="m-2 max-h-[420px] flex flex-col items-center justify-center">
          <CartTable
            cartData={cartData}
            fetchCartData={fetchCartData}
            handleRemoveFromCart={handleRemoveFromCart}
          />
          <DrawerFooter className="p-2">
            <DrawerClose asChild>
              <Button onClick={handleCheckout}>Checkout</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-foreground text-xl font- sm:text-2xl md:text-3xl lg:text-2xl/none">
            Your Cart is empty.
          </h1>
        </div>
      )}
    </div>
  );
}
