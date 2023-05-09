"use client";

import axios from "axios";
import { useQuery } from "react-query";
import PostCard from "./PostCard";
import { PostsType } from "@/types/posts";
import { Loader } from "@mantine/core";

const allPosts = async () => {
  const response = await axios.get("/api/posts/allposts");
  return response.data;
};

const AllPosts = ({ image }: { image: string }) => {
  const { data, error, isLoading } = useQuery<PostsType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  if (error) return error;
  if (data?.length === 0) return <h1 className="text-center">No Posts Yet</h1>;
  if (isLoading) return <Loader className="text-center w-full" />;
  return (
    <main className="flex flex-col gap-10">
      {data?.map((post) => (
        <PostCard
          image={image}
          createdAt={post.createdAt}
          key={post.id}
          id={post.id}
          name={post.user.name}
          email={post.user.email}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
        />
      ))}
    </main>
  );
};

export default AllPosts;
