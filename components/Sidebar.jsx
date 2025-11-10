"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import React, { useEffect } from "react";

const Sidebar = ({ docs }) => {
  const pathname = usePathname();
  const [rootN, setrootN] = React.useState([]);
  const [nonrootN, setnonrootN] = React.useState({});

  useEffect(() => {
    let filteredDocs = [];

    const lastItem = pathname.split("/")[2];
    if (pathname.includes("tags")) {
      filteredDocs = docs.some((item) => {
        return item.tags.includes(decodeURIComponent(lastItem));
      });
    } else if (pathname.includes("author")) {
      filteredDocs = docs.filter((item) => {
        return item.author == decodeURIComponent(lastItem);
      });
    } else if (pathname.includes("categories")) {
      filteredDocs = docs.filter((item) => {
        return item.category == lastItem;
      });
    } else {
      filteredDocs = docs;
    }

    const roots = filteredDocs.filter((item) => {
      return item.parent == null;
    });
    const noonRoot = Object.groupBy(
      docs.filter((doc) => doc.parent),
      ({ parent }) => parent
    );

    const nonRootsKeys = Reflect.ownKeys(noonRoot);
    nonRootsKeys.forEach((key) => {
      const foundRoots = rootN.find((doc) => doc.id == key);
      if (!foundRoots) {
        const foundindocs = docs.find((doc) => doc.id == key);
        console.log("notfoundindocs", foundindocs);
      } else {
        console.log("foundindocs", foundRoots);
      }
    });

    // console.log("nonRootsKeys", nonRootsKeys);

    setnonrootN({ ...noonRoot });
    setrootN([...filteredDocs]);
  }, [pathname]);
  console.log("rootN", rootN);
  return (
    <div>
      <nav className="hidden lg:mt-10 lg:block">
        <ul className="border-l border-transparent">
          {rootN?.map((rootNode) => (
            <li className="relative" key={rootNode.id}>
              <Link
                aria-current="page"
                className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
                href={`/docs/${rootNode.id}`}
              >
                <span className="truncate">{rootNode.title}</span>
              </Link>
              <ul>
                {nonrootN[rootNode.id] &&
                  nonrootN[rootNode.id].map((nonrootNode) => (
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
