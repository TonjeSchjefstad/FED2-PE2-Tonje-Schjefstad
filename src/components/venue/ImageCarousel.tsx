import { useState } from "react";
import type { Media } from "../../types/media";

interface ImageCarouselProps {
  images: Media[];
  alt: string;
}

/**
 * ImageCarousel component for displaying multiple images with navigation.
 * Shows previous/next buttons and dot indicators when multiple images are available.
 */
function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-100 rounded-xl overflow-hidden mb-8">
      <img
        src={images[currentImage]?.url}
        alt={images[currentImage]?.alt || alt}
        className="w-full h-full object-cover"
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
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  index === currentImage ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageCarousel;
