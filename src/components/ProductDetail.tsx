import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

export const ProductDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],

    queryFn: async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to load product");
      }
      return response.json();
    },

    enabled: !!id,
  });

  if (isLoading) return <h2>Loading details...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <Link to="/products">← Back to list</Link>

      <h1>{data.title}</h1>
      <img src={data.thumbnail} alt={data.title} style={{ width: "100%" }} />
      <p>{data.description}</p>
      <h3>Price: ${data.price}</h3>
      <p>Category: {data.category}</p>
    </div>
  );
};
