import React from "react";
import { getDocumentContent } from "../../../lib/doc.js";
import Link from "next/link.js";
import Tag from "../../../components/Tag.jsx";

const ContentPage = async ({ params }) => {
  const resolvedParams = await params;
  const content = await getDocumentContent(resolvedParams.contentid);

  return (
    <div>
      <article className="prose dark:prose-invert">
        <h1>{content.title}</h1>
        <div>
          <span>Published On: {content.date}</span> by{" "}
          <Link
            href={`/author/${content.author}`}
            className="text-xl text-blue-400 px-2"
          >
            {content.author}
          </Link>{" "}
          under the{" "}
          <Link
            href={`/categories/${content.category}`}
            className="text-xl text-blue-400 px-2"
          >
            {content.category}
          </Link>{" "}
          category.
        </div>
        <div className="my-3">
          {content.tags &&
            content.tags.map((tag) => <Tag key={tag} tag={tag} />)}
        </div>
        <div
          className="lead"
          dangerouslySetInnerHTML={{ __html: content.contentHtml }}
        />
      </article>
    </div>
  );
};

export default ContentPage;
