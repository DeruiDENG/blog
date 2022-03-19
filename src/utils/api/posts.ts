// import fs from 'fs';
// import { join } from 'path';
// import matter from 'gray-matter';
//
// const postsDirectory = join(process.cwd(), 'content/blogs');
//
interface Post {
  title: string;
  excerpt: string;
  html: string;
  date: string;
  description: string;
  slug: string;
}
//
// export function getPostSlugs() {
//   return fs.readdirSync(postsDirectory);
// }
//
// export function getPostBySlug(slug: string, fields: string[] = []) {
//   const realSlug = slug.replace(/\.md$/, '');
//   const fullPath = join(postsDirectory, `${realSlug}.md`);
//   const fileContents = fs.readFileSync(fullPath, 'utf8');
//   const { data, content } = matter(fileContents);
//
//   type Items = {
//     [key: string]: string;
//   };
//
//   const items: Items = {};
//
//   // Ensure only the minimal needed data is exposed
//   fields.forEach(field => {
//     if (field === 'slug') {
//       items[field] = realSlug;
//     }
//     if (field === 'content') {
//       items[field] = content;
//     }
//
//     if (typeof data[field] !== 'undefined') {
//       items[field] = data[field];
//     }
//   });
//
//   return items;
// }

export function getAllPosts() {
  // const slugs = getPostSlugs();
  // const posts = slugs
  //   .map(slug => getPostBySlug(slug, fields))
  //   // sort posts by date in descending order
  //   .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  const posts: Post[] = [
    {
      title: 'Post Title',
      date: '2022-03-19',
      description: 'Post Description',
      excerpt: 'Post excerpt',
      html: 'Post contents',
      slug: 'Post Title',
    },
    {
      title: 'Post Title2',
      date: '2022-03-20',
      description: 'Post Description 2',
      excerpt: 'Post excerpt 2',
      html: 'Post contents 2',
      slug: 'Post Title2',
    },
  ];
  return posts;
}
