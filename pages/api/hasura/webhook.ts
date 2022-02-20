import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req", req);
  return res.status(200).json({
    "X-Hasura-Role": "reader",
    "X-Hasura-User-Id": "1",
  });
}
