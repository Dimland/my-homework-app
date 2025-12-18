import { useSidebar } from "../context/SidebarContext";

export const Sidebar = () => {
  const { isOpen, close } = useSidebar();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "300px",
        height: "100%",
        backgroundColor: "#fff",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.5)",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <button onClick={close} style={{ marginBottom: "20px" }}>
        Close X
      </button>
      <h2>Sidebar</h2>
      <p>This is a global sidebar managed by Context.</p>
      <ul>
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>
    </div>
  );
};
