import { defineStore } from "pinia";

export const useBreadcrumbsStore = defineStore("breadcrumbs", {
  state: () => ({
    breadcrumbs: [],
    previousBreadcrumbs: [],
  }),
  actions: {
    setBreadcrumbs(breadcrumbs) {
      this.breadcrumbs = breadcrumbs;
    },
    setPreviousBreadcrumbs(previousBreadcrumbs) {
      this.previousBreadcrumbs = previousBreadcrumbs;
    },
  },
});
