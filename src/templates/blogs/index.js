import React, { useEffect, useState } from "react";
import camelcaseKeys from "camelcase-keys";
import Layout from "../../components/layout";
import Preloader from "../../components/preloader";
import PostsList from "../../components/blog/posts-list";
import SearchWidget from "../../components/blog/search-widget";
import CategoriesWidget from "../../components/blog/categories-widget";

const BlogPost = (props) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
  }, []);
  useEffect(() => {
    let postsRestructure = [];
    /* eslint-disable no-unused-expressions */
    props?.pageContext?.allBlogPageData?.allButterPost?.edges.forEach(
      (element) => {
        postsRestructure.push(element.node);
      }
    );
    setBlogPosts(postsRestructure);
    setLoader(false);
  }, [props, props.pageContext.allBlogPageData.allButterPost]);
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
                      <a href="/">Home</a>
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
