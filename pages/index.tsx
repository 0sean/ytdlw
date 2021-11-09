import { useEffect, useState } from "react";
import { SoftwareDownload } from "../components/icons/SoftwareDownload";
import { SpinnerTwo } from "../components/icons/SpinnerTwo";
import { InfoResponse } from "./api/info";
import Image from "next/image";

export default function Index() {
  const [inputValue, setInputValue] = useState("");
  const [validURL, setValidURL] = useState(false);
  const [infoSearching, setInfoSearching] = useState(false);
  const [videoFound, setVideoFound] = useState(false);
  const [video, setVideo] = useState({} as InfoResponse);

  useEffect(() => {
    if (
      inputValue.startsWith("https://www.youtube.com/watch?v=") &&
      inputValue.length > 32
    ) {
      setValidURL(true);
    } else {
      setValidURL(false);
    }
  }, [inputValue]);

  return (
    <>
      <a
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-2 font-prompt text-gray-500 hover:text-black transition-colors"
        href="https://github.com/anidox"
      >
        A project by Anidox.
      </a>
      <div className="flex flex-col h-screen justify-center items-center text-center gap-y-8 font-prompt">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl font-semibold">ytdlw</h1>
          <p className="text-lg">An open-source YouTube downloader</p>
        </div>
        {!videoFound ? (
          <div className="flex">
            <input
              type="text"
              placeholder="Enter a YouTube URL"
              className={
                validURL
                  ? "w-80 border-none bg-gray-200 rounded-l-md placeholder-gray-500 font-medium p-3"
                  : "w-80 border-none bg-gray-200 rounded-md placeholder-gray-500 font-medium p-3"
              }
              value={inputValue}
              onChange={(v) => {
                setInputValue(v.target.value);
              }}
            />
            {validURL && (
              <button
                className={
                  infoSearching
                    ? "flex items-center gap-x-2 bg-red-400 text-white p-3 rounded-r-md"
                    : "flex items-center gap-x-2 bg-red-500 text-white p-3 rounded-r-md"
                }
                onClick={() => {
                  setInfoSearching(true);
                  fetch(`/api/info?url=${inputValue}`).then((r) => {
                    r.json().then((j) => {
                      setVideo(j);
                      setVideoFound(true);
                    });
                  });
                }}
              >
                {infoSearching ? <SpinnerTwo /> : <SoftwareDownload />} Download
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-x-4 bg-gray-100 rounded-md p-3">
            <div className="pb-2">
              <p
                className="text-xs text-gray-500"
                onClick={() => {
                  setInputValue("");
                  setValidURL(false);
                  setInfoSearching(false);
                  setVideoFound(false);
                }}
              >
                back
              </p>
              <h1 className="font-semibold text-xl">{video.title}</h1>
              <p>by {video.author}</p>
              <Image
                src={video.thumbnail}
                width="168"
                height="94"
                className="rounded-md"
                alt="Video thumbnail"
              />
            </div>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              {video.formats.map((f) => {
                return (
                  <div className="flex items-center gap-x-2" key={f.url}>
                    <p>
                      {f.qualityLabel} ({f.container})
                    </p>
                    <a
                      className="flex items-center gap-x-2 bg-red-500 text-white p-2 text-sm rounded-md"
                      href={f.url}
                    >
                      <SoftwareDownload /> Download
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
