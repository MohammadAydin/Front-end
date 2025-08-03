import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LoadScript } from "@react-google-maps/api";
// main.jsx أو App.jsx
import { useAuthStore } from "./store/useAuthStore";

if (import.meta.env.DEV) {
  window.useAuthStore = useAuthStore; // هذا ما يتيح استخدامه في Console
}
import "./index.css";
import "./responsive.css";
import App from "./App.jsx";

// create a new instance of QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadScript googleMapsApiKey="AIzaSyDH-rfDKqld3jf64z84P9e34iNBkdSwZlw">
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </LoadScript>
  </StrictMode>
);
