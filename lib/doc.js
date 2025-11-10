import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { log } from "console";

const postsDirectory = path.join(process.cwd(), "docs");

export function getDocuments() {
  const list = fs.readdirSync(postsDirectory);
  const allDocuments = list.map((file) => {
    const id = file.replace(".md", "");
    const fileFullPath = path.join(postsDirectory, file);
    const fileContent = fs.readFileSync(fileFullPath, "utf-8");
    const matterResult = matter(fileContent);
    return {
      id,
      ...matterResult.data,
    };
  });

  return allDocuments.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });
}

//

export async function getDocumentContent(id = "introduction") {
  const fileFullPath = path.join(postsDirectory, `${id}.md`);

  const fileContent = fs.readFileSync(fileFullPath, "utf-8");
  const matterResult = matter(fileContent);

  const processControl = await remark().use(html).process(matterResult.content);
  const contentHtml = processControl.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
