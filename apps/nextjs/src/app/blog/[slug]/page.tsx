import { allPosts } from "content-collections";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const BlogPage = ({ params }: { params: { slug: string } }) => {
  const blog = allPosts.find((post) => post._meta.path === params.slug);
  return (
    <div>
      <h1> {blog?.title}</h1>
      <Markdown rehypePlugins={[rehypeRaw]} className="prose dark:prose-invert max-w-none">
        {blog?.content}
      </Markdown>
    </div>
  );
};

export default BlogPage;
