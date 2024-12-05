import React, { createContext, useContext, useReducer, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  shipping: number;
  subtotal: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

const SHIPPING_RATE = 5.99; // Base shipping rate
const FREE_SHIPPING_THRESHOLD = 50; // Free shipping for orders over $50

const initialState: CartState = {
  items: [],
  total: 0,
  shipping: 0,
  subtotal: 0,
};

const calculateShipping = (subtotal: number): number => {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
};

const calculateTotals = (items: CartItem[]): { subtotal: number; shipping: number; total: number } => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = calculateShipping(subtotal);
  return {
    subtotal,
    shipping,
    total: subtotal + shipping
  };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems)
      };
    }
    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems)
      };
    }
    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems)
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
} | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
    toast({
      title: "Item added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const checkout = async () => {
    try {
      setIsCheckingOut(true);
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      });
      clearCart();
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        state, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart,
        checkout 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};