import { allPosts } from "content-collections";
import Image from "next/image";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const BlogPage = ({ params }: { params: { slug: string } }) => {
  const blog = allPosts.find((post) => post._meta.path === params.slug);
  if (!blog) return null;
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <div className="relative w-full h-72 border rounded-lg overflow-hidden">
        <Image src={blog.image} alt={blog.title} className="object-cover" layout="fill" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-6xl font-bold tracking-tight">{blog?.title}</h1>
        <p className="text-muted-foreground text-xl">{blog?.description}</p>
      </div>
      <Markdown rehypePlugins={[rehypeRaw]} className="prose dark:prose-invert prose-lg max-w-none">
        {blog?.content}
      </Markdown>
    </div>
  );
};

export default BlogPage;
