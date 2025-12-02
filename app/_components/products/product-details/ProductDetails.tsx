"use client";
import { useRef, useState } from "react";
import styles from "./ProductDetails.module.css";
import LightGallery from "@/app/_components/ui/LightGallery";
import CustomSwiper from "@/app/_components/ui/CustomSwiper";
import Image from "next/image";
import { ProductDetailsProps } from "@/app/_types";
import { useCart } from "@/app/_context/CartContext";
import OrderSection from "./OrderSection";

const ProductDetails = ({ productDetails }: ProductDetailsProps) => {
  const mainPhoto = productDetails.main_photo || "";
  const updatedAt = productDetails.media_updated_at || 0;
  const mainImage = `${process.env.NEXT_PUBLIC_API_URL}${mainPhoto}${
    mainPhoto.includes("?") ? "&" : "?"
  }t=${updatedAt}`;

  const { addToCart } = useCart();

  // Helper function to format price with comma instead of period
  const formatPrice = (price: string) => {
    return price?.replace(/\./g, ",");
  };
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

  const handleOrder = (quantity: number) => {
    const priceString = productDetails.akcijska_cena || productDetails.cena;

    const productId = productDetails.product_code
      ? productDetails.product_code.split("").reduce((acc, char) => {
          return acc + char.charCodeAt(0);
        }, 0)
      : 0;

    addToCart(
      {
        productId,
        name: productDetails.title,
        image: productDetails.main_photo,
        price: priceString,
        productCode: productDetails.product_code,
        slug: "",
        categorySlug: "",
        subcategorySlug: "",
      },
      quantity
    );
  };

  return (
    <section className={styles.productDetails}>
      <div className="container-medium">
        <div className={styles.productGrid}>
          <div className={styles.imageSection}>
            <div className={styles.images} ref={leftSide}>
              <div
                className={styles.mainImage}
                onClick={openMainImage}
                role="button"
                tabIndex={0}
                aria-label="View main product image"
              >
                {isNew && <span className={styles.newBadge}>Novo</span>}
                {mainImage && (
                  <Image src={mainImage} alt="Product main view" fill />
                )}{" "}
              </div>
            </div>
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
          <div className={styles.details} ref={rightSide}>
            {productDetails.product_code && (
              <p className={styles.productCode}>
                <span className="link-red">{productDetails.product_code}</span>
                <span>Šifra proizvoda</span>
              </p>
            )}
            <h2>{productDetails.title}</h2>
            <OrderSection
              price={productDetails.cena}
              discountPrice={productDetails.akcijska_cena}
              formatPrice={formatPrice}
              onOrder={handleOrder}
            />
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
