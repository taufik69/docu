import React from "react";

const ContentPage = async ({ params }) => {
  const resolvedParams = await params;

  console.log(resolvedParams);
  const { contentid } = resolvedParams;
  return <div>{contentid}</div>;
};

export default ContentPage;
