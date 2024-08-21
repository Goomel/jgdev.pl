import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/app/lib/types';

export const pathToPosts = path.join(process.cwd(), '/content/posts');

const getMDXFile = (filename: string) => {
  const MDXFilePath = path.join(pathToPosts, `${filename}.mdx`);
  return fs.existsSync(MDXFilePath) ? MDXFilePath : null;
};

const readMDXFile = (pathToFile: string) => {
  return fs.readFileSync(pathToFile, 'utf-8');
};

export const getPostData = (slug: string): Post => {
  const MDXFile = getMDXFile(slug);
  if (!MDXFile) throw new Error(`MDX file with slug ${slug} doesn't exist`);
  const source = readMDXFile(MDXFile);
  const { content, data } = matter(source);
  return {
    ...(data as Omit<Post, 'slug' | 'content'>),
    slug,
    content,
  };
};

const getAllMDXFileNames = () => {
  const files = fs.readdirSync(pathToPosts);
  return files.map((file) => path.parse(file).name);
};

const sortPostsByDate = (posts: Post[]) => {
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
};

export const getAllBlogPosts = () => {
  const postNames = getAllMDXFileNames();
  const posts = postNames.map((postName) => ({
    ...getPostData(postName),
  }));
  return posts;
};

export const getSortedBlogPosts = () => {
  return sortPostsByDate(getAllBlogPosts());
};

export const getLatestBlogPosts = () => {
  const sortedPosts = getSortedBlogPosts();
  const recentPosts = sortedPosts.slice(0, 5);
  return recentPosts;
};
