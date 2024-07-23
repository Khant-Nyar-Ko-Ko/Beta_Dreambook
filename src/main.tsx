import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { FavouriteBooksProvider } from "./contexts/FavouriteBooksContext.tsx";
import { CategoryProvider } from "./contexts/CategoryContext.tsx";
import { ChapterProvider } from "./contexts/ChapterContext.tsx";
import { CommentProvider } from "./contexts/CommentContext.tsx";
import ThemeProvider from "./contexts/ThemeProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CategoryProvider>
          <FavouriteBooksProvider>
            <ChapterProvider>
              <CommentProvider>
                <ThemeProvider>
                  <React.StrictMode>
                    <App />
                  </React.StrictMode>
                </ThemeProvider>
              </CommentProvider>
            </ChapterProvider>
          </FavouriteBooksProvider>
        </CategoryProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </AuthProvider>
);
