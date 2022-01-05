var butter = require("buttercms")(
  process.env.GATSBY_BUTTER_CMS_TOKEN,
  process.env.GATSBY_BUTTER_PREVIEW_MODE
);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

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

  // nevigation
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
  let data = [];
  mainMenu.menu_items.forEach((page) => {
    data.push({
      label: page.label,
      url: page.url,
    });
  });

  createPage({
    path: `/`,
    component: indexPage,
    context: {
      mainMenu: data,
      categories: categories,
    },
  });

  createPage({
    path: `/landing-page-with-components`,
    component: landingPageWithComponent,
    context: {
      mainMenu: data,
      categories: categories,
    },
  });

  createPage({
    path: `/blog`,
    component: blogPage,
    context: {
      mainMenu: data,
      categories: categories,
    },
  });

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
      path: `/blog/${element.node.slug}`,
      component: blogViewPage,
      context: {
        mainMenu: data,
        categories: categories,
        post: element.node,
      },
    });
  });

  categories.forEach((element) => {
    createPage({
      path: `/blog/category/${element.slug}`,
      component: blogByCategoryPage,
      context: {
        mainMenu: data,
        categories: categories,
        slug: element.slug,
        post: constructedPosts,
      },
    });
  });

  //

  let tagList = await butter.tag.list();
  tagList = tagList?.data?.data;

  tagList.forEach((element) => {
    createPage({
      path: `/blog/tag/${element.slug}`,
      component: blogByTagPage,
      context: {
        mainMenu: data,
        categories: categories,
        slug: element.slug,
        post: constructedPosts,
      },
    });
  });

  categories.forEach((element) => {
    createPage({
      path: `/blog/search`,
      component: blogBySearchPage,
      context: {
        mainMenu: data,
        categories: categories,
        slug: element.slug,
        post: constructedPosts,
      },
    });
  });
};
