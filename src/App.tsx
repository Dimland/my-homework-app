import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";

import { UserGreeter } from "./components/UserGreeter";
import { About } from "./components/About";
import { ProductsList } from "./components/ProductsList";
import { ProductDetail } from "./components/ProductDetail";
import { Sidebar } from "./components/Sidebar";
import { useSidebar } from "./context/SidebarContext";
import { ToastHost } from "./components/ToastHost";

const SidebarToggle = () => {
  const { toggle } = useSidebar();
  return (
    <button onClick={toggle} style={{ marginLeft: "15px" }}>
      Toggle Sidebar
    </button>
  );
};

function App() {
  const isFetching = useIsFetching();

  return (
    <BrowserRouter>
      <nav
        style={{ padding: "10px", background: "#eee", marginBottom: "20px" }}
      >
        <Link to="/" style={{ marginRight: "15px" }}>
          Home
        </Link>
        <Link to="/about" style={{ marginRight: "15px" }}>
          About
        </Link>
        <Link to="/products">Products (Homework)</Link>
        <SidebarToggle />
        {isFetching > 0 && (
          <span style={{ marginLeft: "20px", color: "orange" }}>
            Fetching...
          </span>
        )}
      </nav>

      <Sidebar />
      <ToastHost />

      <Routes>
        <Route path="/" element={<UserGreeter />} />
        <Route path="/about" element={<About />} />

        <Route path="/products" element={<ProductsList />} />

        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
