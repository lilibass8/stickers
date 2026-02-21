'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  width?: number
  height?: number
}

export default function ProductImage({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
  width,
  height,
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Placeholder SVG for missing images
  const placeholder = (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-velora-primary/20 to-velora-secondary/20">
      <svg
        className="h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  )

  if (hasError) {
    return <>{placeholder}</>
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        onError={() => setHasError(true)}
      />
    )
  } else if (width && height) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => setHasError(true)}
      />
    )
  } else {
    return <>{placeholder}</>
  }
}
