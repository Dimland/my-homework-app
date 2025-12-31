import { create } from "zustand";

export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addToCart: (product: { id: number; title: string; price: number }) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    addToCart: (product) => {
        set((state) => {
            const existingItem = state.items.find((item) => item.id === product.id);
            if (existingItem) {
                return {
                    items: state.items.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return {
                items: [...state.items, { ...product, quantity: 1 }],
            };
        });
    },
    removeFromCart: (id) => {
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        }));
    },
    clearCart: () => set({ items: [] }),
    totalPrice: () => {
        return get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    },
}));
