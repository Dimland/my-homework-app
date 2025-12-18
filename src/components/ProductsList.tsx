import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "../api/products";
import { useNotificationStore } from "../stores/notifications";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export const ProductsList = () => {
  const [search, setSearch] = useState("");
  const { addNotification } = useNotificationStore();

  const { data, isLoading, error, isFetching, isSuccess } = useQuery({
    queryKey: ["products", search],
    queryFn: () => fetchProducts(search),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error) {
      addNotification("error", `Failed to load products: ${error.message}`);
    }
  }, [error, addNotification]);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      addNotification("success", "Products loaded successfully!");
    }
  }, [isSuccess, isFetching, addNotification]);

  return (
    <div className="products-container">
      <h2>Products Catalog</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {isLoading ? (
        <h2>Loading... ⏳</h2>
      ) : error ? (
        <h2 className="error-message">Error occurred: {error.message}</h2>
      ) : (
        <div className={`products-grid ${isFetching ? "fetching" : ""}`}>
          {data.products.map((product: Product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-thumbnail"
              />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>

              <Link to={`/products/${product.id}`} className="product-link">
                More details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
