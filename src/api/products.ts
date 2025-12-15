export const fetchProducts = async (search: string = "") => {
    const url = search
        ? `https://dummyjson.com/products/search?q=${search}`
        : "https://dummyjson.com/products";
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error fetching products");
    }
    return response.json();
};

export const fetchProductById = async (id: string) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
        throw new Error("Failed to load product");
    }
    return response.json();
};
