# GatsbyJS + ButterCMS Starter Project

<!-- Brackets [] are placeholders. When readme is complete, all brackets should be
updated with the correct value and comments deleted from the file. Please number
sections accordingly to move people through the process as cleanly as possible.-->

This GatsbyJS starter project fully integrates with dynamic sample content from your ButterCMS account, including main menu, pages, blog posts, categories, and tags, all with a beautiful, custom theme with already-implemented search functionality. All of the included sample content is automatically created in your account dashboard when you sign up for a free trial of ButterCMS.


[Live demo](https://gatsbyjsstarterbuttercms.gatsbyjs.io/)
<!-- If there is a live deployment/demo, e.g. vercel:
Live Demo: [link]
 -->

<!-- If there's a quick deployment method set up:
Once created, this project can be easily and quickly deployed to [location] from [method, 
e.g., "the CLI" ] (see instructions below)
-->

## 1. Installation

First, clone the repo and install the dependencies by running below commands, depending on your preferred setup:

```bash
$ npx i
```

Or

```bash
$ yarn
```


### 2. Set API Token

To fetch your ButterCMS content, add your API token as an environment variable. 

```bash
$ 'GATSBY_BUTTER_CMS_TOKEN=<Your API Token>' >> .env
$ 'GATSBY_BUTTER_PREVIEW_MODE=<true/false>' >> .env
```

<!-- Optional build step for frameworks that require a separate build
command, e.g., npm:

### Build App

Run the following command to the build the app and get it ready for running locally:

[command]
-->

### 3. Run local server

To view the app in the browser, you'll need to run the local development server:

```bash
$ cd gatsbyjs-starter-buttercms
$ npx run develop 
```

Or

```bash
$ cd gatsbyjs-starter-buttercms
$ yarn develop 
```

Congratulations! Your starter project is now live.

<!-- Note - this example below was written with Gatsby Cloud; please update instructions
to fit whatever quick deployment host was specified. Please
used button based deployment if available; see specifications documents to 
links to button workflows-->
## 4. Deploy on Gatsby Cloud

Deploy your GatsbyJS app using Gatsby Cloud, the creators of Next.js. With the click of a button, you'll create a copy of your starter project in your Git provider account, instantly deploy it, and institute a full content workflow connected to your ButterCMS account. Smooth.

<!-- Here's an example of the Gatsby Cloud Button. Note that the link is configured to
allow for a smooth and easy deployment, including necessary environmental variables. 
For hosts that don't allow you to specify environmental variables in the button link,
make sure a config file is present in the repo that feeds the names of environmental
variables to the host.
-->

[![Deploy with Gatsby Cloud](https://i.ibb.co/WvjYxSZ/screenshot-www-gatsbyjs-com-2022-01-08-11-31-44.png)](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/ButterCMS/gatsbyjs-starter-buttercms)

- After signup in Gatsby cloud need to add env variable in Site setting. Add GATSBY_BUTTER_CMS_TOKEN in env
- for preview mode add GATSBY_BUTTER_PREVIEW_MODE in environment as true it will show preview mode or draft mode
[![Deploy to Gatsby](https://support.gatsbyjs.com/hc/article_attachments/1500013684942/CleanShot_2021-05-03_at_11.26.48_2x.png)](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/ButterCMS/gatsbyjs-starter-buttercms)
- Configure webhooks in ButterCMS. Add this preview webhooks and Builds hooks in ButterCMS.
[![Deploy to Gatsby](https://support.gatsbyjs.com/hc/article_attachments/360101933133/mceclip4.png)](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/ButterCMS/gatsbyjs-starter-buttercms)