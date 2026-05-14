import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="top-center" containerStyle={{ top: 90 }} />
    </AuthProvider>
  </StrictMode>
);
