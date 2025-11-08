"use client";
import styles from "./ContactForm.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";

const schema = z.object({
  fullName: z.string().min(1, "Ime i prezime su obavezni"),
  email: z.string().email("Email nije validan"),
  reason: z.string().min(1, "Naslov poruke je obavezan"),
  message: z.string().min(1, "Poruka je obavezna"),
});
type FormData = z.infer<typeof schema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      reason: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      // Using EmailJS configuration from environment variables
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: data.fullName,
          email: data.email,
          subject: data.reason,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      if (response.status === 200) {
        setSubmitSuccess(true);
        reset();
      } else {
        setSubmitError(
          "Postoji problem prilikom slanja poruke. Molimo pokušajte ponovo.",
        );
      }
    } catch (error) {
      setSubmitError(
        "Postoji problem prilikom slanja poruke. Molimo pokušajte ponovo.",
      );
      console.error("EmailJS error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactForm}>
      <div className="container-small">
        <h2>Pišite nam</h2>
        <p>Tu smo za sva vaša pitanja!</p>
        <p> Pišite nam za više informacija o proizvodima i uslugama.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {submitSuccess && (
            <div
              style={{
                color: "green",
                marginBottom: "20px",
                padding: "10px",
                backgroundColor: "rgba(0, 255, 0, 0.1)",
                borderRadius: "4px",
              }}
            >
              Vaša poruka je uspešno poslata! Hvala Vam što ste nas
              kontaktirali.
            </div>
          )}

          {submitError && (
            <div
              style={{
                color: "red",
                marginBottom: "20px",
                padding: "10px",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                borderRadius: "4px",
              }}
            >
              {submitError}
            </div>
          )}
          <div className={styles.inputGroup}>
            <Input
              name="fullName"
              placeholder="Ime i prezime"
              control={control}
            />
            <Input
              name="email"
              placeholder="E-mail"
              control={control}
              type="email"
            />
          </div>

          <Select
            name="reason"
            label="Kako možemo da Vam pomognemo?"
            control={control}
          />
          <Input
            name="message"
            placeholder="Upišite Vašu poruku ovde"
            control={control}
            inputType="textarea"
          />
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Šaljem..." : "Pošalji"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
