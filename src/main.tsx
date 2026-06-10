import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

const loader = document.getElementById("premium-loader");
if (loader) {
  setTimeout(() => {
    loader.classList.add("hidden");
    setTimeout(() => { loader.style.display = "none"; }, 600);
  }, 0);
}
