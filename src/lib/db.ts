import {readdirSync, readFileSync} from "node:fs";
import {join} from "node:path";

export function getAllPosts() {
  let path = join(process.cwd(), "content", "posts");

  return readdirSync(path).map((x) => {
    let data = readFileSync(join(path, x), "utf-8");
    let frontMatter = getFrontMatter(data);

    let content = getContent(data);
    let titles = getTitlesFromContent(content);
    console.log("🚀 ~ returnreaddirSync ~ titles:", titles);
    return {
      frontMatter: {
        ...frontMatter,
        slug: slugify(frontMatter.title),
        tags: frontMatter.tags.split(", "),
      },
      content,
      titles,
    };
  });
}

export function getAllPostData() {
  return getAllBlogPostNames().map((p) => {
    let post = readFileSync(
      join(process.cwd(), "content", "posts", p + ".mdx"),
      "utf-8",
    );
    let frontMatter = getFrontMatter(post);
    return {
      ...frontMatter,
      slug: slugify(frontMatter.title),
    };
  });
}

export function getPost(slug: string) {
  return getAllPosts().find((x) => x.frontMatter.slug === slug);
}

const regexForFrontMatter = /---\n([\s\S]+?)\n---/;
type FrontMatter = {
  title: string;
  about: string;
  date: string;
  tags: string;
  updated: string;
};

function getAllBlogPostNames() {
  let path = join(process.cwd(), "content", "posts");
  return readdirSync(path).map((x) => x.replaceAll(".mdx", ""));
}

function getFrontMatter(data: string): FrontMatter {
  let match = data.match(regexForFrontMatter);
  if (!match) {
    return {
      title: "",
      about: "",
      date: "",
      tags: "",
      updated: "",
    };
  }
  let frontMatter = match[1];
  let lines = frontMatter.split("\n");
  let obj = lines.reduce<FrontMatter>((acc, line) => {
    let [key, value] = line.split(": ");
    acc[key as keyof FrontMatter] = value.replace(/"/g, "");
    return acc;
  }, {} as FrontMatter);
  return obj;
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

function getContent(data: string) {
  let match = data.match(regexForFrontMatter);
  if (!match) {
    return "";
  }
  let content = data.slice(match[0].length);
  return content;
}

function getTitlesFromContent(content: string) {
  let titleRegexMarkdown = /(?<=^#{1,6} ).*$/gm;
  let match = content.match(titleRegexMarkdown);
  if (!match) {
    return [];
  }
  return Array.from(new Set(match));
}