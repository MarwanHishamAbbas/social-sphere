"use client";

import axios from "axios";
import { useQuery } from "react-query";
import PostCard from "./PostCard";
import { PostsType } from "@/types/posts";

const allPosts = async () => {
  const response = await axios.get("/api/posts/allposts");
  return response.data;
};

const AllPosts = () => {
  const { data, error, isLoading } = useQuery<PostsType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  console.log(data);
  if (error) return error;
  if (isLoading) return <h1>Loading.....</h1>;
  return (
    <main className="flex flex-col gap-10">
      {data?.map((post) => (
        <PostCard
          createdAt={post.createdAt}
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
        />
      ))}
    </main>
  );
};

export default AllPosts;
