import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";
import Layouts from "vite-plugin-layouts";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        VueRouter({
            /* options */
        }),
        vue(),
        Layouts(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
