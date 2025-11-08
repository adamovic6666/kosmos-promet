"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./CustomSwiper.module.css";
import { Product } from "@/app/_types";
import Card from "../card/Card";
import Image from "next/image";
import PlayIcon from "@/app/_svg/PlayIcon";

type CustomSwiperProps = {
  products?: Product[];
  images?: {
    thumb: string[];
    orig: string[];
  };
  onImageClick?: (index: number) => void;
  imageBasePath?: string;
  id?: string;
};

const CustomSwiper = ({
  products,
  images,
  onImageClick,
  imageBasePath = process.env.NEXT_PUBLIC_API_URL,
  id = "swiper-" + Math.random().toString(36).substring(2, 9),
}: CustomSwiperProps) => {
  const showArrows =
    (products && products.length > 3) || (images && images.thumb.length > 3);

  const getYouTubeVideoId = (url: string): string => {
    if (url.includes("youtube.com/watch")) {
      return new URL(url).searchParams.get("v") || "";
    } else if (url.includes("youtube.com/shorts")) {
      const pathname = new URL(url).pathname;
      return pathname.split("/").pop() || "";
    } else if (url.includes("youtu.be")) {
      return url.split("youtu.be/")[1].split("?")[0];
    }
    return "";
  };

  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        navigation={{
          nextEl: `.arrow-right-${id}`,
          prevEl: `.arrow-left-${id}`,
        }}
        autoHeight={true}
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            spaceBetween: images ? 16 : 24,
          },
        }}
      >
        {products &&
          products.map((product) => (
            <SwiperSlide key={product.name}>
              <Card
                image={product.image}
                name={product.name || product.title || "no name"}
                alias={product.alias}
              />
            </SwiperSlide>
          ))}

        {images &&
          images.thumb.map((media, index) => {
            const origMedia = images.orig[index];
            const isYoutube =
              typeof origMedia === "string" &&
              (origMedia.includes("youtube.com") ||
                origMedia.includes("youtu.be"));

            return (
              <SwiperSlide key={index}>
                <div
                  role="button"
                  tabIndex={isYoutube ? -1 : 0}
                  aria-label={`View product media ${index + 2}`}
                  className={`${styles.imageSlide} ${
                    isYoutube ? styles.youtubeSlide : ""
                  }`}
                  style={{
                    position: "relative",
                    paddingBottom: "100%" /* Creates 1:1 aspect ratio */,
                    height: "0",
                    cursor: "pointer",
                  }}
                  onClick={() => onImageClick && onImageClick(index)}
                >
                  {isYoutube ? (
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        background: "#000",
                        opacity: 1,
                      }}
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                          origMedia
                        )}/hqdefault.jpg`}
                        alt={`YouTube video thumbnail ${index + 2}`}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                      />
                      <div className={styles.playButton}>
                        <PlayIcon />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={imageBasePath + media}
                      alt={`Product view ${index + 2}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      {showArrows && (
        <div className={styles.navigationButtons}>
          <button
            className={`${styles.arrowLeft} ${
              images ? styles.arrowLeftImages : ""
            }`}
          >
            <svg
              className={`arrow-left-${id}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#3c3c3c"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className={`${styles.arrowRight} ${
              images ? styles.arrowRightImages : ""
            }`}
          >
            <svg
              className={`arrow-right-${id}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#3c3c3c"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomSwiper;
