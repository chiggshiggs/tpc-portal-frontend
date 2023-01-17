"use client";

import { Sidebar, SidebarElementType } from "../types/Sidebar.types";

const DemoNavSchema: Sidebar = {
  elements: [
    {
      type: SidebarElementType.ELEMENT,
      label: "Home",
      key: "home",
      linkTo: "/home",
    },
    {
      type: SidebarElementType.NESTED,
      label: "Forum",
      key: "forum",
      linkTo: "/forum",
      nested: [
        {
          type: SidebarElementType.ELEMENT,
          label: "Internship",
          key: "internship",
          linkTo: "/internship",
        },
        {
          type: SidebarElementType.NESTED,
          label: "FT",
          key: "ft",
          linkTo: "/ft",
          nested: [
            {
              type: SidebarElementType.ELEMENT,
              label: "Offers",
              key: "offers",
              linkTo: "/offers",
            },
          ],
        },
      ],
    },
  ],
};
export default DemoNavSchema;
