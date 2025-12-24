import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  name: string;
  productCode: string;
  quantity: number;
  price: string;
  total: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      note,
      orderItems,
      total,
      itemCount,
    } = body;

    // Email to Owner
    const ownerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #003366; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .section { margin-bottom: 20px; }
            .section h2 { color: #003366; border-bottom: 2px solid #003366; padding-bottom: 10px; }
            .info-row { padding: 8px 0; }
            .label { font-weight: bold; color: #003366; }
            .order-item { background-color: white; padding: 15px; margin: 10px 0; border-left: 3px solid #003366; }
            .total { background-color: #003366; color: white; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nova Porudžbina - Kosmos Promet</h1>
            </div>
            <div class="content">
              <div class="section">
                <h2>Podaci o kupcu</h2>
                <div class="info-row"><span class="label">Ime i prezime:</span> ${fullName}</div>
                <div class="info-row"><span class="label">Email:</span> ${email}</div>
                <div class="info-row"><span class="label">Telefon:</span> ${phone}</div>
                <div class="info-row"><span class="label">Adresa:</span> ${address}</div>
                <div class="info-row"><span class="label">Grad:</span> ${city}</div>
                <div class="info-row"><span class="label">Poštanski broj:</span> ${postalCode}</div>
                ${note ? `<div class="info-row"><span class="label">Napomena:</span> ${note}</div>` : ""}
              </div>

              <div class="section">
                <h2>Detalji porudžbine</h2>
                ${orderItems
                  .map(
                    (item: OrderItem) => `
                  <div class="order-item">
                    <div><strong>${item.name}</strong></div>
                    <div>Šifra: ${item.productCode}</div>
                    <div>Količina: ${item.quantity}</div>
                    <div>Cena: ${item.price} RSD</div>
                    <div><strong>Ukupno: ${item.total} RSD</strong></div>
                  </div>
                `
                  )
                  .join("")}
              </div>

              <div class="total">
                Ukupan broj artikala: ${itemCount} | UKUPNO: ${total} RSD
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email to Customer (Confirmation)
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #003366; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .section { margin-bottom: 20px; }
            .greeting { font-size: 18px; margin-bottom: 20px; }
            .order-item { background-color: white; padding: 15px; margin: 10px 0; border-left: 3px solid #003366; }
            .total { background-color: #003366; color: white; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Hvala na porudžbini!</h1>
            </div>
            <div class="content">
              <div class="greeting">
                Poštovani/a ${fullName},
              </div>
              <p>Hvala što ste se opredelili za Kosmos Promet. Vaša porudžbina je uspešno primljena i biće obrađena u najkraćem mogućem roku.</p>

              <div class="section">
                <h2>Pregled Vaše porudžbine:</h2>
                ${orderItems
                  .map(
                    (item: OrderItem) => `
                  <div class="order-item">
                    <div><strong>${item.name}</strong></div>
                    <div>Šifra: ${item.productCode}</div>
                    <div>Količina: ${item.quantity}</div>
                    <div>Cena: ${item.price} RSD</div>
                    <div><strong>Ukupno: ${item.total} RSD</strong></div>
                  </div>
                `
                  )
                  .join("")}
              </div>

              <div class="total">
                UKUPNO ZA PLAĆANJE: ${total} RSD
              </div>

              <div class="section">
                <h3>Podaci za dostavu:</h3>
                <p>
                  ${fullName}<br>
                  ${address}<br>
                  ${city}, ${postalCode}<br>
                  Telefon: ${phone}
                </p>
              </div>

              <p>Naš tim će Vas kontaktirati u vezi dostave i načina plaćanja.</p>
            </div>
            <div class="footer">
              <p>Kosmos Promet<br>
              Email: info@kosmospromet.com<br>
              Web: www.kosmospromet.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to owner
    await resend.emails.send({
      from: "Kosmos Promet <onboarding@resend.dev>",
      to: ["slobodansimic82@gmail.com"], // Replace with your actual email
      subject: `Nova porudžbina od ${fullName}`,
      html: ownerEmailHtml,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Kosmos Promet <onboarding@resend.dev>",
      to: [email],
      subject: "Potvrda porudžbine - Kosmos Promet",
      html: customerEmailHtml,
    });

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
