import { useNotificationStore } from "../stores/notifications";

export const ToastHost = () => {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div className="toast-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`toast-item toast-${notification.type}`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="toast-close-btn"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};
