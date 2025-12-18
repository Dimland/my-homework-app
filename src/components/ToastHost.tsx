import { useNotificationStore } from "../stores/notifications";

export const ToastHost = () => {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 2000,
      }}
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            padding: "15px",
            borderRadius: "8px",
            color: "#fff",
            backgroundColor:
              notification.type === "success"
                ? "#4caf50"
                : notification.type === "error"
                ? "#f44336"
                : "#2196f3",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            minWidth: "250px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              marginLeft: "10px",
              fontWeight: "bold",
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};
