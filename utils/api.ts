import { BlogType } from "../types/content-types/Blog.type";
import { CompanyInfo } from "../types/componayInfoTypes";
import ENDPOINTS from "../constants/endpoints";
import { ForumPostType } from "../types/forumTypes";
import { InstaPost } from "../components/content-types/InstagramPost/InstagramPost";
import { Letter } from "../types/content-types/Letter.type";
import { MenuItem } from "../components/layout/Header/Header";
import { POST_PER_PAGE } from "../constants/app-configs";
import { TikTokPostProps } from "../components/content-types/TikTokPost/TikTokPost";
import { VolunteerRequestType } from "../types/volunteerRequestTypes";

type LetterRequest = {
  letterFilter?: any;
} & DirectusParams;

type DirectusParams = {
  /** The amount of items that will be fetched, set -1 to retrieve all */
  postPerPage?: number;

  /** If post per page is set, you can use this param to paginate */
  page?: number;

  /** Value that will be search in all the valid fields */
  search?: string;

  /** Syntax to use is field for ascending or -field for descending */
  sort?: string;

  /** Syntax to use is filter[field][operator]=value example: filter[id][_eq]=1 */
  filter?: string;

  /** Get meta information, like filter_count */
  meta?: string;
};

/**
 * Uploads a file to the backend
 * @param file
 * @returns
 */
export const uploadFile = async (file: File) => {
  const formData = new FormData();

  formData.append("title", file.name);
  formData.append("file", file);

  const res = await fetch(`${ENDPOINTS.BASE}/files`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
};

/**
 * Add a forumpost
 * @param data
 */
export const postForum = async (data: any) => {
  const res = await fetch(`${ENDPOINTS.COLLECTIONS}/forum_posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      comments: [],
      homepage_id: null,
      likes: 0,
      status: "draft",
    }),
  });
};
/**
 * Add a forum post with comments
 * @param data
 */
export const postForumWithComments = async (data: any) => {
  return await fetch(`${ENDPOINTS.COLLECTIONS}/forum_posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

/**
 * Update any Forum data ( Here I am using this to update the Likes Count. )
 * @param forumId
 */
export const updateForumDetails = async (forumId: string, data: any) => {
  const updatedData = JSON.stringify(data);
  return await fetch(`${ENDPOINTS.COLLECTIONS}/forum_posts/${forumId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: updatedData,
  });
};

/**
 * Add a comment
 * @param type "forum" or "blog"
 * @param data
 */
export const postComment = async (
  type: "forum" | "blog" | "open_letter",
  { post_id, ...rest }: any
) => {
  if (rest.parent_id) {
  } else {
    const res = await fetch(`${ENDPOINTS.COLLECTIONS}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...rest,
        [`${type.includes("letter") ? type : `${type}_post`}`]: { id: post_id },
        status: "draft",
      }),
    });
  }
};

/**
 * Get all the comments of a post
 * @param type the type of post
 * @param post_id
 * @returns
 */
export const getComments = async (
  type: "forum" | "blog" | "open_letter",
  post_id: string
) => {
  //`${ENDPOINTS.COLLECTIONS}/comments?fields=*.*.*&filter[status][_eq]=published&filter[${type}_post][_eq]=${post_id}`
  return await fetch(
    `${
      ENDPOINTS.COLLECTIONS
    }/comments?fields=*,child_comments.*&filter[status][_eq]=published&filter[${
      type.includes("letter") ? type : `${type}_post`
    }][_eq]=${post_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/**
 * Get all the menu items used for navigation
 * @returns array or null
 */
export const getMenuItems = async () => {
  try {
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/main_nav_items?fields=*.*.*.*&filter[status][_eq]=published`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resData = await res.json();
    return resData.data as MenuItem[];
  } catch (error) {
    return null;
  }
};

/**
 * Get all the menu items used for navigation
 * @returns array
 */
export const getCompanyInfo = async () => {
  try {
    // end point ${ENDPOINTS.COLLECTIONS}/general_info?fields=*.*.*
    const res = await fetch(`${ENDPOINTS.COLLECTIONS}/general_info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();
    return resData.data as CompanyInfo;
  } catch (error) {
    return null;
  }
};

/**
 * Gets the home page details
 */
export const getHomePageData = async () => {
  return await fetch(`${ENDPOINTS.COLLECTIONS}/home_page`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * get the top home page details
 *
 */
export const getHomeTopPageData = async () => {
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/home_show_top_data?fields=*.*.*.*.*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
/**
 * Get a list of all published open letters
 * @returns
 */
export const getLetters = async ({
  postPerPage,
  page = 1,
  search,
  sort,
  filter,
  letterFilter,
  meta = "total_count",
}: LetterRequest) => {
  //${ENDPOINTS.COLLECTIONS}/open_letters?fields=*.*.*&filter[status][_eq]=published&limit=${postPerPage}&page=${page}
  let url = `${ENDPOINTS.COLLECTIONS}/open_letters?fields=*.*.*&filter[status][_eq]=published&${letterFilter}`;

  if (meta) {
    url = `${url}&meta=${meta}`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (sort) {
    url = `${url}&sort=${sort}`;
  }
  if (filter) {
    url = `${url}&${filter}`;
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Add a letter subscription
 * @param data
 */
export const postLetterSubscription = async (data: any) => {
  await fetch(`${ENDPOINTS.COLLECTIONS}/letter_submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const postLetterDownload = async (data: any) => {
  await fetch(`${ENDPOINTS.COLLECTIONS}/document_download`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
/**
 * Gets the blog overview page details
 */
export const getPostOverviewPageData = async () => {
  // blog overview page ${ENDPOINTS.COLLECTIONS}/blog_overview_page?fields=*.*.*.*
  return await fetch(`${ENDPOINTS.COLLECTIONS}/blog_overview_page`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Gets a list of blog posts
 * @param postPerPage the amount of posts to be shown per page
 * @param page the current paginated page
 * @param query the search query
 * @returns
 */
export const getPosts = async ({
  postPerPage,
  page = 1,
  search,
  sort,
  filter,
  meta = "total_count",
}: DirectusParams) => {
  let url = `${ENDPOINTS.COLLECTIONS}/vlogposts?filter=[status][_eq]=published&limit=${postPerPage}&page=${page}&fields=*.*.*`;
  if (meta) {
    url = `${url}&meta=${meta}`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (sort) {
    url = `${url}&sort=${sort}`;
  } else {
    url = `${url}&sort=-date_created`;
  }
  if (filter) {
    url = `${url}&${filter}`;
  }
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
/*get a list of tips */
export const getTips = async ({
  postPerPage,
  page = 1,
  search,
  sort,
  filter,
  meta = "total_count",
}: DirectusParams) => {
  let url = `${ENDPOINTS.COLLECTIONS}/tips?filter=[status][_eq]=published&limit=${postPerPage}&page=${page}&fields=*.*.*`;
  if (meta) {
    url = `${url}&meta=${meta}`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (sort) {
    url = `${url}&sort=${sort}`;
  }
  if (filter) {
    url = `${url}&${filter}`;
  }
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Gets a list of blog posts
 * @param postPerPage the amount of posts to be shown per page
 * @param page the current paginated page
 * @param query the search query
 * @returns
 */
export const getInstaPosts = async ({
  postPerPage,
  page = 1,
  search,
  sort,
  filter,
  meta = "total_count",
}: DirectusParams) => {
  let url = `${ENDPOINTS.COLLECTIONS}/instagram_embeds?fields=*.*.*&filter[status][_eq]=published&limit=${postPerPage}&page=${page}`;

  if (meta) {
    url = `${url}&meta=${meta}`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (sort) {
    url = `${url}&sort=${sort}`;
  }
  if (filter) {
    url = `${url}&${filter}`;
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Gets a list of blog posts
 * @param postPerPage the amount of posts to be shown per page
 * @param page the current paginated page
 * @param query the search query
 * @returns
 */
export const getTikTokPosts = async ({
  postPerPage,
  page = 1,
  search,
  sort,
  filter,
  meta = "total_count",
}: DirectusParams) => {
  let url = `${ENDPOINTS.COLLECTIONS}/tiktok_embed?fields=*.*.*&filter[status][_eq]=published&limit=${postPerPage}&page=${page}`;

  if (meta) {
    url = `${url}&meta=${meta}`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (sort) {
    url = `${url}&sort=${sort}`;
  }
  if (filter) {
    url = `${url}&${filter}`;
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Gets a list of blog posts
 * @param postPerPage the amount of posts to be shown per page
 * @param page the current paginated page
 * @param query the search query
 * @returns
 */
export const getVideoItems = async ({
  postPerPage,
  page = 1,
  search,
  sort,
  filter,
  meta = "total_count",
}: DirectusParams) => {
  //${ENDPOINTS.COLLECTIONS}/video_items?fields=*.*.*&filter[status][_eq]=published&limit=${postPerPage}&page=${page}
  let url = `${ENDPOINTS.COLLECTIONS}/video_items?fields=*.*.*&filter[status][_eq]=published&limit=${postPerPage}&page=${page}`;

  if (meta) {
    url = `${url}&meta=${meta}`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (sort) {
    url = `${url}&sort=${sort}`;
  }
  if (filter) {
    url = `${url}&${filter}`;
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Get the list of chats
 */

export const getChatItems = async ({
  postPerPage,
  page = 1,
  search,
  sort,
  filter,
  meta = "total_count",
}: DirectusParams) => {
  let url = `${ENDPOINTS.COLLECTIONS}/chat?filter=[status][_eq]=published&limit=${postPerPage}&page=${page}`;

  if (meta) {
    url = `${url}&meta=${meta}`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (sort) {
    url = `${url}&sort=${sort}`;
  }
  if (filter) {
    url = `${url}&${filter}`;
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
/**
 * Get the post detail base on the slug
 * @param slug the post slug
 * @returns
 */
export const getPostDetail = async (slug: string) => {
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/vlogposts?fields=*.*.*.*&filter[slug][_eq]=${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/**
 * Gets the Forum overview page details
 */
export const getForumOverviewPageData = async () => {
  // page forum overiew ${ENDPOINTS.COLLECTIONS}/forum_overview_page?fields=*.*.*
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/forum_overview_page?fields=*.*.*.*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/**
 * Gets a list of forum posts
 * @param postPerPage the amount of posts to be shown per page
 * @param page the current paginated page
 * @param query the search query
 * @returns
 */
export const getForumPosts = async ({
  postPerPage,
  page = 1,
  search,
  sort,
  filter,
  meta,
}: DirectusParams) => {
  // post forum let url = `${ENDPOINTS.COLLECTIONS}/forum_posts?fields=*.*.*&filter[status][_eq]=published&limit=${postPerPage}&page=${page}`;
  let url = `${ENDPOINTS.COLLECTIONS}/forum_posts?fields=*.*.*&filter[status][_eq]=published&sort[]=-date_created&limit=${postPerPage}&page=${page}`;

  if (meta) {
    url = `${url}&meta=${meta}`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (sort) {
    url = `${url}&sort=${sort}`;
  }
  if (filter) {
    url = `${url}&${filter}`;
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Gets the data for the homepage
 * @returns
 */
export const getHomeData = async () => {
  return await fetch(`${ENDPOINTS.COLLECTIONS}/home_page?fields=*.*.*`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Gets the data for the the book page
 * @returns
 */
export const getTheBookData = async () => {
  return await fetch(`${ENDPOINTS.COLLECTIONS}/the_book?fields=*.*.*`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Add a volunteer application
 * @param data
 */
export const postVolunteerApplication = async (data: VolunteerRequestType) => {
  await fetch(`${ENDPOINTS.COLLECTIONS}/volunteer_signup_requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });
};

/**
 * Gets all available tags
 */
export const getContentTag = async ({ filter }: any) => {
  // content url `${ENDPOINTS.COLLECTIONS}/categories?filter[status][_eq]=published&fields=*.*.*`
  let url = `${ENDPOINTS.COLLECTIONS}/categories?fields=*.*.*?filter[status][_eq]=published`;
  if (filter) {
    url = `${url}&${filter}`;
  }
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const getContentTags = async () => {
  // content url `${ENDPOINTS.COLLECTIONS}/categories?filter[status][_eq]=published&fields=*.*.*`
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/categories?fields=*.*.*?filter[status][_eq]=published`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getFeed = async ({
  postPerPage = POST_PER_PAGE,
  page = 1,
  filter,
  meta = "total_count",
}: DirectusParams) => {
  const [
    blogsReq,
    instagramReq,
    tiktokReq,
    forumReq,
    lettersReq,
    videosReq,
    chatReq,
    tipReq,
  ] = await Promise.all([
    getPosts({
      postPerPage,
      page,
      meta,
      filter,
    }),
    getInstaPosts({
      postPerPage,
      page,
      filter,
      meta,
    }),
    getTikTokPosts({
      postPerPage,
      page,
      filter,
      meta,
    }),
    getForumPosts({
      postPerPage,
      page,
      filter,
      meta,
      sort: `-date_created`,
    }),
    getLetters({
      postPerPage,
      page,
      filter,
      meta,
    }),
    getVideoItems({
      postPerPage,
      page,
      filter,
      meta,
    }),
    getChatItems({
      postPerPage,
      page,
      filter,
      meta,
    }),
    getTips({
      postPerPage,
      page,
      filter,
      meta,
    }),
  ]);

  return {
    blogsRes: await blogsReq.json(),
    instagramRes: await instagramReq.json(),
    tiktokRes: await tiktokReq.json(),
    forumRes: await forumReq.json(),
    lettersRes: await lettersReq.json(),
    videosRes: await videosReq.json(),
    chatRes: await chatReq.json(),
    tipsRes: await tipReq.json(),
  };
};

/**
 * Gets a list of faq items
 * @param postPerPage the amount of items to be shown per page
 * @param page the current paginated page
 * @param query the search query
 * @returns
 */
export const getFaqs = async ({
  // postPerPage,
  // page = 1,
  search,
  sort,
  filter,
  meta = "total_count",
  type = "volunteer_faq",
}: DirectusParams & { type?: string }) => {
  let url = `${ENDPOINTS.COLLECTIONS}/faq_items?fields=*.*.*?filter[status][_eq]=published&filter[type][_eq]=${type}`;

  if (meta) {
    url = `${url}&meta=${meta}`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (sort) {
    url = `${url}&sort=${sort}`;
  }
  if (filter) {
    url = `${url}&${filter}`;
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Gets the data for the faq overview page
 * @returns
 */
export const getFaqOverviewData = async () => {
  return await fetch(`${ENDPOINTS.COLLECTIONS}/faq_overview_page?fields=*.*`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Get the tip detail base on the slug
 * @param slug the post slug
 * @returns
 */
export const getTipDetail = async (slug: string) => {
  return await fetch(
    `${ENDPOINTS.COLLECTIONS}/tips?fields=*.*.*.*&filter[slug][_eq]=${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
