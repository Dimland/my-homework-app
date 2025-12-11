import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export const ProductsList = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["products", search],
    queryFn: async () => {
      const url = search
        ? `https://dummyjson.com/products/search?q=${search}`
        : "https://dummyjson.com/products";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      return response.json();
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products Catalog</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
          width: "300px",
          fontSize: "16px",
        }}
      />

      {isLoading ? (
        <h2>Loading... ⏳</h2>
      ) : error ? (
        <h2 style={{ color: "red" }}>Error occurred: {error.message}</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            opacity: isFetching ? 0.5 : 1,
            transition: "opacity 0.3s",
          }}
        >
          {data.products.map((product: Product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ height: "100px" }}
              />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>

              <Link to={`/products/${product.id}`} style={{ color: "blue" }}>
                More details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
