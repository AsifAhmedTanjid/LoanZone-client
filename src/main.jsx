import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ style: { zIndex: 99999 } }}
      />
    </RouterProvider>
     </AuthProvider>
  </StrictMode>
);
