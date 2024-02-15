import { BlogType } from "../types/content-types/Blog.type";
import { FeedItem } from "../components/layout/MasonryGrid/MasonryGrid";
import { ForumPostType } from "../types/forumTypes";
import { InstaPost } from "../components/content-types/InstagramPost/InstagramPost";
import { Letter } from "../types/content-types/Letter.type";
import { TikTokPostProps } from "../components/content-types/TikTokPost/TikTokPost";
import { TipPostType } from "../types/tipTypes";
import { VideoType } from "../types/content-types/Video.type";
import parseImageURL from "./parseImageURL";
import parseVideoURL from "./parseVideoURL";
import { v4 as uuidv4 } from "uuid";

/**
 * Checks if a number is even or odds
 * @param num number to check
 * @returns true or false
 */
export function isEven(num: number) {
  return num % 2 === 0;
}

/**
 * Randomizes the order of the feed
 * @param array the feed array
 * @returns
 */
export function shuffle(array: FeedItem[]) {
  let max = array.length;
  let currentElement;
  let index;

  while (max) {
    index = Math.floor(Math.random() * max--);
    currentElement = array[max];
    if (currentElement && currentElement.type === "video" && isEven(index)) {
      max++;
    } else {
      array[max] = array[index];
      array[index] = currentElement;
    }
  }

  return array;
}

/**
 * Moves an item position in an array
 * @param feed an object array
 * @param item an item (must have an id)
 * @param newIndex the new position in the array where the item should be moved to
 * @returns
 */
export function moveArrayObject(feed: any[], item: any, newIndex: number) {
  const itemIndex = feed.findIndex((feedItem) => feedItem.id === item.id);
  const arrayItem = feed.splice(itemIndex, 1)[0];

  feed.splice(newIndex, 0, arrayItem);

  return feed;
}

/**
 * Generates an array of feed items
 * @param feedItems array of all the collection items to be displayed in the feed
 * @param fixedFirstItems Show a fixed layout for the first items
 * @returns
 */
export const generateFeedTiles = (
  {
    blogs = [],
    letters = [],
    forum = [],
    instagram = [],
    tiktok = [],
    videos = [],
    chats = [],
    tips = [],
  }: {
    blogs?: BlogType[];
    letters?: Letter[];
    forum?: ForumPostType[];
    instagram?: InstaPost[];
    tiktok?: TikTokPostProps[];
    videos?: VideoType[];
    chats?: any;
    tips?: TipPostType[];
  },
  fixedFirstItems = false
) => {
  const blogFeedItem: FeedItem[] = blogs.map((item) => ({
    id: `blog-${uuidv4()}`,
    width: 4,
    type: "blog",
    content: item,
  }));
  const letterFeedItem: FeedItem[] = letters.map((item) => ({
    id: `letter-${uuidv4()}`,
    width: 4,
    type: "letter",
    content: item,
  }));
  const forumFeedItem: FeedItem[] = forum.map((item) => ({
    id: `forum-${uuidv4()}`,
    width: 4,
    type: "forum",
    content: item,
  }));
  const instagramFeedItem: FeedItem[] = instagram.map((item) => ({
    id: `instagram-${uuidv4()}`,
    width: 4,
    type: "instagram",
    content: item,
  }));
  const tiktokFeedItem: FeedItem[] = tiktok.map((item) => ({
    id: `tiktok-${uuidv4()}`,
    width: 4,
    type: "tiktok",
    content: item,
  }));
  const videosFeedItem: FeedItem[] = videos.map((item) => ({
    id: `video-${uuidv4()}`,
    width: 4,
    type: "video",
    content: {
      title: item?.title || "",
      subtitle: item?.subtitle || "",
      poster: parseImageURL(item?.video_cover_image?.id) || "",
      src: parseVideoURL(item?.video_file?.id),
    },
  }));
  const chatFeedItem: FeedItem[] = chats.map((item: any) => ({
    id: `chat-${uuidv4()}`,
    width: 4,
    type: "chat",
    content: item,
  }));

  const tipFeedItem: FeedItem[] = tips.map((item: any) => ({
    id: `tip-${uuidv4()}`,
    width: 4,
    type: "tip",
    content: item,
  }));

  const feedItems: FeedItem[] = [
    ...blogFeedItem,
    ...letterFeedItem,
    ...forumFeedItem,
    ...instagramFeedItem,
    ...tiktokFeedItem,
    ...videosFeedItem,
    ...chatFeedItem,
    ...tipFeedItem,
  ];
  return feedItems;
};
