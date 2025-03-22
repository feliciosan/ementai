"use client";

import { CSSProperties, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import UploadService from "@/services/upload";

function ImageStorage({
  path,
  options,
}: {
  path: string;
  options: {
    alt: string;
    style?: CSSProperties;
    className?: string;
    width: number;
    height: number;
  };
}) {
  const { alt, ...rest } = options;

  const { data: downloadedImage } = useQuery({
    queryKey: ["get-file-url", path],
    queryFn: () => {
      return UploadService.getFileUrl(path);
    },
    initialData: null,
    enabled: !!path,
  });

  if (!downloadedImage) return null;

  return <Image src={downloadedImage || ""} alt={alt} {...rest} />;
}

export default memo(ImageStorage);
