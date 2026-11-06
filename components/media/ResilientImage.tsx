"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ResilientImageProps = ImageProps & { fallbackLabel?: string };

export function ResilientImage({ alt, fallbackLabel = "Image unavailable", onError, ...props }: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="imageFallback" role="img" aria-label={`${alt}. ${fallbackLabel}`}><span>{fallbackLabel}</span></div>;
  }

  return <Image {...props} alt={alt} onError={(event) => { setFailed(true); onError?.(event); }} />;
}
