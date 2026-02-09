"use client";

import InteractiveImage from "./InteractiveImage";
import hotpostsData from "../../../public/data/hotposts.json";

interface HotpostItem {
  sifra: string;
  image: string;
  additionalImage?: string;
  category: string;
  aspectRatio: string;
  forProductCode?: string[];
  forAdditionalImageProductCode?: string[];
  dots?: Array<{
    position: { x: number; y: number };
    products: Array<{
      name: string;
      productCode: string;
      image: string;
      link: string;
    }>;
  }>;
  additionalDots?: Array<{
    position: { x: number; y: number };
    products: Array<{
      name: string;
      productCode: string;
      image: string;
      link: string;
    }>;
  }>;
}

interface ProductHotpostProps {
  readonly productCode: string;
  readonly noTitle?: boolean;
}

export default function ProductHotpost({
  productCode,
  noTitle,
}: Readonly<ProductHotpostProps>) {
  // Find hotpost that includes this product code (in either forProductCode or forAdditionalImageProductCode)
  const matchingHotpost = (hotpostsData as HotpostItem[]).find((item) => {
    const inMainProducts = item.forProductCode?.includes(productCode);
    const inAdditionalProducts =
      item.forAdditionalImageProductCode?.includes(productCode);

    // Must be in at least one of the product code arrays
    // And must have at least one set of dots (main or additional)
    return (
      (inMainProducts || inAdditionalProducts) &&
      ((item.dots && item.dots.length > 0) ||
        (item.additionalDots && item.additionalDots.length > 0))
    );
  });

  if (!matchingHotpost) {
    return null;
  }

  // Prepare images array based on which product code array the product is in
  const images = [];

  // If product is in forProductCode, add main image with main dots
  if (matchingHotpost.forProductCode?.includes(productCode)) {
    images.push({
      src: matchingHotpost.image,
      aspectRatio: matchingHotpost.aspectRatio,
      dots: matchingHotpost.dots || [],
    });
  }

  // If product is in forAdditionalImageProductCode, add additional image with additionalDots
  if (
    matchingHotpost.additionalImage &&
    matchingHotpost.forAdditionalImageProductCode?.includes(productCode)
  ) {
    images.push({
      src: matchingHotpost.additionalImage,
      aspectRatio: matchingHotpost.aspectRatio,
      dots: matchingHotpost.additionalDots || [],
    });
  }

  // Get category title for display
  const categoryTitles: Record<string, string> = {
    "regulatori-A": "Rezervni delovi za regulatore serije A",
    "regulatori-PR1": "Rezervni delovi za regulatore serije PR1",
    "regulatori-PR3": "Rezervni delovi za regulatore serije PR3",
    injektori: "Rezervni delovi za injektore",
    sifoni: "Rezervni delovi za sifone",
    "pumpa-BM-60-30": "Rezervni delovi za pumpu BM 65/30",
    "pumpa-MP-60": "Rezervni delovi za pumpu MP 60",
    "pumpa-MP-25": "Rezervni delovi za pumpu MP 25",
  };

  const categoryTitle = categoryTitles[matchingHotpost.category];

  return (
    <InteractiveImage
      images={images}
      categoryTitle={categoryTitle}
      noTitle={noTitle}
    />
  );
}
