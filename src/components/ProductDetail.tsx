import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/products";

export const ProductDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  if (isLoading) return <h2>Loading details...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <div className="product-detail-container">
      <Link to="/products">← Back to list</Link>

      <h1>{data.title}</h1>
      <img
        src={data.thumbnail}
        alt={data.title}
        className="product-detail-image"
      />
      <p>{data.description}</p>
      <h3>Price: ${data.price}</h3>
      <p>Category: {data.category}</p>
    </div>
  );
};
