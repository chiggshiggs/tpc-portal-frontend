import React from "react";

function AddIcon({ light, style, className }) {
  return (
    <div style={style} className={`${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default AddIcon;
