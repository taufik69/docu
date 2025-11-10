import React from "react";

const AuthorsPage = async ({ params }) => {
  const { name } = await params;
  console.log(name);
  return <div>{name}</div>;
};

export default AuthorsPage;
