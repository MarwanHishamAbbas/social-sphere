"use client";

import { Menu } from "@mantine/core";
import axios from "axios";
import { Loader2, MoreVertical, Trash } from "lucide-react";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface PostOptionsProps {
  id: string;
}

const PostOptions: FC<PostOptionsProps> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(false);
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
    <Menu closeOnItemClick={false} width={200} shadow="md">
      <Menu.Target>
        <MoreVertical className="cursor-pointer" />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={deletePostHandler}
          icon={loading ? <Loader2 className="animate-spin" /> : <Trash />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default PostOptions;
