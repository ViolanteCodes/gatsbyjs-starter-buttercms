/* eslint-disable */
import React, { useEffect, useState } from "react";
import camelcaseKeys from "camelcase-keys";
import Layout from "../../components/layout";
import Preloader from "../../components/preloader";
import PostsList from "../../components/blog/posts-list";
import SearchWidget from "../../components/blog/search-widget";
import CategoriesWidget from "../../components/blog/categories-widget";
import Seo from "../../components/seo";
export default function Category(props) {
  console.log("props", props);
  const { post, categories, slug } = props.pageContext;
  const [postByCategory, setPostByCategory] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
  }, []);
  useEffect(() => {
    let postByCategory = [];
    post?.forEach((element) => {
      if (element.categories.find((e) => e.slug === slug)) {
        postByCategory.push(element);
      }
    });
    setPostByCategory(postByCategory);
    setLoader(false);
  }, [slug]);
  return (
    <>
      {loader ? <Preloader /> : null}
      <Layout {...props}>
        <section id="blog-roll" className="blog-roll-nav">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="section-title text-center">
                  <h2>Blog Posts by Category</h2>
                  <ul className="breadcrumb-nav">
                    <li>
                      <a href="/">
                        <a>Home</a>
                      </a>
                    </li>
                    <li>
                      <a href="/blog">
                        <a>Blog</a>
                      </a>
                    </li>
                    <li>Category: {slug}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-posts">
          <div className="container">
            <div className="row justify-content-center">
              <PostsList posts={camelcaseKeys(postByCategory) || []} />
              <aside className="col-12 col-lg-4">
                <SearchWidget />
                <CategoriesWidget
                  categories={camelcaseKeys(categories) || []}
                />
              </aside>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
