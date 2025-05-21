import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SWRConfig } from "swr";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <SWRConfig
    value={{
      revalidateOnFocus: true,
    }}
  >
    <App />
    <ToastContainer
      theme="light"
      position="top-right"
      autoClose={3500}
      newestOnTop={true}
      draggable
      stacked
      hideProgressBar={false}
      transition={Bounce}
    />
  </SWRConfig>
);
