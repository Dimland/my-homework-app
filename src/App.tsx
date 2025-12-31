import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useEffect, Suspense } from "react";

import { UserGreeter } from "./components/UserGreeter";
import { About } from "./components/About";
import { ProductsList } from "./components/ProductsList";
import { ProductDetail } from "./components/ProductDetail";
import { Sidebar } from "./components/Sidebar";
import { useSidebar } from "./context/SidebarContext";
import { ToastHost } from "./components/ToastHost";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

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
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    document.documentElement.dir = i18n.dir(i18n.language);
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "10px",
          background: "var(--surface-card, #eee)",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ marginInlineEnd: "15px" }}>
          {t("header.title")}
        </Link>
        <Link to="/about" style={{ marginInlineEnd: "15px" }}>
          {t("header.menu_about")}
        </Link>
        <Link to="/products" style={{ marginInlineEnd: "15px" }}>
          {t("header.menu_products")}
        </Link>

        <SidebarToggle />

        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        {isFetching > 0 && (
          <span style={{ marginLeft: "20px", color: "orange" }}>
            Fetching...
          </span>
        )}
      </nav>

      <Sidebar />
      <ToastHost />

      <Suspense fallback={<div style={{ padding: "20px" }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<UserGreeter />} />
          <Route path="/about" element={<About />} />

          <Route path="/products" element={<ProductsList />} />

          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
