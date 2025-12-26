import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  role: string;
}

interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  customImage?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

// Auth Store
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        localStorage.setItem("versehaven_token", token);
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem("versehaven_token");
        set({ user: null, token: null });
      },
    }),
    {
      name: "versehaven-auth",
    }
  )
);

// Cart Store (local, synced to server on auth)
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        const existingIndex = items.findIndex((i) => i.productId === item.productId);

        if (existingIndex > -1) {
          const newItems = [...items];
          newItems[existingIndex].quantity += item.quantity;
          set({ items: newItems });
        } else {
          const newItem = { ...item, id: `local_${Date.now()}` };
          set({ items: [...items, newItem] });
        }
      },

      updateQuantity: (productId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          set({ items: items.filter((i) => i.productId !== productId) });
        } else {
          set({
            items: items.map((i) =>
              i.productId === productId ? { ...i, quantity } : i
            ),
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "versehaven-cart",
    }
  )
);
