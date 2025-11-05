import Link from "next/link";
import React from "react";

const Sidebar = ({ docs }) => {
  const roots = docs.filter((item) => {
    return item.parent == null;
  });

  const noonRoot = Object.groupBy(
    docs.filter((doc) => doc.parent),
    ({ parent }) => parent
  );
  console.log(noonRoot);

  return (
    <div>
      <nav className="hidden lg:mt-10 lg:block">
        <ul className="border-l border-transparent">
          {roots?.map((rootNode) => (
            <li className="relative" key={rootNode.id}>
              <Link
                aria-current="page"
                className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
                href={`/docs/${rootNode.id}`}
              >
                <span className="truncate">{rootNode.title}</span>
              </Link>
              <ul>
                {noonRoot[rootNode.id] &&
                  noonRoot[rootNode.id].map((nonrootNode) => (
                    <li key={nonrootNode.id}>
                      <Link
                        className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                        href={`/docs/${rootNode.id}/${nonrootNode.id}`}
                      >
                        <span className="truncate">{nonrootNode.title}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
