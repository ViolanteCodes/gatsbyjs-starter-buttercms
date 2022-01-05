import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import LandingPageSection from "../../components/landing-page-sections/landing-page-section";
import Blog from "../../components/blog/blog";
import camelcaseKeys from "camelcase-keys";
const LandingPageWithComponent = (props) => {
  const { data } = props;
  const sample_page = data?.allButterPage?.nodes[0];
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    let postsRestructure = [];
    /* eslint-disable no-unused-expressions */
    props?.data?.allButterPost?.edges.forEach((element) => {
      postsRestructure.push(element.node);
    });
    setBlogPosts(postsRestructure);
    return data;
  }, [props?.data?.allButterPost]);
  return (
    <Layout {...props}>
      <SEO
        title={sample_page?.seo?.title || "test"}
        keywords={[`gatsby`, `application`, `react`]}
      />
      {sample_page.body.map(({ type, fields: sectionData }, index) => (
        <LandingPageSection key={index} type={type} sectionData={sectionData} />
      ))}

      <Blog posts={camelcaseKeys(blogPosts)} />
    </Layout>
  );
};

export default LandingPageWithComponent;

//GraphQl query to fetch example page data
export const query = graphql`
  {
    allButterPage(filter: { slug: { eq: "landing-page-with-components" } }) {
      nodes {
        body {
          fields {
            image
            button_url
            headline
            features {
              description
              headline
              icon
            }
            image_position
            subheadline
            scroll_anchor_id
            testimonial {
              name
              quote
              title
            }
            button_label
          }
          type
        }
        seo {
          description
          title
        }
        slug
        page_type
        id
      }
      totalCount
    }

    allButterPost(limit: 2) {
      edges {
        node {
          id
          author {
            bio
            email
            facebook_url
            first_name
            instagram_url
            last_name
            linkedin_url
            pinterest_url
            profile_image
            slug
            title
            twitter_handle
          }
          body
          categories {
            name
            slug
          }
          created(difference: "", formatString: "", fromNow: false, locale: "")
          featured_image
          date
          featured_image_alt
          internal {
            content
            contentDigest
            fieldOwners
            description
            ignoreType
            mediaType
            owner
            type
          }
          meta_description
          published(
            fromNow: false
            formatString: ""
            locale: ""
            difference: ""
          )
          seo_title
          slug
          status
          summary
          tags {
            name
            slug
          }
          title
          url
          updated(difference: "", formatString: "", fromNow: false, locale: "")
        }
      }
      totalCount
    }
  }
`;
