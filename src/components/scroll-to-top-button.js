import React from "react";
import { useEffect, useState } from "react";
/* eslint-disable */
export default function ScrollToButtonButton() {
  const [hasScrollToTopButton, setHasScrollToTopButton] = useState(false);

  function toggleScrollTopButton() {
    setHasScrollToTopButton(
      document.body.scrollTop > 50 || document.documentElement.scrollTop > 50
    );
  }

  useEffect(() => {
    document.addEventListener("scroll", toggleScrollTopButton);

    return () => {
      document.removeEventListener("scroll", toggleScrollTopButton);
    };
  }, []);

  return (
    <>
      {hasScrollToTopButton && (
        <a href="" className="scroll-top btn-hover">
          <i className="lni lni-chevron-up"></i>
        </a>
      )}
    </>
  );
}
