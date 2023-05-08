"use client";

import { ImageIcon, Paperclip, MapPin, Smile, PlusCircle } from "lucide-react";
import { useState } from "react";

import Image from "next/image";
import CustomButton from "../common/CustomButton";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

const CreatePostForm = ({ image }: { image: string }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Create a post
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/create", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          notifications.show({
            title: "Error Creating New Post",
            message: error.response?.data.message,
            color: "red",
          });
        }
        setLoading(false);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        setTitle("");
        setLoading(false);
        notifications.show({
          title: "Post Created Successfully",
          message: "Timeline updated automatically",
          color: "green",
        });
      },
    }
  );

  const createPostHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      mutate(title);
    } catch (error) {
      throw new Error("Error Creating new post");
    }
  };

  return (
    <form
      onSubmit={createPostHandler}
      action=""
      className="bg-dark-50 p-5 md:p-8 rounded-md"
    >
      <div className="flex items-center gap-5 mb-10">
        <Image
          src={image || ""}
          height={50}
          width={50}
          alt="User Image"
          className="rounded-full"
        />
        <textarea
          name="title"
          className="bg-dark-0 w-full p-3 md:p-4 rounded-3xl max-h-64"
          placeholder="What's in your mind?"
          rows={2}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-dark-0 ">
          <ImageIcon className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
          <Paperclip className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
          <MapPin className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
          <Smile className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
        </div>
        <CustomButton loading={loading} icon={<PlusCircle />}>
          Create Post
        </CustomButton>
      </div>
    </form>
  );
};

export default CreatePostForm;
