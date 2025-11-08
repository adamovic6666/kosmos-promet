"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ProductDetails.module.css";
import LightGallery from "@/app/_components/ui/LightGallery";
import CustomSwiper from "@/app/_components/ui/CustomSwiper";
import Image from "next/image";
import { ProductDetailsProps } from "@/app/_types";

const ProductDetails = ({ productDetails }: ProductDetailsProps) => {
  const mainPhoto = productDetails.main_photo || "";
  const updatedAt = productDetails.media_updated_at || 0;
  const mainImage = `${process.env.NEXT_PUBLIC_API_URL}${mainPhoto}${
    mainPhoto.includes("?") ? "&" : "?"
  }t=${updatedAt}`;

  const isNew = productDetails.is_new;
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Create an array that includes the main image plus the gallery images
  // Make sure to properly handle YouTube URLs by preserving them exactly as they are
  const allGalleryImages = [
    productDetails.main_photo,
    ...productDetails.photo_gallery.orig.map((item: string) => {
      // For YouTube links, use them directly without prefixing with API URL
      if (
        typeof item === "string" &&
        (item.includes("youtube.com") || item.includes("youtu.be"))
      ) {
        return item;
      }
      // For site images, keep as is (will be prefixed in the LightGallery component)
      return item;
    }),
  ];
  const leftSide = useRef<HTMLDivElement>(null);
  const rightSide = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState<number | null>(
    null,
  );

  // For opening the additional images
  const openGallery = (index: number) => {
    // Add 1 to account for the main image at index 0
    setCurrentImageIndex(index + 1);
    setIsGalleryOpen(true);
  };

  // Special handler just for the main image
  const openMainImage = () => {
    setCurrentImageIndex(0);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        if (descriptionRef.current && rightSide.current && leftSide.current) {
          // Get the heights of left and right sides
          const leftSideHeight = leftSide.current.clientHeight;
          const rightSideWithoutDescription =
            rightSide.current.clientHeight -
            descriptionRef.current.scrollHeight;
          const deduction = !!productDetails.photo_gallery.thumb.length
            ? -18
            : 16;
          // Calculate available space for description
          const availableHeight =
            leftSideHeight - (rightSideWithoutDescription - deduction);

          // Set max height for description (minimum 100px to ensure some content is visible)
          const newHeight = Math.max(availableHeight, 30);
          setDescriptionHeight(newHeight);
        }
      } else {
        setDescriptionHeight(null);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it once to set the initial height

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [descriptionRef, rightSide, leftSide]);

  return (
    <section className={styles.productDetails}>
      <div className="container-small">
        <div className={styles.images} ref={leftSide}>
          <div
            className={styles.mainImage}
            onClick={openMainImage}
            role="button"
            tabIndex={0}
            aria-label="View main product image"
          >
            {isNew && <span className={styles.newBadge}>Novo</span>}
            <Image src={mainImage} alt="Product main view" fill />
          </div>
          {!!productDetails?.photo_gallery?.thumb.length && (
            <div className={styles.additionalImages}>
              <CustomSwiper
                images={productDetails.photo_gallery}
                onImageClick={openGallery}
                id="product-details-swiper"
              />
            </div>
          )}
        </div>
        <div className={styles.details} ref={rightSide}>
          <h1>{productDetails.title}</h1>
          {productDetails.product_code && (
            <p className={styles.productCode}>
              <span className="link-red">{productDetails.product_code}</span>
              <span>Šifra proizvoda</span>
            </p>
          )}
          <div
            ref={descriptionRef}
            className={styles.descriptionContainer}
            style={
              productDetails?.description
                ? {
                    maxHeight: `${descriptionHeight}px`,
                    overflowY: "auto",
                  }
                : undefined
            }
          >
            {productDetails?.description && (
              <div className={styles.description}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: productDetails?.description,
                  }}
                />
              </div>
            )}
            {productDetails?.tip_vozila && (
              <div>
                <p className={styles.bold}>Marka i model vozila:</p>
                <p>{productDetails?.tip_vozila}</p>
              </div>
            )}
            {productDetails?.fabric_number && (
              <div>
                <p className={styles.bold}>OEM Fabrički broj:</p>
                <p>{productDetails?.fabric_number}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <LightGallery
        media={allGalleryImages}
        isOpen={isGalleryOpen}
        currentIndex={currentImageIndex}
        onClose={closeGallery}
      />
    </section>
  );
};

export default ProductDetails;
