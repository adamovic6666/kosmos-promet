"use client";
import styles from "./CheckoutForm.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useCart } from "@/app/_context/CartContext";
import { formatPrice } from "@/app/utils/format-price";

const schema = z.object({
  fullName: z.string().min(1, "Ime i prezime su obavezni"),
  email: z.string().email("Email nije validan"),
  phone: z.string().min(1, "Broj telefona je obavezan"),
  address: z.string().min(1, "Adresa je obavezna"),
  city: z.string().min(1, "Grad je obavezan"),
  postalCode: z.string().min(1, "Poštanski broj je obavezan"),
  paymentMethod: z.enum(["bank_transfer", "cash_on_delivery"], {
    required_error: "Molimo izaberite način plaćanja",
  }),
  note: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const CheckoutForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { cart } = useCart();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      paymentMethod: "cash_on_delivery",
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

      const DELIVERY_COST = 660;
      const subtotal = cart.total;
      const totalWithDelivery = subtotal + DELIVERY_COST;

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
          paymentMethod: data.paymentMethod,
          note: data.note,
          orderItems,
          subtotal: subtotal.toLocaleString("sr-RS"),
          deliveryCost: DELIVERY_COST.toLocaleString("sr-RS"),
          total: totalWithDelivery.toLocaleString("sr-RS"),
          itemCount: cart.itemCount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Order submission failed:", errorData);
        throw new Error(errorData.error || "Failed to send order");
      }

      const result = await response.json();
      console.log("Order result:", result);
      const orderNumber = result.orderNumber;

      if (!orderNumber) {
        throw new Error("Order number not received");
      }

      console.log("Redirecting to:", `/korpa/checkout/uspesno?order=${orderNumber}`);

      // Redirect to success page - cart will be cleared there
      window.location.href = `/korpa/checkout/uspesno?order=${encodeURIComponent(orderNumber)}`;
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

              <div className={styles.paymentMethodSection}>
                <h3>Izaberite način plaćanja</h3>
                <div className={styles.paymentOptions}>
                  <label className={styles.paymentOption}>
                    <input
                      type="radio"
                      value="cash_on_delivery"
                      {...control.register("paymentMethod")}
                      defaultChecked
                    />
                    <div className={styles.paymentDetails}>
                      <span className={styles.paymentTitle}>
                        Plaćanje pouzećem
                      </span>
                      <span className={styles.paymentDescription}>
                        Plaćanje kuriru prilikom preuzimanja pošiljke
                      </span>
                    </div>
                  </label>

                  <label className={styles.paymentOption}>
                    <input
                      type="radio"
                      value="bank_transfer"
                      {...control.register("paymentMethod")}
                    />
                    <div className={styles.paymentDetails}>
                      <span className={styles.paymentTitle}>
                        Plaćanje preko računa
                      </span>
                      <span className={styles.paymentDescription}>
                        Uplatom na tekući račun prodavca
                      </span>
                    </div>
                  </label>
                </div>
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

            <div className={styles.summaryRow}>
              <span>Međuzbir:</span>
              <span>{cart.total.toLocaleString("sr-RS")} RSD</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Troškovi isporuke:</span>
              <span>{(660).toLocaleString("sr-RS")} RSD</span>
            </div>

            <div className={styles.summaryTotal}>
              <span>Ukupno:</span>
              <span>{(cart.total + 660).toLocaleString("sr-RS")} RSD</span>
            </div>

            <div className={styles.vatNote}>
              <small>* PDV uračunat u cenu</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
