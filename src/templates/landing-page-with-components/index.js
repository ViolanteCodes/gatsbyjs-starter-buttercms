import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";

import LandingPageSection from "../../components/landing-page-sections/landing-page-section";
import Blog from "../../components/blog/blog";
import camelcaseKeys from "camelcase-keys";
const LandingPageWithComponent = (props) => {
  const sample_page =
    props?.pageContext?.indexPageData?.allButterPage?.nodes[0];
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    let postsRestructure = [];
    /* eslint-disable no-unused-expressions */
    props?.pageContext?.indexPageData?.allButterPost?.edges.forEach(
      (element) => {
        postsRestructure.push(element.node);
      }
    );
    setBlogPosts(postsRestructure);
  }, [props, props.pageContext.indexPageData.allButterPost]);
  return (
    <Layout {...props}>
      {sample_page.body.map(({ type, fields: sectionData }, index) => (
        <LandingPageSection key={index} type={type} sectionData={sectionData} />
      ))}

      <Blog posts={camelcaseKeys(blogPosts)} />
    </Layout>
  );
};

export default LandingPageWithComponent;
