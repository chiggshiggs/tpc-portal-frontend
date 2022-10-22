export const NAV = [
  {
    label: "Home",
    to: "/home",
    subOptions: [],
  },
  {
    // Forum -> Venue Portal + Scheduling Portal + Shortlist Portal
    label: "Forum",
    to: "/forum",
    subOptions: [
      {
        label: "Schedules",
        to: "/forum/schedule",
        subOptions: [],
      },
      {
        label: "Venues",
        to: "/forum/venue",
        subOptions: [],
      },
      {
        label: "Shortlist",
        to: "/forum/venue",
        subOptions: [],
      },
    ],
  },
  {
    label: "Students",
    to: "students",
    subOptions: [
      {
        label: "All Students",
        to: "/students/all",
        subOptions: [],
      },
    ],
  },
];
