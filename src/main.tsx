import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const loader = document.getElementById("premium-loader");
if (loader) {
  loader.classList.add("hidden");
  setTimeout(() => { loader.style.display = "none"; }, 600);
}

createRoot(document.getElementById("root")!).render(<App />);
