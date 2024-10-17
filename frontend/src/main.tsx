import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { Toaster } from "sonner";
import router from "./router/router.tsx";
import { AnimatePresence } from "framer-motion";
import { DayAndWeekProvider } from "./context/dayAndWeek.tsx";
import { TodoContextProvider } from "./context/todoContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster richColors theme="dark" position="bottom-right" />
      <Provider store={store}>
        <AnimatePresence>
          <DayAndWeekProvider>
            <TodoContextProvider>
              <RouterProvider router={router} />
            </TodoContextProvider>
          </DayAndWeekProvider>
        </AnimatePresence>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
