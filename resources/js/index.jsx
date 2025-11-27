import React from "react";
import { createRoot } from "react-dom/client";
import { InertiaApp } from "@inertiajs/inertia-react";
import "./styles/tailwind.css";

function App({ el }) {
    return (
        <InertiaApp
            initialPage={JSON.parse(el.dataset.page)}
            resolveComponent={(name) => require(`./pages/${name}`).default}
        />
    );
}

const el = document.getElementById("app");
createRoot(el).render(<App el={el} />);
