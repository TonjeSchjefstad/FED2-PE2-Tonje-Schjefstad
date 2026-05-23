import { useState } from "react";
import type { Media } from "../../types/media";

interface ImageCarouselProps {
  images: Media[];
  alt: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1529686159790-3246c5082afb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

/**
 * ImageCarousel component for displaying multiple images with navigation.
 * Shows previous/next buttons and dot indicators when multiple images are available.
 * Falls back to a default image if no images are provided or if an image fails to load.
 */
function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-100 rounded-xl overflow-hidden mb-8">
        <img
          src={FALLBACK_IMAGE}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-100 rounded-xl overflow-hidden mb-8"
      role="region"
      aria-label="Venue images"
    >
      <img
        src={images[currentImage].url}
        alt={images[currentImage].alt || alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentImage((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={() =>
              setCurrentImage((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors cursor-pointer"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentImage ? "true" : undefined}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  index === currentImage ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageCarousel;
