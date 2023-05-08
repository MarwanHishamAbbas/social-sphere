import { db } from "@/lib/db";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Get Posts
    try {
      const result = await db.post.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ err: "Error has occured fetching the post" });
    }
  }
}
