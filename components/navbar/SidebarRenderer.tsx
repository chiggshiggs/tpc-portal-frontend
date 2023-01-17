import React, { useState } from "react";

// Types
import {
  SidebarElement,
  SidebarElementType,
  SidebarNested,
} from "../../types/Sidebar.types";

// Components
import {
  Text,
  createStyles,
  UnstyledButton,
  Group,
  ThemeIcon,
  Collapse,
  Box,
} from "../components";

// Icons
import {
  TablerIcon,
  IconChevronLeft,
  IconChevronRight,
  IconDeviceLaptop,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

function SidebarRenderer({
  element,
}: {
  element: SidebarElement | SidebarNested;
}) {
  const { classes, theme } = useStyles();
  const [open, setOpen] = useState(false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;

  if (element.type === SidebarElementType.ELEMENT) {
    return (
      <Text<"a">
        component="a"
        className={classes.link}
        href={element.linkTo}
        key={element.key}
        onClick={(event) => event.preventDefault()}
      >
        {element.label}
      </Text>
    );
  } else {
    return (
      <>
        <UnstyledButton
          onClick={() => setOpen((open) => !open)}
          className={classes.control}
        >
          <Group position="apart" spacing={0}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                {/* <Icon size={18} /> */}
              </ThemeIcon>
              <Box ml="md">{element.label}</Box>
            </Box>
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: open
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          </Group>
        </UnstyledButton>
        <Collapse in={open}>
          {element.nested.map((eachElement, index) => (
            <SidebarRenderer
              key={`${element.key}_${index}`}
              element={eachElement}
            />
          ))}
        </Collapse>
      </>
    );
  }
}

export default SidebarRenderer;
