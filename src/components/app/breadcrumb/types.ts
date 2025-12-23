import type { FunctionalComponent } from "vue";

export interface IBreadcrumbItem {
    title: string;
    url: string;
    icon?: FunctionalComponent;
}
