"use client";
import { Burger, Drawer, Group } from "../components";
import React, { useState } from "react";
import { Navbar } from "../components";
import { Code, ScrollArea, createStyles } from "../components";
import { TablerIcon } from "@tabler/icons";
import Logo from "./Logo";

import { UserButton } from "./UserButton";
import ThemeToggle from "../theme/ThemeToggle";
import SidebarRenderer from "./SidebarRenderer";
import { Sidebar } from "../../types/Sidebar.types";

export interface mockdata {
  label: String;
  icon: TablerIcon;
  initiallyopened: boolean;
  links: Array<{} | {} | {}>;
}
const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBotton: 0,
  },
  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },
  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

function MobileNavbarNested({ schema }: { schema: Sidebar }) {
  const { classes } = useStyles();

  return (
    <div className="flex flex-col justify-between h-[95%]">
      <Navbar.Section className={classes.header}>
        {/* Header with logo */}
        <Group position="apart" className="p-0">
          <Logo />
          <Code sx={{ fontWeight: 500, background: "white", fontSize: 15 }}>
            Portal@IIT-BHU
          </Code>
          <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
        </Group>
      </Navbar.Section>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        {/* Links sections */}
        <div className={classes.linksInner}>
          {schema.elements.map((sidebarElement, index) => (
            <div key={`Sidebar_${index}`}>
              <SidebarRenderer element={sidebarElement} />
            </div>
          ))}
        </div>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        {/* Footer with user */}
        <UserButton
          image="https://img.collegepravesh.com/2015/09/IIT-BHU-Logo.png"
          name="TPC IIT-BHU"
          email="tpo@iitbhu.ac.in"
        />
      </Navbar.Section>
    </div>
  );
}

export function MobileDrawer({
  schema,
  children,
}: {
  schema: Sidebar;
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);
  const title = opened ? "close navigation" : "open navigation";
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="lg"
      >
        {/* Drawer Content */}
        <MobileNavbarNested schema={schema} />
      </Drawer>
      <div className="p-5">
        <Group position="left" className="flex justify-between">
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            title={title}
          />
          <ThemeToggle />
        </Group>
        {children}
      </div>
    </div>
  );
}
