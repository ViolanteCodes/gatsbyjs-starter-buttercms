import React from "react";
import PropTypes from "prop-types";
import Header from "./header-section";
import FooterSection from "./footer-section";
import { StaticQuery, graphql } from "gatsby";
import ScrollToButtonButton from "./scroll-to-top-button";

const Layout = (props) => {
  console.log(props);
  const { data } = props;
  const { children } = props;
  const sample_page = data?.allButterPage?.nodes[0];
  const urlParams = new URLSearchParams(props.location.search);
  const urlQuery = urlParams.get("query");
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          seo: allButterPage {
            edges {
              node {
                id
                seo {
                  description
                  title
                }
              }
            }
          }
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => (
        <>
          <Header
            siteTitle={
              sample_page?.seo?.title ||
              props?.pageContext?.slug ||
              urlQuery ||
              "ButterCMS"
            }
            mainMenu={props?.pageContext?.mainMenu || []}
          />

          {children}

          <FooterSection mainMenu={props?.pageContext?.mainMenu || []} />
          <ScrollToButtonButton />
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
