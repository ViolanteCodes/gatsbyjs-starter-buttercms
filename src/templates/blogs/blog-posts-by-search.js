import React, { useEffect, useState } from "react";
import camelcaseKeys from "camelcase-keys";
import Layout from "../../components/layout";
import Preloader from "../../components/preloader";
import PostsList from "../../components/blog/posts-list";
import SearchWidget from "../../components/blog/search-widget";
import { searchPosts } from "../../services/butter-cms-helper";
import CategoriesWidget from "../../components/blog/categories-widget";

export default function Search(props) {
  const { categories } = props.pageContext;
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(true);
  const [postBySearch, setPostBySearch] = useState([]);
  useEffect(() => {
    setLoader(true);
  }, []);
  useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search);
    const urlQuery = urlParams.get("q");
    async function fetchPosts(params) {
      let searchedPost = await searchPosts(urlQuery);
      setQuery(urlQuery);
      setPostBySearch(searchedPost);
      setLoader(false);
    }
    fetchPosts();
  }, [props.location.search]);
  return (
    <>
      {loader ? <Preloader /> : null}
      <Layout {...props}>
        <section id="blog-roll" className="blog-roll-nav">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="section-title text-center">
                  <h2>Search Results</h2>
                  <ul className="breadcrumb-nav">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/blog">Blog</a>
                    </li>
                    <li>Search: &#34;{query}&#34;</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-posts">
          <div className="container">
            <div className="row justify-content-center">
              <PostsList posts={camelcaseKeys(postBySearch) || []} />
              <aside className="col-12 col-lg-4">
                <SearchWidget />
                <CategoriesWidget categories={categories || []} />
              </aside>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
