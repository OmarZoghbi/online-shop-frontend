import { computed, reactive } from "vue";

export type CartProduct = {
    id: number;
    name: string;
    category: string;
    price: number;
    oldPrice?: number;
    badge?: string;
    emoji?: string;
    image?: string;
};

export type CartItem = CartProduct & {
    quantity: number;
};

const CART_STORAGE_KEY = "atlas-store-cart";

function hasLocalStorage(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function loadCartItems(): CartItem[] {
    if (!hasLocalStorage()) {
        return [];
    }

    try {
        const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

        if (!rawCart) {
            return [];
        }

        const parsedCart = JSON.parse(rawCart);

        if (!Array.isArray(parsedCart)) {
            return [];
        }

        return parsedCart
            .filter((item) => item && typeof item.id === "number")
            .map((item) => ({
                ...item,
                price: Number(item.price),
                quantity: Number(item.quantity),
            }))
            .filter((item) => item.quantity > 0 && item.price >= 0);
    } catch (error) {
        console.error("Warenkorb konnte nicht geladen werden.", error);
        return [];
    }
}

const state = reactive({
    items: loadCartItems(),
});

function saveCart(): void {
    if (!hasLocalStorage()) {
        return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
}

function addToCart(product: CartProduct): void {
    const existingItem = state.items.find((item) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
        saveCart();
        return;
    }

    state.items.push({
        ...product,
        quantity: 1,
    });

    saveCart();
}

function removeFromCart(productId: number): void {
    state.items = state.items.filter((item) => item.id !== productId);
    saveCart();
}

function increaseQuantity(productId: number): void {
    const item = state.items.find((entry) => entry.id === productId);
    if (!item) return;

    item.quantity += 1;
    saveCart();
}

function decreaseQuantity(productId: number): void {
    const item = state.items.find((entry) => entry.id === productId);
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity -= 1;
        saveCart();
        return;
    }

    removeFromCart(productId);
}

function clearCart(): void {
    state.items = [];
    saveCart();
}

const totalItems = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
);

const totalPrice = computed(() =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export function useCart() {
    return {
        items: computed(() => state.items),
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
    };
}