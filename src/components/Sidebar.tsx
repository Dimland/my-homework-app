import { useSidebar } from "../context/SidebarContext";
import { useCartStore } from "../stores/cart";

export const Sidebar = () => {
  const { isOpen, close } = useSidebar();
  const { items, removeFromCart, totalPrice } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="sidebar-overlay">
      <button onClick={close} className="sidebar-close-btn">
        Close X
      </button>
      <h2>Shopping Cart</h2>

      {items.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.title}</strong>
                  <br />${item.price} x {item.quantity}
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-total">Total: ${totalPrice().toFixed(2)}</div>
        </>
      )}
    </div>
  );
};
