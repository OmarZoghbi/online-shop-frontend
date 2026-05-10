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

const state = reactive({
    items: [] as CartItem[],
});

function addToCart(product: CartProduct): void {
    const existingItem = state.items.find((item) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
        return;
    }

    state.items.push({
        ...product,
        quantity: 1,
    });
}

function removeFromCart(productId: number): void {
    state.items = state.items.filter((item) => item.id !== productId);
}

function increaseQuantity(productId: number): void {
    const item = state.items.find((entry) => entry.id === productId);
    if (!item) return;

    item.quantity += 1;
}

function decreaseQuantity(productId: number): void {
    const item = state.items.find((entry) => entry.id === productId);
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity -= 1;
        return;
    }

    removeFromCart(productId);
}

function clearCart(): void {
    state.items = [];
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