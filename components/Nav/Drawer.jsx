import React from "react";

// Constants
import { COLOR } from "../../constants/colors";

// Assets
import MenuIcon from "../../assets/icons/MenuIcon";

function Drawer({ children, slate }) {
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-white">
          <label
            htmlFor="my-drawer"
            className="absolute z-10 ml-5"
            style={{ marginTop: "40px" }}
          >
            <MenuIcon
              style={{
                padding: "3px",
                borderRadius: "5px",
                color: "white",
                backgroundColor: "purple",
              }}
              className={`${COLOR.BG_GRADIENT}`}
            />
          </label>
          {slate}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu overflow-y-auto w-80">{children}</ul>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
