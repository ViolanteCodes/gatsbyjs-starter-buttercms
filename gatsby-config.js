require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
var Butter = require("buttercms");
var butter;

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
  console.log("error", e);
}

let plugins = [
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,

  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `gatsby-starter-default`,
      short_name: `starter`,
      start_url: `/`,
      background_color: `#663399`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    },
  },

  {
    resolve: "gatsby-plugin-zeit-now",
    options: {
      globalHeaders: {
        "x-frame-options": "SAMEORIGIN",
      },
    },
  },

  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.app/offline
  // 'gatsby-plugin-offline',
];
if (isButterCMS) {
  // If token is set properly then plugin will set
  plugins.push({
    resolve: `gatsby-source-buttercms`,
    options: {
      authToken: process.env.GATSBY_BUTTER_CMS_TOKEN,
      // Optional. Array of page slugs.
      pages: [`landing-page-with-components-123`],
      // Optional. Array of page types.
      pageTypes: [`landing-page`],
      contentFields: {
        keys: [`navigation_menu`],
        // Optional. Set to 1 to enable test mode for viewing draft content.
        test: 0,
      },

      preview: preview,
    },
  });
}
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    social: {
      twitter: "@gatsbyjs",
    },
  },
  plugins: plugins,
};
