var Butter = require("buttercms");
let butter;

const previewSetting = process.env.GATSBY_BUTTER_PREVIEW_MODE;
// make preview mode by default
const preview =
  previewSetting === "true" || previewSetting === undefined ? 1 : 0;
let isButterCMS = false;
try {
  // Check either token is valid and set
  butter = Butter(process.env.GATSBY_BUTTER_CMS_TOKEN, preview);
  isButterCMS = true;
} catch (e) {
  isButterCMS = false;
  console.log("error node", e);
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // If token is not valid or empty then it will set no token screen as default
  if (!isButterCMS) {
    const missingTokenApi = require.resolve(`./src/templates/missing-token.js`);
    createPage({
      path: `/`, // Dynamicaly created route for missing token http://localhost:8000/
      component: missingTokenApi,
      context: {},
    });
  }
  if (isButterCMS) {
    // If token is validated then it will create all require static page base on queries
    const indexPage = require.resolve(`./src/templates/index.js`);
    const blogPage = require.resolve(`./src/templates/blogs/index.js`);
    const blogViewPage = require.resolve(`./src/templates/blogs/blog-view.js`);
    const blogBySearchPage = require.resolve(
      `./src/templates/blogs/blog-posts-by-search.js`
    );
    const blogByCategoryPage = require.resolve(
      `./src/templates/blogs/blog-posts-by-category.js`
    );
    const blogByTagPage = require.resolve(
      `./src/templates/blogs/blog-posts-by-tag.js`
    );

    const landingPageWithComponent = require.resolve(
      `./src/templates/landing-page-with-components/index.js`
    );

    // Navigation menu fetch from butter cms start
    var params = {
      page: "1",
      page_size: "10",
    };

    let butterNevigationMenu = await butter.content.retrieve(
      ["navigation_menu"],
      params
    );
    let categories = await butter.category.list();
    categories = categories?.data?.data;
    let mainMenu = butterNevigationMenu.data.data.navigation_menu.find(
      (menu) => menu.name == "Main menu"
    );
    let mainMenuList = [];
    mainMenu.menu_items.forEach((page) => {
      mainMenuList.push({
        label: page.label,
        url: page.url,
      });
    });
    // Navigation menu fetch from butter cms end

    // Site meta data fetch start
    const siteMetaData = await graphql(`
      query SiteTitleQuery {
        seo: allButterPage(
          filter: { slug: { eq: "landing-page-with-components" } }
        ) {
          edges {
            node {
              id
              seo {
                description
                title
              }
              slug
            }
          }
        }

        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `);
    // Site meta data fetch end

    /* Index page start*/
    const indexPageData = await graphql(`
      {
        allButterPage(
          filter: { slug: { eq: "landing-page-with-components" } }
        ) {
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
              created(
                difference: ""
                formatString: ""
                fromNow: false
                locale: ""
              )
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

              slug
              status
              summary
              tags {
                name
                slug
              }
              title
              url
              updated(
                difference: ""
                formatString: ""
                fromNow: false
                locale: ""
              )
            }
          }
          totalCount
        }
      }
    `);
    createPage({
      path: `/`, // Dynamicaly created route for index http://localhost:8000/
      component: indexPage,
      context: {
        mainMenu: mainMenuList,
        categories: categories,
        indexPageData: indexPageData?.data || {},
        siteMetaData: siteMetaData.data || {},
      },
    });
    /* Index page end */
    /* landing page is same as index page but created for preview purpose*/
    createPage({
      path: `/landing-page-with-components`, // Dynamicaly created route for landing-page-with-components http://localhost:8000/landing-page-with-components?preview=1
      component: landingPageWithComponent,
      context: {
        mainMenu: mainMenuList,
        categories: categories,
        indexPageData: indexPageData?.data || {},
        siteMetaData: siteMetaData.data || {},
      },
    });
    /* landing page component End*/

    /* All blog page start */
    const allBlogPageData = await graphql(`
      {
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
              created(
                difference: ""
                formatString: ""
                fromNow: false
                locale: ""
              )
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

              slug
              status
              summary
              tags {
                name
                slug
              }
              title
              url
              updated(
                difference: ""
                formatString: ""
                fromNow: false
                locale: ""
              )
            }
          }
          totalCount
        }
      }
    `);
    createPage({
      path: `/blog`, // Dynamicaly created route for all blogs http://localhost:8000/blog
      component: blogPage,
      context: {
        mainMenu: mainMenuList,
        categories: categories,
        allBlogPageData: allBlogPageData.data,
        siteMetaData: siteMetaData.data || {},
      },
    });
    /* All blog page end */

    /* Generate blog pages start*/
    let posts = await graphql(`
      {
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
              created(
                difference: ""
                formatString: ""
                fromNow: false
                locale: ""
              )
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

              slug
              status
              summary
              tags {
                name
                slug
              }
              title
              url
              updated(
                difference: ""
                formatString: ""
                fromNow: false
                locale: ""
              )
            }
          }
          totalCount
        }
      }
    `);
    let constructedPosts = [];
    posts?.data?.allButterPost?.edges?.forEach((element) => {
      constructedPosts.push(element.node);
      createPage({
        path: `/blog/${element.node.slug}`, // Dynamicaly created route for  blog view http://localhost:8000/blog/{slug}
        component: blogViewPage,
        context: {
          mainMenu: mainMenuList,
          categories: categories,
          post: element.node,
          siteMetaData: siteMetaData.data || {},
        },
      });
    });
    /* Generate blog pages end*/

    /* Generate blog pages by category start*/
    categories.forEach((element) => {
      createPage({
        path: `/blog/category/${element.slug}`, // Dynamicaly created route for  blogs by category http://localhost:8000/blog/category/{slug}
        component: blogByCategoryPage,
        context: {
          mainMenu: mainMenuList,
          categories: categories,
          slug: element.slug,
          post: constructedPosts,
          siteMetaData: siteMetaData.data || {},
        },
      });
    });
    /* Generate blog pages by category end*/

    /* Generate blog pages by tag start*/
    let tagList = await butter.tag.list();
    tagList = tagList?.data?.data;

    tagList.forEach((element) => {
      createPage({
        path: `/blog/tag/${element.slug}`, // Dynamicaly created route for  blogs by tag http://localhost:8000/blog/tag/{slug}
        component: blogByTagPage,
        context: {
          mainMenu: mainMenuList,
          categories: categories,
          slug: element.slug,
          post: constructedPosts,
          siteMetaData: siteMetaData.data || {},
        },
      });
    });
    /* Generate blog pages by tag end*/
    /* Generate blog pages by search start*/
    categories.forEach((element) => {
      createPage({
        path: `/blog/search`, // Dynamicaly created route for search  http://localhost:8000//blog/search?q=example
        component: blogBySearchPage,
        context: {
          mainMenu: mainMenuList,
          categories: categories,
          slug: element.slug,
          post: constructedPosts,
          siteMetaData: siteMetaData.data || {},
        },
      });
    });
    /* Generate blog pages by search end*/
  } // Check butter cms closing bracket
};
