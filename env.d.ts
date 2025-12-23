/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

declare module "virtual:generated-layouts" {
    import type { RouteRecordRaw } from "vue-router";

    export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[];
}

declare module "vue-router/auto-routes" {
    import type { RouteRecordRaw } from "vue-router";

    export const routes: RouteRecordRaw[];
    // Jangan export handleHotUpdate jika TS protes,
    // karena biasanya itu hanya untuk internal plugin
}
