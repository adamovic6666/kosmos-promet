"use client";
import { useState, useEffect } from "react";
import styles from "./LightGallery.module.css";
import Image from "next/image";

interface LightGalleryProps {
  media: string[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
}

const LightGallery = ({
  media,
  isOpen,
  currentIndex,
  onClose,
}: LightGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose, media.length, activeIndex, currentIndex]);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const getYouTubeVideoId = (url: string): string => {
    if (url.includes("youtube.com/watch")) {
      return new URL(url).searchParams.get("v") || "";
    } else if (url.includes("youtube.com/shorts") || url.includes("youtu.be")) {
      const pathname = new URL(url).pathname;
      return pathname.split("/").pop() || "";
    }
    return "";
  };

  if (!isOpen) return null;

  const currentMedia = media[activeIndex];
  const isYouTubeVideo =
    typeof currentMedia === "string" &&
    (currentMedia.includes("youtube.com") || currentMedia.includes("youtu.be"));

  return (
    <div className={styles.lightgallery}>
      <div className={styles.backdrop} onClick={onClose}></div>

      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close gallery"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.galleryContent}>
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={goToPrev}
          aria-label="Previous image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.imageContainer}>
          {isYouTubeVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                currentMedia,
              )}`}
              className={styles.galleryVideo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              frameBorder="0"
              allowFullScreen
              style={{
                width: currentMedia.includes("youtube.com/shorts")
                  ? "auto"
                  : "100%",
                height: "100%",
                aspectRatio: currentMedia.includes("youtube.com/shorts")
                  ? "9/16"
                  : "16/9",
                border: "none",
                display: "block",
                maxHeight: "80vh",
                background: "#000",
              }}
              title={`Gallery video ${activeIndex + 1}`}
            />
          ) : currentMedia.startsWith("/sites") ? (
            <Image
              className={styles.galleryImage}
              src={process.env.NEXT_PUBLIC_API_URL + currentMedia}
              alt={`Gallery image ${activeIndex + 1}`}
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <Image
              className={styles.galleryImage}
              src={currentMedia}
              alt={`Gallery image ${activeIndex + 1}`}
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
          )}
        </div>

        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={goToNext}
          aria-label="Next image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6L15 12L9 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.counter}>
        {activeIndex + 1} / {media.length}
      </div>
    </div>
  );
};

export default LightGallery;
