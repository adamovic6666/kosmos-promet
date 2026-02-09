"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./InteractiveImage.module.css";

interface ProductInDot {
  name: string;
  productCode: string;
  image: string;
  link: string;
}

interface DotPosition {
  x: number;
  y: number;
}

interface Dot {
  position: DotPosition;
  products: ProductInDot[];
}

interface HotpostImage {
  src: string;
  aspectRatio: string;
  dots: Dot[];
}

interface InteractiveImageProps {
  images: HotpostImage[];
  categoryTitle?: string;
  noTitle?: boolean;
}

const InteractiveImage = ({
  images,
  categoryTitle,
  noTitle,
}: InteractiveImageProps) => {
  const [activeDot, setActiveDot] = useState<Dot | null>(null);
  const [activeDotImageIndex, setActiveDotImageIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [modalPosition, setModalPosition] = useState<{ left: string; top: string } | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Set isMobile only on client side to avoid hydration mismatch
    const checkMobile = () => {
      setIsMobile(globalThis.window.innerWidth <= 768);
    };

    checkMobile();
    globalThis.window.addEventListener("resize", checkMobile);

    return () => {
      globalThis.window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleDotClick = (dot: Dot, imageIndex: number) => {
    setActiveDot(dot);
    setActiveDotImageIndex(imageIndex);

    // Calculate modal position relative to the specific image element
    if (!isMobile && imageRefs.current[imageIndex]) {
      const imageElement = imageRefs.current[imageIndex];
      if (imageElement) {
        const imageRect = imageElement.getBoundingClientRect();
        const imageWrapper = imageElement.parentElement;

        if (imageWrapper) {
          const wrapperRect = imageWrapper.getBoundingClientRect();

          // Calculate absolute position within the wrapper
          const dotXInImage = (dot.position.x / 100) * imageRect.width;
          const dotYInImage = (dot.position.y / 100) * imageRect.height;

          const absoluteLeft = imageRect.left - wrapperRect.left + dotXInImage;
          const absoluteTop = imageRect.top - wrapperRect.top + dotYInImage;

          // Convert back to percentages relative to wrapper
          const leftPercent = (absoluteLeft / wrapperRect.width) * 100;
          const topPercent = (absoluteTop / wrapperRect.height) * 100;

          setModalPosition({
            left: `${leftPercent}%`,
            top: `${topPercent}%`,
          });
        }
      }
    }
  };

  const handleCloseModal = () => {
    setActiveDot(null);
    setModalPosition(null);
  };

  const handleDotKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    dot: Dot,
    imageIndex: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleDotClick(dot, imageIndex);
    }
  };

  // Helper function to construct product image URL with API prefix
  const constructImageUrl = (imagePath: string) => {
    // If image is already a full URL or starts with /images (local public folder), return as-is
    if (
      imagePath.startsWith("http") ||
      imagePath.startsWith("/images/") ||
      imagePath.startsWith("/public/")
    ) {
      return imagePath;
    }

    // For API images, add the API URL prefix
    return `${process.env.NEXT_PUBLIC_API_URL}${imagePath}`;
  };

  // Generate unique ID for products swiper navigation
  const productsSwiperId = activeDot
    ? `products-${activeDot.position.x.toString().replace(".", "_")}-${activeDot.position.y.toString().replace(".", "_")}`
    : "products-default";

  return (
    <div className={styles.interactiveDiagram}>
      <div className="container-medium">
        {!noTitle && categoryTitle && (
          <h3 className={styles.title}>{categoryTitle}</h3>
        )}

        <div className={styles.imageWrapper}>
          {images.map((imageData, idx) => {
            const baseAlt = categoryTitle || "Interactive diagram";
            const imageAlt = images.length > 1 ? `${baseAlt} - Image ${idx + 1}` : baseAlt;

            return (
              <div
                key={`${imageData.src}-${idx}`}
                ref={(el) => {
                  imageRefs.current[idx] = el;
                }}
                className={styles.image}
                style={{ aspectRatio: imageData.aspectRatio }}
              >
                <Image
                  src={imageData.src}
                  alt={imageAlt}
                  fill
                  style={{ objectFit: "contain" }}
                />
                <div className={styles.dotsOverlay}>
                  {imageData.dots.map((dot, dotIdx) => (
                    <button
                      key={`dot-${dot.position.x}-${dot.position.y}-${dotIdx}`}
                      className={styles.dot}
                      style={{
                        left: `${dot.position.x}%`,
                        top: `${dot.position.y}%`,
                      }}
                      onClick={() => handleDotClick(dot, idx)}
                      onKeyDown={(e) => handleDotKeyDown(e, dot, idx)}
                      aria-label={`View products at position ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {activeDot && (
            <>
              <button
                className={styles.modalBackdrop}
                onClick={handleCloseModal}
                onKeyDown={(e) => {
                  if (e.key === "Escape") handleCloseModal();
                }}
                aria-label="Close modal"
              />
              <div
                className={styles.modal}
                style={
                  isMobile
                    ? {}
                    : modalPosition || {
                        left: `${activeDot.position.x}%`,
                        top: `${activeDot.position.y}%`,
                      }
                }
              >
                <button
                  className={styles.closeButton}
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className={styles.modalContent}>
                  {activeDot.products.length === 1 ? (
                    <div className={styles.singleProduct}>
                      {activeDot.products[0].image && (
                        <div className={styles.modalImage}>
                          <Image
                            src={constructImageUrl(activeDot.products[0].image)}
                            alt={activeDot.products[0].name}
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      )}
                      <div className={styles.modalInfo}>
                        <h3>{activeDot.products[0].name}</h3>
                        <Link
                          href={`/${activeDot.products[0].link}`}
                          className={styles.viewProductBtn}
                        >
                          Saznaj više
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.multipleProducts}>
                      <Swiper
                        modules={[Navigation]}
                        navigation={{
                          nextEl: `.arrow-right-${productsSwiperId}`,
                          prevEl: `.arrow-left-${productsSwiperId}`,
                        }}
                        spaceBetween={0}
                        slidesPerView={1}
                      >
                        {activeDot.products.map((product, idx) => (
                          <SwiperSlide
                            key={`product-${product.productCode}-${idx}`}
                          >
                            <div className={styles.singleProduct}>
                              {product.image && (
                                <div className={styles.modalImage}>
                                  <Image
                                    src={constructImageUrl(product.image)}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              )}
                              <div className={styles.modalInfo}>
                                <h3>{product.name}</h3>
                                <Link
                                  href={`/${product.link}`}
                                  className={styles.viewProductBtn}
                                >
                                  Saznaj više
                                </Link>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      <div className={styles.productsNavigationButtons}>
                        <button
                          className={`${styles.arrowLeft} arrow-left-${productsSwiperId}`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 18L9 12L15 6"
                              stroke="currentColor"
                              strokeWidth="5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          className={`${styles.arrowRight} arrow-right-${productsSwiperId}`}
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
                              strokeWidth="5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {!isMobile && <div className={styles.modalPointer}></div>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveImage;
