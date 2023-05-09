"use client";

import { Button, Divider, Menu } from "@mantine/core";
import { formatDistance } from "date-fns";
import { useMutation, useQueryClient } from "react-query";
import {
  Clock,
  Delete,
  MessageCircle,
  MoreVertical,
  Share,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import axios from "axios";

interface PostCardProps {
  id: string;
  name: string;
  avatar: string;
  postTitle: string;
  comments: any;
  createdAt: any;
  image: string;
  email: string;
}

const PostCard: FC<PostCardProps> = ({
  id,
  name,
  avatar,
  postTitle,
  comments,
  email,
  image,
  createdAt,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const timestamp = formatDistance(new Date(createdAt), new Date());
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("getAuthPosts");
      },
    }
  );

  const deletePostHandler = () => {
    try {
      setLoading(true);
      mutate(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={id}
      className="p-5 md:p-8  bg-dark-50 border-dark-0 border-[1px] rounded-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src={avatar}
            alt="User Image"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <span>{name}</span>
            <span className="text-sm text-dark-0 mb-2 mt-1">{email}</span>
            <span className="flex items-center text-dark-0 gap-2 text-base">
              <Clock className="w-4 h-4" />
              {timestamp} ago
            </span>
          </div>
        </div>
      </div>
      <p className="my-10">{postTitle}</p>
      <Button.Group>
        <Button
          variant="default"
          className="flex-1 border-none transition-all"
          leftIcon={<ThumbsUp />}
        >
          Like
        </Button>
        <Button
          variant="default"
          className="flex-1 border-none transition-all"
          leftIcon={<MessageCircle />}
        >
          Comment
        </Button>
        <Button
          loading={loading}
          variant="default"
          className="flex-1 border-none transition-all"
          leftIcon={<Share />}
        >
          Share
        </Button>
      </Button.Group>
      <Divider my={10} />

      {image && (
        <form className="flex items-center gap-5 mt-5">
          <Image
            src={image || ""}
            height={50}
            width={50}
            alt="User Image"
            className="rounded-full"
          />
          <input
            name="comment"
            className="bg-dark-0 w-full p-3 md:p-4 rounded-3xl max-h-32"
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </form>
      )}
    </div>
  );
};

export default PostCard;
