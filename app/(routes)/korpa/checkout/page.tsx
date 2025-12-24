"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/_context/CartContext";
import CheckoutForm from "@/app/_components/forms/CheckoutForm";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (cart.items.length === 0) {
      router.push("/korpa");
    }
  }, [cart.items.length, router]);

  // Don't render form if cart is empty
  if (cart.items.length === 0) {
    return null;
  }

  return <CheckoutForm />;
}
