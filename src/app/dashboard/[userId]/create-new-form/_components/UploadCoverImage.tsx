"use client";
import { useState } from "react";
import { SingleImageDropzone } from "~/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZOD, z } from "~/lib/ZOD";

import { useEdgeStore } from "~/lib/edgeStore/edgestore";
import useReduxFormSlice from "~/hooks/useReduxFormSlice";
import { useResizeObserver } from "@mantine/hooks";

export const create = ({ defaultImageUrl }: { defaultImageUrl?: string }) => {
  const { addImageUrl } = useReduxFormSlice();
  const [file, setFile] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const [ref, bound] = useResizeObserver();
  const { setValue } = useForm<{ coverImageUrl: string }>({
    resolver: zodResolver(z.string().min(1)),
    defaultValues: {
      coverImageUrl: defaultImageUrl,
    },
  });

  if (imageUrl) {
    setValue("coverImageUrl", imageUrl);
  }
  return (
    <div ref={ref} className=" relative aspect-video max-w-full pb-2 ">
      <SingleImageDropzone
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 2,
        }}
        height={bound.height}
        width={bound.width}
        value={file}
        onChange={async (file) => {
          if (!file) return;
          setFile(file);
          await edgestore.publicFiles
            .upload({
              file,
              options: {
                temporary: true,
              },
              onProgressChange: setProgress,
            })
            .then((res) => {
              if (res.url) {
                console.log(res);
                setImageUrl(res.url);
                addImageUrl(res.url);
              }
            })
            .catch((err) => console.log(err));
        }}
      />

      <div className=" flex h-[12px] w-full items-center justify-center">
        {progress !== 0 && (
          <span className=" relative h-2 w-full overflow-hidden rounded-full border-2 border-black">
            <div
              className=" absolute left-0 top-0 h-full  bg-primary  transition-[width] "
              style={{
                width: `${progress}%`,
                backgroundColor: progress === 100 ? "lime" : "",
              }}
            />
          </span>
        )}
        {progress === 0 && file && (
          <p className=" not-prose text-sm">loading...</p>
        )}
      </div>
    </div>
  );
};
export default create;
