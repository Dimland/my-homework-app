import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "../api/products";
import { useNotificationStore } from "../stores/notifications";
import { useCartStore } from "../stores/cart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation, Trans } from "react-i18next";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

export const ProductsList = () => {
  const [search, setSearch] = useState("");
  const { addNotification } = useNotificationStore();
  const { addToCart } = useCartStore();
  const { t, i18n } = useTranslation("products");

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

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    addNotification("success", `Added "${product.title}" to cart`);
  };

  const imageBodyTemplate = (product: Product) => {
    return (
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-6rem shadow-2 border-round"
        style={{ width: "64px", borderRadius: "4px" }}
      />
    );
  };

  const priceBodyTemplate = (product: Product) => {
    return new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "USD",
    }).format(product.price);
  };

  const actionBodyTemplate = (product: Product) => {
    return (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Link to={`/products/${product.id}`}>
          <Button
            icon="pi pi-search"
            rounded
            text
            aria-label={t("buttons.viewDetails", { ns: "common" })}
            tooltip={t("buttons.viewDetails", { ns: "common" })}
          />
        </Link>
        <Button
          icon="pi pi-shopping-cart"
          rounded
          text
          severity="success"
          aria-label={t("buttons.addToCart", { ns: "common" })}
          tooltip={t("buttons.addToCart", { ns: "common" })}
          onClick={() => handleAddToCart(product)}
        />
      </div>
    );
  };

  const header = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
        {t("list.title")}
      </span>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const count = data?.products?.length || 0;

  const footer = (
    <div>
      <Trans i18nKey="list.count" count={count} ns="products">
        Showing <strong>{count}</strong> products
      </Trans>
    </div>
  );

  if (error) {
    return <h2 className="error-message">Error occurred: {error.message}</h2>;
  }

  return (
    <div className="products-container">
      <div className="card">
        <DataTable
          value={data?.products}
          loading={isLoading || isFetching}
          header={header}
          footer={footer}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          tableStyle={{ minWidth: "50rem" }}
          emptyMessage="No products found."
        >
          <Column field="title" header={t("columns.title")} sortable></Column>
          <Column
            field="price"
            header={t("columns.price")}
            body={priceBodyTemplate}
            sortable
          ></Column>
          <Column
            field="category"
            header={t("columns.category")}
            sortable
          ></Column>
          <Column header={t("columns.image")} body={imageBodyTemplate}></Column>
          <Column
            header={t("columns.actions")}
            body={actionBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};
