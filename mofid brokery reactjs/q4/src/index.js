import ReactDOM from "react-dom";
import App from "./App";
import { CountProvider } from "./contexts/count";

ReactDOM.render(
  <CountProvider>
    <App />
  </CountProvider>,
  document.getElementById("root")
);
