export enum SidebarElementType {
  "ELEMENT" = "ELEMENT",
  "NESTED" = "NESTED",
}

export interface SidebarElement {
  label: string;
  linkTo: string;
  key: string;
  type: SidebarElementType.ELEMENT;
  icon?: string;
}
export interface SidebarNested {
  label: string;
  key: string;
  nested: Array<SidebarElement | SidebarNested>;
  type: SidebarElementType.NESTED;
  linkTo?: string;
  icon?: string;
}

export interface Sidebar {
  elements: Array<SidebarElement | SidebarNested>;
}
