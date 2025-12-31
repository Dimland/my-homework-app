import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SidebarProvider } from "./context/SidebarContext";

// i18n
import "./i18n";

// PrimeReact
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <PrimeReactProvider>
          <Suspense fallback="Loading...">
            <App />
          </Suspense>
        </PrimeReactProvider>
      </SidebarProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
