import { describe, expect, test, beforeEach } from "vitest";
import { useCart, type CartProduct } from "./cart";

const laptop: CartProduct = {
    id: 1,
    name: "Laptop",
    category: "Elektronik",
    price: 899.99,
};

const tshirt: CartProduct = {
    id: 2,
    name: "T-Shirt",
    category: "Mode",
    price: 19.99,
};

describe("Cart store", () => {
    beforeEach(() => {
        const cart = useCart();
        cart.clearCart();
    });

    test("should add product to cart", () => {
        const cart = useCart();

        cart.addToCart(laptop);

        expect(cart.items.value).toHaveLength(1);
        expect(cart.items.value[0].id).toBe(1);
        expect(cart.items.value[0].name).toBe("Laptop");
        expect(cart.items.value[0].quantity).toBe(1);
    });

    test("should increase quantity when adding same product again", () => {
        const cart = useCart();

        cart.addToCart(laptop);
        cart.addToCart(laptop);

        expect(cart.items.value).toHaveLength(1);
        expect(cart.items.value[0].quantity).toBe(2);
    });

    test("should remove product from cart", () => {
        const cart = useCart();

        cart.addToCart(laptop);
        cart.removeFromCart(1);

        expect(cart.items.value).toHaveLength(0);
    });

    test("should increase quantity of existing product", () => {
        const cart = useCart();

        cart.addToCart(laptop);
        cart.increaseQuantity(1);

        expect(cart.items.value[0].quantity).toBe(2);
    });

    test("should decrease quantity of existing product", () => {
        const cart = useCart();

        cart.addToCart(laptop);
        cart.addToCart(laptop);
        cart.decreaseQuantity(1);

        expect(cart.items.value[0].quantity).toBe(1);
    });

    test("should remove product when decreasing quantity from one to zero", () => {
        const cart = useCart();

        cart.addToCart(laptop);
        cart.decreaseQuantity(1);

        expect(cart.items.value).toHaveLength(0);
    });

    test("should calculate total number of items", () => {
        const cart = useCart();

        cart.addToCart(laptop);
        cart.addToCart(laptop);
        cart.addToCart(tshirt);

        expect(cart.totalItems.value).toBe(3);
    });

    test("should calculate total price", () => {
        const cart = useCart();

        cart.addToCart(laptop);
        cart.addToCart(tshirt);

        const expected = 919.98;
        const actual = cart.totalPrice.value;

        expect(actual).toBeCloseTo(expected, 2);
    });

    test("should clear cart", () => {
        const cart = useCart();

        cart.addToCart(laptop);
        cart.addToCart(tshirt);
        cart.clearCart();

        expect(cart.items.value).toHaveLength(0);
        expect(cart.totalItems.value).toBe(0);
        expect(cart.totalPrice.value).toBe(0);
    });
});
