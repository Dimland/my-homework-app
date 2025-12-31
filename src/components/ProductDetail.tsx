import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/products";
import { useTranslation } from "react-i18next";

export const ProductDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation(["products", "common"]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  if (isLoading) return <h2>{t("status.loading", { ns: "common" })}</h2>;
  if (error)
    return (
      <h2>{t("status.error", { message: error.message, ns: "common" })}</h2>
    );

  const formattedPrice = new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "USD",
  }).format(data.price);

  return (
    <div className="product-detail-container">
      <Link to="/products">← {t("details.back")}</Link>

      <h1>{data.title}</h1>
      <img
        src={data.thumbnail}
        alt={data.title}
        className="product-detail-image"
      />
      <p>{data.description}</p>
      <h3>
        {t("columns.price")}: {formattedPrice}
      </h3>
      <p>
        {t("columns.category")}: {data.category}
      </p>
    </div>
  );
};
