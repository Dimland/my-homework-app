import { create } from "zustand";

export interface Notification {
    id: string;
    type: "success" | "error" | "info";
    message: string;
}

interface NotificationStore {
    notifications: Notification[];
    addNotification: (type: Notification["type"], message: string) => void;
    removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    addNotification: (type, message) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
            notifications: [...state.notifications, { id, type, message }],
        }));

        // Auto-remove after 3 seconds
        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((n) => n.id !== id),
            }));
        }, 3000);
    },
    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        })),
}));
