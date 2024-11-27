// notification.store.ts

import { create } from 'zustand';
import { NotificationId, Notification, NotificationPreference } from './app.types';
import { init } from 'next/dist/compiled/webpack/webpack';
import { initialSampleNotifications } from './initialData';
interface NotificationStateStore {
    notifications: Notification[];
    notificationPreferences: NotificationPreference;
    fetchNotifications: () => Promise<void>;
    // ... other actions
    addNotification: (notification: Notification) => void;
    removeNotification: (notificationId: NotificationId) => void;
    markNotificationAsRead: (notificationId: NotificationId) => void;
    // markNotificationAsUnread: (notificationId: NotificationId) => void;
    togglePreference: (type: keyof NotificationPreference) => void;
}
const useStore = create<NotificationStateStore>((set) => ({
    notifications: initialSampleNotifications,
    // ...
    fetchNotifications: async () => {
        try {
            const response = (await fetch('/api/notifications')); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }
            const data = await response.json();
            set({ notifications: data });
        } catch (error) {
            console.error('Error fetching notifications', error);
        }
    },
    // ... other actions
    notificationPreferences: {
        projectUpdates: true,
        billingReminders: true,
        newMessages: true,
        emailUpdates: false,
    }, // State to store notification preferences

    // Actions to manage notifications
    addNotification: (notification: Notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
    removeNotification: (id: NotificationId) => set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
    markNotificationAsRead: (id: NotificationId) => set((state) => ({
        notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    })),

    // Actions to manage notification preferences
    togglePreference: (preference: keyof NotificationPreference) => set((state) => ({
        notificationPreferences: {
            ...state.notificationPreferences,
            [preference]: !state.notificationPreferences[preference],
        },
    })),
}));

export default useStore;
