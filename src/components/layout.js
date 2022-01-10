import React from "react";
import PropTypes from "prop-types";
import Header from "./header-section";
import FooterSection from "./footer-section";
import ScrollToButtonButton from "./scroll-to-top-button";

const Layout = (props) => {
  const { children } = props;
  const siteMetadata = props.pageContext.siteMetaData.seo.edges[0].node;
  const urlParams = new URLSearchParams(props.location.search);
  const urlQuery = urlParams.get("q");

  return (
    <>
      <Header
        siteTitle={
          props?.pageContext?.slug ||
          urlQuery ||
          siteMetadata?.seo?.title ||
          "ButterCMS"
        }
        mainMenu={props?.pageContext?.mainMenu || []}
        siteMetaData={props.pageContext.siteMetaData}
      />

      {children}

      <FooterSection mainMenu={props?.pageContext?.mainMenu || []} />
      <ScrollToButtonButton />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
