// Styling Components
import { Breadcrumbs } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

// Library
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useRouter } from "next/router.js";

// Components
import ListRenderer from "./ListRenderer.jsx";
import Drawer from "./Drawer.jsx";

// Assets
import iitbhu from "../../assets/logo/iitbhu.png";
import SearchIcon from "../../assets/icons/SearchIcon.jsx";

// Styles
import styles from "./SideNav.module.css";
import Image from "next/image.js";

function Nav({ children, sideNavOptions }) {
  const router = useRouter();
  const NavContent = () => (
    <Fragment>
      <div
        className={`w-[65vw] md:w-[250px] h-[95vh] m-5 p-10 font-bold bg-white ${styles.SideNavContainer} flex flex-col justify-between`}
      >
        <div>
          <div className="mb-2">
            <Avatar src={iitbhu.src} size="lg" className="mb-2" alt="IIT BHU" />
            <Typography variant="h5" className="mb-2">
              Training and Placement Cell
            </Typography>
          </div>
          <div className="block md:hidden mb-5">
            <Input
              label=""
              placeholder="Power Search"
              style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              icon={<SearchIcon />}
            />
          </div>
          <div>
            <ListRenderer list={sideNavOptions} />
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <Avatar
            src="https://picsum.photos/200/300"
            alt="avatar"
            variant="circular"
            size="lg"
          />
          <div>
            <Typography className="font-semibold">User</Typography>
            <Typography className="">Branch</Typography>
          </div>
        </div>
      </div>
    </Fragment>
  );

  const Slate = () => (
    <div className="pl-10">
      <div
        className={`mt-10 flex flex-row justify-between items-center pr-10 pb-3`}
      >
        <Breadcrumbs className=" ml-5 md:ml-0">
          <a href="#" className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <a href="#" className="opacity-60">
            <span>Components</span>
          </a>
          <a href="#">Breadcrumbs</a>
        </Breadcrumbs>
        <div className="hidden md:block">
          <Input
            className="h-8"
            label=""
            placeholder="Power Search"
            style={{
              backgroundColor: "white",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
            icon={<SearchIcon />}
          />
        </div>
      </div>
      <div className={`${styles.WrappedContainer}`}>{children}</div>
    </div>
  );

  return (
    <div className="flex bg-white text-black">
      <div className="hidden md:block">
        <NavContent />
      </div>
      <div className="hidden md:block">
        <Slate />
      </div>
      <div className="fixed md:hidden z-50">
        <Drawer slate={<Slate />} sideNavOptions={sideNavOptions}>
          <NavContent />
        </Drawer>
      </div>
    </div>
  );
}

export default Nav;
