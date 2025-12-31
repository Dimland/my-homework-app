import { useSidebar } from "../context/SidebarContext";
import { useCartStore } from "../stores/cart";
import { useTranslation } from "react-i18next";

export const Sidebar = () => {
  const { isOpen, close } = useSidebar();
  const { items, removeFromCart, totalPrice } = useCartStore();
  const { t, i18n } = useTranslation("common");

  if (!isOpen) return null;

  const formattedTotal = new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "USD",
  }).format(totalPrice());

  return (
    <div className="sidebar-overlay">
      <button onClick={close} className="sidebar-close-btn">
        {t("sidebar.close")}
      </button>
      <h2>{t("sidebar.title")}</h2>

      {items.length === 0 ? (
        <p className="cart-empty">{t("sidebar.empty")}</p>
      ) : (
        <>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.title}</strong>
                  <br />${item.price} x {item.quantity}
                </div>
                <button onClick={() => removeFromCart(item.id)}>
                  {t("sidebar.remove")}
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            {t("sidebar.total", { price: formattedTotal })}
          </div>
        </>
      )}
    </div>
  );
};
