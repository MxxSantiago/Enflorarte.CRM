import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.js";
import reportWebVitals from "./reportWebVitals.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);

// Si deseas que tu aplicación funcione sin conexión y se cargue más rápido, puedes cambiar
// unregister() por register() a continuación. Ten en cuenta que esto conlleva algunos inconvenientes.
// Obtén más información sobre los service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// Si deseas comenzar a medir el rendimiento en tu aplicación, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o envíalos a un punto de análisis. Obtén más información: https://bit.ly/CRA-vitals
reportWebVitals();
