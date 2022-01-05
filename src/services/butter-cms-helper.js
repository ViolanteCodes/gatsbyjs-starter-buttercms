var butter = require("buttercms")(
  process.env.GATSBY_BUTTER_CMS_TOKEN,
  process.env.GATSBY_BUTTER_PREVIEW_MODE
);

export async function searchPosts(query) {
  try {
    const response = await butter.post.search(query);

    return response?.data?.data;
  } catch (e) {
    throw e.response.data.detail;
  }
}
