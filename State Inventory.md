# State Inventory

## State List

1.  **Products List**

    - **Type:** Server State
    - **Description:** The list of products fetched from the API.
    - **Management:** TanStack Query (`useQuery`).

2.  **Product Details**

    - **Type:** Server State
    - **Description:** Detailed information about a specific product.
    - **Management:** TanStack Query (`useQuery`).

3.  **Search Query**

    - **Type:** Client/UI State (Local)
    - **Description:** The text entered in the search input field.
    - **Management:** Local `useState` in `ProductsList` component (currently). _Could be moved to URL state for better UX._

4.  **Sidebar Open/Closed** (To be implemented)

    - **Type:** Client/UI State (Global)
    - **Description:** Whether the global sidebar is visible or hidden.
    - **Management:** React Context + `localStorage`.

5.  **Notifications/Toasts** (To be implemented)

    - **Type:** Client/UI State (Global)
    - **Description:** Temporary messages (success/error) shown to the user.
    - **Management:** Zustand/Jotai Store.

6.  **Theme (Light/Dark)** (Bonus/Optional)
    - **Type:** Client/UI State (Global)
    - **Description:** The visual theme of the application.
    - **Management:** Zustand/Jotai or Context + `localStorage`.

## Conclusion

- **TanStack Query Only:** Data that comes from the backend (`Products List`, `Product Details`) clearly belongs to TanStack Query. It handles caching, loading states, and synchronization with the server automatically.
- **Global Client State:** State that needs to be accessed by many disparate components (like the `Sidebar` visibility or `Notifications`) makes sense as global client state. The Sidebar is a good candidate for Context because it's a UI toggle used in the layout. Notifications are better suited for an atomic store like Zustand or Jotai to avoid unnecessary re-renders of the whole app tree.
- **Local UI State:** The `Search Query` is currently local state because it's primarily used within the `ProductsList` component to filter the query.
