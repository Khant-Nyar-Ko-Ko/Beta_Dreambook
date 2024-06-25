import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { FavouriteBooksProvider } from "./contexts/FavouriteBooksContext.tsx";
import { CategoryProvider } from "./contexts/CategoryContext.tsx";
import { LibraryProvider } from "./contexts/LibraryContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CategoryProvider>
          <FavouriteBooksProvider>
            <LibraryProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </LibraryProvider>
          </FavouriteBooksProvider>
        </CategoryProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </AuthProvider>
);
