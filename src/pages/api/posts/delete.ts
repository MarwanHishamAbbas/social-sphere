import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." });
  }
  if (req.method === "POST") {
    const postId = req.body.id;
    console.log(postId);
    try {
      const result = await db.post.delete({
        where: {
          id: postId,
        },
      });

      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(403)
        .json({ err: "Error has occured while deleting a post" });
    }
  }
}
