import React from "react";
export default function MainMenuLink({ url, label, active, callbackOnClick }) {
  /* eslint-disable */
  return (
    <li className="nav-item" onClick={callbackOnClick}>
      <a className={`page-scroll ${active ? "active" : ""}`} href={`/${url}`}>
        {label}
      </a>
    </li>
  );
}
