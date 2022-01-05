import React, { useEffect, useState } from "react";
import camelcaseKeys from "camelcase-keys";
import Layout from "../../components/layout";
import HumanDate from "../../components/human-date";
import CategoriesWidget from "../../components/blog/categories-widget";
import SearchWidget from "../../components/blog/search-widget";
import AuthorCard from "../../components/author-card";
import Preloader from "../../components/preloader";
import { Helmet } from "react-helmet";
export default function BlogPost(props) {
  const { post, categories } = props.pageContext;
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
  }, []);
  useEffect(() => {
    setLoader(false);
  }, [post]);
  return (
    <>
      {loader ? <Preloader /> : null}
      <Layout {...props}>
        <Helmet>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{post.seo_title}</title>
          <meta name="description" content={post.metaDescription} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="https://buttercms.com/static/v2/images/favicon.png"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={post.url} />
          <meta property="og:title" content={post.seo_title} />
          <meta property="og:image" content={post.featuredImage} />
          <meta property="og:description" content={post.metaDescription} />
          <meta name="twitter:site" content="@ButterCMS" />
          <meta name="twitter:creator" content="@ButterCMS" />
          <meta name="twitter:title" content="ButterCMS Blog" />
          <meta name="twitter:description" content={post.metaDescription} />
        </Helmet>
        <section id="blog-header" className="single-post-nav">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="section-title text-center">
                  <h2>{post.title}</h2>
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
                    <li>{post.title}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-post">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-12 col-12">
                <div className="single-post">
                  <div className="single-post-meta">
                    <h2 className="single-post-header">{post.title}</h2>
                    <ul className="single-post-meta-info">
                      <li>
                        <AuthorCard author={post.author} />
                      </li>
                      <li>
                        <a>
                          <i className="lni lni-calendar"></i>{" "}
                          <HumanDate dateString={post.published} />
                        </a>
                      </li>
                      <li>
                        {post.tags.map((tag) => (
                          <a key={tag.slug} href={`/blog/tag/${tag.slug}`}>
                            <a>
                              <i className="lni lni-tag"></i> {tag.name}
                            </a>
                          </a>
                        ))}
                      </li>
                    </ul>
                  </div>
                  {post.featuredImage && (
                    <div className="single-post-thumbnail">
                      <img
                        src={post.featuredImage}
                        alt={post.featuredImageAlt}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div
                    className="single-post-body prose"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                  ></div>
                </div>
              </div>

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
