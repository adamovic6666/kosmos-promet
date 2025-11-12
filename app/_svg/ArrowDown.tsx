import React from "react";

interface ArrowDownProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
}

const ArrowDown = ({ 
  width = 24, 
  height = 24, 
  strokeWidth = 2,
  className 
}: ArrowDownProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowDown;