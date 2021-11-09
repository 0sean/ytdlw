import type { NextApiRequest, NextApiResponse } from "next";
import ytdl, { videoFormat } from "ytdl-core";

export type InfoResponse = {
  title?: string;
  author?: string;
  thumbnail?: string;
  formats?: {
    url: string;
    qualityLabel: videoFormat["qualityLabel"];
    container: videoFormat["container"];
  }[];
  error?: string;
};

export default async function Info(
  req: NextApiRequest,
  res: NextApiResponse<InfoResponse>
) {
  if (!req.query.url || typeof req.query.url != "string") {
    return res.status(400).json({ error: "Incorrect or no URL provided." });
  } else if (!req.query.url.startsWith("https://www.youtube.com/watch?v=")) {
    return res.status(400).json({ error: "Incorrect URL provided." });
  }

  const info = await ytdl.getInfo(req.query.url as string);
  res.status(200).json({
    title: info.videoDetails.title,
    author: info.videoDetails.author.name,
    // url, qualityLabel, container
    formats: info.formats
      .filter((f) => f.hasAudio && f.hasVideo)
      .map((f) => {
        return {
          url: f.url,
          qualityLabel: f.qualityLabel,
          container: f.container,
        };
      }),
    thumbnail: info.videoDetails.thumbnails[0].url,
  });
}
