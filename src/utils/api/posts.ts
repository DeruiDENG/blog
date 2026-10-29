import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";

export interface Post {
  title: string;
  excerpt: string;
  date: string;
  description: string;
  slug: string;
}

export interface PostDetails extends Post {
  html: string;
  prevPost?: {
    slug: string;
    title: string;
  } | null;
  nextPost?: {
    slug: string;
    title: string;
  } | null;
}

export interface PaginatedResult {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const description = (matterResult.data.description as string) || "";
    const excerpt = (matterResult.data.excerpt as string) || description || "";

    return {
      slug,
      title: (matterResult.data.title as string) || slug,
      date: (matterResult.data.date as string) || "",
      description,
      excerpt,
      ...matterResult.data,
    } as Post;
  });

  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getPaginatedPosts(page: number, pageSize: number = 5): PaginatedResult {
  const all = getAllPosts();
  const totalPosts = all.length;
  const totalPages = Math.ceil(totalPosts / pageSize) || 1;
  const validPage = Math.max(1, page);
  const start = (validPage - 1) * pageSize;

  return {
    posts: all.slice(start, start + pageSize),
    totalPages,
    currentPage: validPage,
    totalPosts,
  };
}

export async function getPostData(rawSlug: string): Promise<PostDetails | null> {
  const slug = decodeURIComponent(rawSlug);
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // Fix relative image links like ![alt](posts/...) -> !(/posts/...)
  const normalizedContent = matterResult.content.replace(
    /\]\(posts\//g,
    "](/posts/"
  );

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeShiki, {
      theme: "one-dark-pro",
    })
    .use(rehypeStringify)
    .process(normalizedContent);
  const contentHtml = processedContent.toString();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);

  // allPosts is sorted descending (newest first)
  // newer post is index - 1, older post is index + 1
  const prevPost =
    currentIndex > 0
      ? {
          slug: allPosts[currentIndex - 1].slug,
          title: allPosts[currentIndex - 1].title,
        }
      : null;

  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? {
          slug: allPosts[currentIndex + 1].slug,
          title: allPosts[currentIndex + 1].title,
        }
      : null;

  const description = (matterResult.data.description as string) || "";
  const excerpt = (matterResult.data.excerpt as string) || description || "";

  return {
    title: (matterResult.data.title as string) || slug,
    date: (matterResult.data.date as string) || "",
    description,
    excerpt,
    ...matterResult.data,
    slug,
    html: contentHtml,
    prevPost,
    nextPost,
  };
}
