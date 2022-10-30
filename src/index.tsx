import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import './index.css';
import "./styles/index.scss";

// react-query Client, Provider
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const container = document.getElementById("root")!;
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
   // <React.StrictMode>
   <Provider store={store}>
      <QueryClientProvider client={queryClient}>
         <App />
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   </Provider>
   // </React.StrictMode>
);

reportWebVitals();
