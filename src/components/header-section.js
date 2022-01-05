import React, { useEffect, useState, useRef } from "react";
import SEO from "./seo";
import MainMenu from "./main-menu/main-menu";

export default function HeaderSection({ mainMenu, siteTitle }) {
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const navbarAreaEl = useRef(null);

  function fixNavBar() {
    if (navbarAreaEl.current) {
      setIsNavbarSticky(window.pageYOffset > navbarAreaEl.current.offsetTop);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", fixNavBar);
    return () => {
      window.removeEventListener("scroll", fixNavBar);
    };
  }, [mainMenu]);

  return (
    <header className="header">
      <SEO title={siteTitle} />
      <div
        ref={navbarAreaEl}
        className={`navbar-area ${isNavbarSticky ? "sticky" : ""}`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="https://buttercms.com">
                  <img
                    src="https://cdn.buttercms.com/PBral0NQGmmFzV0uG7Q6"
                    alt="Logo"
                    width={180}
                    height={45}
                  />
                </a>
                <MainMenu mainMenuLinks={mainMenu} />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
