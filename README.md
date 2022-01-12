# GatsbyJS + ButterCMS Starter Project

This GatsbyJS starter project fully integrates with dynamic sample content from your ButterCMS account, including main menu, pages, blog posts, categories, and tags, all with a beautiful, custom theme with already-implemented search functionality. All of the included sample content is automatically created in your account dashboard when you sign up for a free trial of ButterCMS.

[Live demo](https://gatsbyjsstarterbuttercms.gatsbyjs.io/)

## 1. Installation

First, clone the repo and install the dependencies by running below commands, depending on your preferred setup:

```bash
$ git clone https://github.com/ButterCMS/gatsbyjs-starter-buttercms.git
$ cd gatsbyjs-starter-buttercms
$ npm install
```

Or

```bash
$ git clone https://github.com/ButterCMS/gatsbyjs-starter-buttercms.git
$ cd gatsbyjs-starter-buttercms
$ yarn install
$ yarn run develop 
```
### 2. Set API Token

To fetch your ButterCMS content, add your API token as an environment variable.

```bash
'GATSBY_BUTTER_CMS_TOKEN=<Your API Token>' >> .env.development
'GATSBY_BUTTER_PREVIEW_MODE=<true>' >> .env.development
```

### 3. Run local server

To view the app in the browser, you'll need to run the local development server:

```bash
$ npm run develop
```

Or

```bash
$ yarn develop 
```

Congratulations! Your starter project is now live.

## 4. Deploy on Gatsby Cloud

Deploy your GatsbyJS app using Gatsby Cloud, the creators of Next.js. With the click of a button, you'll create a copy of your starter project in your Git provider account, instantly deploy it, and institute a full content workflow connected to your ButterCMS account. Smooth.



[![Deploy with Gatsby Cloud](https://i.ibb.co/4Zn3J4c/gatsby-cloud-button.png)](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/ButterCMS/gatsbyjs-starter-buttercms)

- Once you've signed into your free Gatsby Cloud account, follow the prompts to deploy your site. When you get to the environment variables screen, add "GATSBY_BUTTER_CMS_TOKEN" and set it to your Butter API token.

[![Deploy to Gatsby](https://support.gatsbyjs.com/hc/article_attachments/1500013684942/CleanShot_2021-05-03_at_11.26.48_2x.png)](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/ButterCMS/gatsbyjs-starter-buttercms)
- To have your deployed site automatically rebuild with changes, add the following webhooks inside of your Gatsby account.
[![Deploy to Gatsby](https://support.gatsbyjs.com/hc/article_attachments/360101933133/mceclip4.png)](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/ButterCMS/gatsbyjs-starter-buttercms)