import { create } from "zustand";
import { CartItem, User } from "../types/types";

type State = {
    user: User | null;
    cart: CartItem[];
};

type Action = {
    addToCart: (id: number, sku: string) => void;
    emptyCart: () => void;
    logIn: (user: User) => void;
    logOut: () => void;
    updateCartQuantity: (sku: string, quantity: number) => void;
};

export const useShoeStore = create<State & Action>((set) => ({
    user: null,
    cart: [],
    addToCart: (id: number, sku: string) => {
        set(({ cart }) => {
            const itemInCart = cart.find((i) => i.sku === sku);
            return {
                cart: itemInCart ? cart.map((item) => item.sku === sku ? 
                { ...item, quantity: item.quantity + 1 } : item ) : [...cart, { id, sku, quantity: 1}]
            };
        });
    },
    emptyCart: () => set({ cart: [] }),
    logIn: (user) => set({ user }),
    logOut: () => set({ user: null }),
    updateCartQuantity: (sku: string, quantity: number) => {
        set(({ cart }) => ({
            cart: quantity === 0 ? cart.filter((i) => i.sku !== sku) : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i ))
        }));
    }
}));