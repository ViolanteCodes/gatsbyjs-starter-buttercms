import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import camelcaseKeys from "camelcase-keys";
import Layout from "../../components/layout";
import Preloader from "../../components/preloader";
import PostsList from "../../components/blog/posts-list";
import SearchWidget from "../../components/blog/search-widget";
import CategoriesWidget from "../../components/blog/categories-widget";

const BlogPost = (props) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
  }, []);
  useEffect(() => {
    let postsRestructure = [];
    /* eslint-disable no-unused-expressions */
    props?.data?.allButterPost?.edges.forEach((element) => {
      postsRestructure.push(element.node);
    });
    setBlogPosts(postsRestructure);
    setLoader(false);
  }, [props?.data?.allButterPost]);
  return (
    <>
      {loader ? <Preloader /> : null}
      <Layout {...props}>
        <section id="blog-roll" className="blog-roll-nav">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="section-title text-center">
                  <h2>All Blog Posts</h2>
                  <ul className="breadcrumb-nav">
                    <li>
                      <a href="/">
                        <a>Home</a>
                      </a>
                    </li>
                    <li>All blog posts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-posts">
          <div className="container">
            <div className="row justify-content-center">
              <PostsList posts={camelcaseKeys(blogPosts)} />
              <aside className="col-12 col-lg-4">
                <SearchWidget />
                <CategoriesWidget categories={props.pageContext.categories} />
              </aside>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default BlogPost;

//GraphQl query to fetch example page data
export const pageQuery = graphql`
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

    allButterPost {
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
