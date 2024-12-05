import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { toast } from "./ui/use-toast";

interface CartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Cart = ({ open, onOpenChange }: CartProps) => {
  const { state, removeItem, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate shipping cost based on total items
  const calculateShipping = () => {
    const baseShipping = 5.99;
    const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
    const additionalCost = Math.max(0, itemCount - 1) * 2; // $2 for each additional item
    return baseShipping + additionalCost;
  };

  const shippingCost = calculateShipping();
  const subtotal = state.total;
  const total = subtotal + shippingCost;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // For now, just show a success message
      // This would be replaced with actual checkout logic later
      toast({
        title: "Redirecting to checkout",
        description: "You will be redirected to complete your purchase.",
      });
      // Simulate redirect delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Proceeding to checkout with items:", state.items);
    } catch (error) {
      toast({
        title: "Checkout Error",
        description: "There was an error processing your checkout.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-cinzel text-2xl">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 my-4">
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b border-accent/20 pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-cinzel">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-accent hover:bg-accent/90" 
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;