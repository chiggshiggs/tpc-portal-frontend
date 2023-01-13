import React from "react";
import RootStyleRegistry from "./emotion";
import { NavbarNested } from "../components/navbar/Navbar";
import { MobileDrawer } from "../components/navbar/Drawer";
// Redux
import ReduxProvider from "./redux";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head />
      <body>
        <ReduxProvider>
          <RootStyleRegistry>
            <div className="sm:hidden">
              <MobileDrawer>{children}</MobileDrawer>
            </div>
            <div className=" hidden sm:block">
              <NavbarNested>{children}</NavbarNested>
            </div>
          </RootStyleRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
