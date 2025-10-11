import React from "react";
import { defineDashboardExtension } from "@vendure/dashboard";

export default defineDashboardExtension({
  routes: [
    {
      path: "/my-custom-page",
      component: () => <div>My Custom Page</div>,
      navMenuItem: {
        // The section where this item should appear
        sectionId: "catalog",
        // Unique identifier for this menu item
        id: "my-custom-page",
        // Display text in the navigation
        title: "My Custom Page",
        // Optional: URL if different from path
        url: "/my-custom-page",
      },
    },
  ],
  navSections: [],
  pageBlocks: [],
  actionBarItems: [],
  alerts: [],
  widgets: [],
  customFormComponents: {},
  dataTables: [],
  detailForms: [],
  login: {},
});
