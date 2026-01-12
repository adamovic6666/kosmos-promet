"use client";
import styles from "./CheckoutForm.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useCart } from "@/app/_context/CartContext";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/app/utils/format-price";

const schema = z.object({
  fullName: z.string().min(1, "Ime i prezime su obavezni"),
  email: z.string().email("Email nije validan"),
  phone: z.string().min(1, "Broj telefona je obavezan"),
  address: z.string().min(1, "Adresa je obavezna"),
  city: z.string().min(1, "Grad je obavezan"),
  postalCode: z.string().min(1, "Poštanski broj je obavezan"),
  note: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const CheckoutForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      note: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Prepare order items for email
      const orderItems = cart.items.map((item) => ({
        name: item.name,
        productCode: item.productCode,
        quantity: item.quantity,
        price: formatPrice(item.price),
        total: formatPrice(
          (Number.parseFloat(item.price) * item.quantity).toFixed(2)
        ),
      }));

      // Send request to API route
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          note: data.note,
          orderItems,
          total: cart.total.toLocaleString("sr-RS"),
          itemCount: cart.itemCount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send order");
      }

      const result = await response.json();
      const orderNumber = result.orderNumber;

      // Clear cart and redirect to success page with order number
      clearCart();
      reset();
      router.push(
        `/korpa/checkout/uspesno?order=${encodeURIComponent(orderNumber)}`
      );
    } catch (error) {
      setSubmitError(
        "Postoji problem prilikom slanja porudžbine. Molimo pokušajte ponovo."
      );
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.checkoutForm}>
      <div className="container-medium">
        <div className={styles.formWrapper}>
          <div className={styles.formSection}>
            <h2>Podaci za dostavu</h2>
            <p>
              Molimo popunite sve neophodne podatke za dostavu Vaše porudžbine.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {submitError && (
                <div className={styles.errorMessage}>{submitError}</div>
              )}

              <div className={styles.inputGroup}>
                <Input
                  name="fullName"
                  placeholder="Ime i prezime *"
                  control={control}
                />
                <Input
                  name="email"
                  placeholder="E-mail *"
                  control={control}
                  type="email"
                />
              </div>

              <Input
                name="phone"
                placeholder="Broj telefona *"
                control={control}
                type="tel"
              />

              <Input name="address" placeholder="Adresa *" control={control} />

              <div className={styles.inputGroup}>
                <Input name="city" placeholder="Grad *" control={control} />
                <Input
                  name="postalCode"
                  placeholder="Poštanski broj *"
                  control={control}
                />
              </div>

              <Input
                name="note"
                placeholder="Napomena (opciono)"
                control={control}
                inputType="textarea"
              />

              <Button disabled={isSubmitting}>
                {isSubmitting ? "Šaljem..." : "Potvrdi porudžbinu"}
              </Button>
            </form>
          </div>

          <div className={styles.orderSummary}>
            <h2>Pregled porudžbine</h2>

            <div className={styles.orderItems}>
              {cart.items.map((item) => (
                <div key={item.productId} className={styles.orderItem}>
                  <div className={styles.itemDetails}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemCode}>Šifra: {item.productCode}</p>
                    <p className={styles.itemQuantity}>
                      Količina: {item.quantity}
                    </p>
                  </div>
                  <p className={styles.itemPrice}>
                    {formatPrice(
                      (Number.parseFloat(item.price) * item.quantity).toFixed(2)
                    )}{" "}
                    RSD
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.summaryRow}>
              <span>Broj artikala:</span>
              <span>{cart.itemCount}</span>
            </div>

            <div className={styles.summaryTotal}>
              <span>Ukupno:</span>
              <span>{cart.total.toLocaleString("sr-RS")} RSD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
