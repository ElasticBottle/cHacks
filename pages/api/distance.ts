import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const loc = req.body.location;

  res.status(200).json({ name: "John Doe" });
}
