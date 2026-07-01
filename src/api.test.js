import { describe, expect, test, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => {
    return {
        getMock: vi.fn(),
        postMock: vi.fn(),
        putMock: vi.fn(),
        deleteMock: vi.fn(),
    };
});

vi.mock("axios", () => {
    return {
        default: {
            create: vi.fn(() => ({
                get: mocks.getMock,
                post: mocks.postMock,
                put: mocks.putMock,
                delete: mocks.deleteMock,
            })),
        },
    };
});

describe("API client", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should load all products from backend", async () => {
        const { getProducts } = await import("./api");
        const products = [{ id: 1, name: "Laptop", price: 899.99 }];
        mocks.getMock.mockResolvedValue({ data: products });

        const actual = await getProducts();

        expect(actual).toEqual(products);
        expect(mocks.getMock).toHaveBeenCalledWith("/products");
    });

    test("should create product through backend", async () => {
        const { createProduct } = await import("./api");
        const input = { name: "Laptop", price: 899.99 };
        const saved = { id: 1, name: "Laptop", price: 899.99 };
        mocks.postMock.mockResolvedValue({ data: saved });

        const actual = await createProduct(input);

        expect(actual).toEqual(saved);
        expect(mocks.postMock).toHaveBeenCalledWith("/products", input);
    });

    test("should update product through backend", async () => {
        const { updateProduct } = await import("./api");
        const input = { name: "Neuer Name", price: 29.99 };
        const updated = { id: 1, name: "Neuer Name", price: 29.99 };
        mocks.putMock.mockResolvedValue({ data: updated });

        const actual = await updateProduct(1, input);

        expect(actual).toEqual(updated);
        expect(mocks.putMock).toHaveBeenCalledWith("/products/1", input);
    });

    test("should delete product through backend", async () => {
        const { deleteProduct } = await import("./api");
        mocks.deleteMock.mockResolvedValue({});

        await deleteProduct(1);

        expect(mocks.deleteMock).toHaveBeenCalledWith("/products/1");
    });
});
