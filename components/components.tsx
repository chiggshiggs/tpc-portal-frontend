"use client";

// Converting Mantine to Client Components
import {
  Switch,
  Select,
  Paper,
  TextInput,
  Title as Typography,
  Input,
  Textarea,
  NumberInputHandlers,
  ActionIcon,
  Center,
  useMantineColorScheme,
  NumberInput,
  Group,
  UnstyledButton,
  UnstyledButtonProps,
  Avatar,
  Text,
  createStyles,
  Navbar,
  Code,
  ScrollArea,
  Box,
  Collapse,
  SimpleGrid,
  ThemeIcon,
  Burger,
  Checkbox,
  Radio,
  SelectProps,
  Drawer,
  useMantineTheme,
} from "@mantine/core";

import {
  Dropzone,
  DropzoneProps,
  MIME_TYPES,
  FileWithPath,
} from "@mantine/dropzone";

// Switching to Material Tailwind if Mantine is not good
import { Button } from "@material-tailwind/react";
import { MantineLogo } from "@mantine/ds";
import { NavbarNested } from "./navbar/Navbar";
export {
  Switch,
  TextInput,
  Typography,
  MIME_TYPES,
  Dropzone,
  Checkbox,
  Button,
  SimpleGrid,
  Select,
  Input,
  useMantineTheme,
  Textarea,
  NumberInput,
  Paper,
  ActionIcon,
  Center,
  useMantineColorScheme,
  Group,
  MantineLogo,
  NavbarNested,
  UnstyledButton,
  Avatar,
  Text,
  Navbar,
  Code,
  ScrollArea,
  Box,
  Collapse,
  ThemeIcon,
  createStyles,
  Burger,
  Drawer,
  Radio,
};

export type {
  UnstyledButtonProps,
  NumberInputHandlers,
  SelectProps,
  DropzoneProps,
  FileWithPath,
};
