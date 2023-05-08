"use client";

import { formatDistance } from "date-fns";
import { Clock, MoreVertical } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface PostCardProps {
  id: string;
  name: string;
  avatar: string;
  postTitle: string;
  comments: any;
  createdAt: any;
}

const PostCard: FC<PostCardProps> = ({
  id,
  name,
  avatar,
  postTitle,
  comments,
  createdAt,
}) => {
  const timestamp = formatDistance(new Date(createdAt), new Date());
  return (
    <div key={id} className="p-5 md:p-8 bg-dark-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src={avatar}
            alt="User Image"
            width={50}
            height={50}
          />
          <div className="flex flex-col gap-2">
            <span>{name}</span>
            <span className="flex items-center text-dark-0 gap-2">
              <Clock className="w-4 h-4" />
              {timestamp} ago
            </span>
          </div>
        </div>
        <div>
          <MoreVertical />
        </div>
      </div>
      <p className="mt-10">{postTitle}</p>
    </div>
  );
};

export default PostCard;
