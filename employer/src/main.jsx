import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LoadScript } from "@react-google-maps/api";

import "./index.css";
import "./responsive.css";
import App from "./App.jsx";
import "./i18n";

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
