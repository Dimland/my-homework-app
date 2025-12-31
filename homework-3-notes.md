# Homework 3 Reflection

## State Distribution

- **TanStack Query (Server State):**

  - `Products List`: Fetched from `/products`.
  - `Product Details`: Fetched from `/products/:id`.
  - _Reasoning:_ This data is owned by the server, needs caching, loading states, and deduplication.

- **Context API (Global UI State):**

  - `Sidebar Open/Closed`: Managed in `SidebarContext`.
  - _Reasoning:_ This is a layout-level toggle used by the Header (to open) and the Sidebar itself (to close). It doesn't change often, so Context is perfect to avoid prop drilling.

- **Zustand (Global Atomic State):**

  - `Notifications (Toasts)`: Managed in `useNotificationStore`.
  - _Reasoning:_ Notifications can be triggered from _anywhere_ (components, hooks, API callbacks). Zustand allows us to trigger a toast without needing to wrap everything in a Provider or cause re-renders of the entire app tree.

- **Local useState (Local UI State):**
  - `Search Query`: Inside `ProductsList`.
  - _Reasoning:_ The search text is only relevant to the list component. Making it global would be over-engineering.

## Key Learnings

1.  **Separation of Concerns:** It became very clear that not everything belongs in one place. Server data goes to Query, UI toggles to Context, and app-wide events to Zustand.
2.  **Persistence is Easy:** Creating a `useLocalStorage` hook makes persisting UI state (like the sidebar) trivial and improves UX significantly.
3.  **Zustand Simplicity:** Compared to Redux or Context, Zustand is incredibly minimal. No providers, just a hook. This makes it ideal for things like a Toast system.
4.  **Global vs Local:** I learned to ask "Who needs this data?". If only one component needs it -> Local. If the Layout needs it -> Context. If random parts of the app need it -> Zustand.
