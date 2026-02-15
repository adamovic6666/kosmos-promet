import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { readFileSync } from "fs";
import { join } from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  name: string;
  productCode: string;
  quantity: number;
  price: string;
  total: string;
}

// Function to generate PDF for warehouse using pdf-lib with Serbian character support
async function generateWarehousePDF(
  orderNumber: string,
  fullName: string,
  address: string,
  city: string,
  postalCode: string,
  phone: string,
  paymentMethod: string,
  orderItems: OrderItem[],
  subtotal: string,
  deliveryCost: string,
  total: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  // Register fontkit to support custom fonts
  pdfDoc.registerFontkit(fontkit);

  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const { width, height } = page.getSize();

  // Load custom fonts with Serbian character support (DejaVu Sans)
  const fontPath = join(process.cwd(), "public", "fonts");
  const boldFontBytes = readFileSync(join(fontPath, "DejaVu-Bold.ttf"));
  const regularFontBytes = readFileSync(join(fontPath, "DejaVu-Regular.ttf"));

  const boldFont = await pdfDoc.embedFont(boldFontBytes);
  const regularFont = await pdfDoc.embedFont(regularFontBytes);

  let yPosition = height - 50;

  // Company Header - Properly centered
  const companyName = "KOSMOS PROMET D.O.O.";
  const companyNameWidth = boldFont.widthOfTextAtSize(companyName, 20);
  page.drawText(companyName, {
    x: (width - companyNameWidth) / 2,
    y: yPosition,
    size: 20,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  yPosition -= 20;

  const companyAddress = "Golubina\u010Dka 28, 22320 In\u0111ija";
  const addressWidth = regularFont.widthOfTextAtSize(companyAddress, 10);
  page.drawText(companyAddress, {
    x: (width - addressWidth) / 2,
    y: yPosition,
    size: 10,
    font: regularFont,
  });
  yPosition -= 15;

  const contact = "T/F: 022 557 651 | M: 063 647 205";
  const contactWidth = regularFont.widthOfTextAtSize(contact, 10);
  page.drawText(contact, {
    x: (width - contactWidth) / 2,
    y: yPosition,
    size: 10,
    font: regularFont,
  });
  yPosition -= 15;

  const taxInfo = "PIB: 100699233 | MB: 08546100";
  const taxInfoWidth = regularFont.widthOfTextAtSize(taxInfo, 10);
  page.drawText(taxInfo, {
    x: (width - taxInfoWidth) / 2,
    y: yPosition,
    size: 10,
    font: regularFont,
  });
  yPosition -= 30;

  // Document Title - Properly centered
  const docTitle = "NALOG ZA MAGACIN";
  const docTitleWidth = boldFont.widthOfTextAtSize(docTitle, 16);
  page.drawText(docTitle, {
    x: (width - docTitleWidth) / 2,
    y: yPosition,
    size: 16,
    font: boldFont,
  });
  yPosition -= 30;

  // Order Number Box
  page.drawRectangle({
    x: 50,
    y: yPosition - 30,
    width: 495,
    height: 35,
    color: rgb(0, 0, 0.4),
  });
  page.drawText(`PORUDŽBINA: ${orderNumber}`, {
    x: width / 2 - 90,
    y: yPosition - 20,
    size: 14,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  yPosition -= 50;

  // Customer Information Box
  page.drawRectangle({
    x: 50,
    y: yPosition - 90,
    width: 495,
    height: 90,
    color: rgb(1, 0.95, 0.8),
    borderColor: rgb(1, 0.76, 0),
    borderWidth: 2,
  });

  page.drawText("PODACI O KUPCU", {
    x: 60,
    y: yPosition - 15,
    size: 12,
    font: boldFont,
    color: rgb(0.52, 0.39, 0.02),
  });

  page.drawText(`Ime i prezime: ${fullName}`, {
    x: 60,
    y: yPosition - 35,
    size: 10,
    font: regularFont,
  });

  page.drawText(`Adresa: ${address}, ${city}, ${postalCode}`, {
    x: 60,
    y: yPosition - 50,
    size: 10,
    font: regularFont,
  });

  page.drawText(`Telefon: ${phone}`, {
    x: 60,
    y: yPosition - 65,
    size: 10,
    font: regularFont,
  });

  yPosition -= 110;

  // Payment Method Box
  page.drawRectangle({
    x: 50,
    y: yPosition - 25,
    width: 495,
    height: 25,
    color: rgb(0.82, 0.93, 0.94),
    borderColor: rgb(0.05, 0.33, 0.38),
    borderWidth: 2,
  });

  const paymentText = `NAČIN PLAĆANJA: ${paymentMethod === "cash_on_delivery" ? "POUZEĆEM" : "UPLATOM NA RAČUN"}`;
  page.drawText(paymentText, {
    x: 60,
    y: yPosition - 17,
    size: 11,
    font: boldFont,
    color: rgb(0.05, 0.33, 0.38),
  });

  yPosition -= 50;

  // Products Table Title
  page.drawText("PROIZVODI ZA PRIPREMU:", {
    x: 50,
    y: yPosition,
    size: 12,
    font: boldFont,
  });
  yPosition -= 25;

  // Table Header
  page.drawRectangle({
    x: 50,
    y: yPosition - 20,
    width: 495,
    height: 20,
    color: rgb(0, 0, 0.4),
  });

  page.drawText("Šifra", {
    x: 55,
    y: yPosition - 15,
    size: 10,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  page.drawText("Naziv proizvoda", {
    x: 135,
    y: yPosition - 15,
    size: 10,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  page.drawText("Kol.", {
    x: 445,
    y: yPosition - 15,
    size: 10,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  page.drawText("[ ]", {
    x: 508,
    y: yPosition - 15,
    size: 10,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  yPosition -= 20;

  // Table Rows
  orderItems.forEach((item, index) => {
    const rowColor = index % 2 === 0 ? rgb(0.97, 0.98, 0.98) : rgb(1, 1, 1);
    page.drawRectangle({
      x: 50,
      y: yPosition - 25,
      width: 495,
      height: 25,
      color: rowColor,
      borderColor: rgb(0, 0, 0),
      borderWidth: 0.5,
    });

    // Product Code
    page.drawText(item.productCode, {
      x: 55,
      y: yPosition - 17,
      size: 9,
      font: boldFont,
    });

    // Product Name (truncate if too long)
    const productName =
      item.name.length > 45 ? item.name.substring(0, 42) + "..." : item.name;
    page.drawText(productName, {
      x: 135,
      y: yPosition - 17,
      size: 9,
      font: regularFont,
    });

    // Quantity
    page.drawText(item.quantity.toString(), {
      x: 450,
      y: yPosition - 17,
      size: 11,
      font: boldFont,
    });

    // Checkbox
    page.drawRectangle({
      x: 505,
      y: yPosition - 20,
      width: 15,
      height: 15,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    yPosition -= 25;
  });

  yPosition -= 20;

  // Cost Summary with proper alignment
  const labelX = 360;
  const valueX = 520;

  page.drawText("Međuzbir:", {
    x: labelX,
    y: yPosition,
    size: 10,
    font: boldFont,
  });
  const subtotalText = `${subtotal} RSD`;
  const subtotalWidth = regularFont.widthOfTextAtSize(subtotalText, 10);
  page.drawText(subtotalText, {
    x: valueX - subtotalWidth,
    y: yPosition,
    size: 10,
    font: regularFont,
  });

  page.drawText("Troškovi isporuke:", {
    x: labelX,
    y: yPosition - 15,
    size: 10,
    font: boldFont,
  });
  const deliveryText = `${deliveryCost} RSD`;
  const deliveryWidth = regularFont.widthOfTextAtSize(deliveryText, 10);
  page.drawText(deliveryText, {
    x: valueX - deliveryWidth,
    y: yPosition - 15,
    size: 10,
    font: regularFont,
  });

  // Draw separator line
  page.drawLine({
    start: { x: 350, y: yPosition - 25 },
    end: { x: 545, y: yPosition - 25 },
    thickness: 2,
    color: rgb(0, 0, 0.4),
  });

  page.drawText("UKUPNO:", {
    x: labelX,
    y: yPosition - 40,
    size: 12,
    font: boldFont,
  });
  const totalText = `${total} RSD`;
  const totalWidth = boldFont.widthOfTextAtSize(totalText, 12);
  page.drawText(totalText, {
    x: valueX - totalWidth,
    y: yPosition - 40,
    size: 12,
    font: boldFont,
  });

  yPosition -= 60;

  // Payment Instructions Box
  page.drawRectangle({
    x: 50,
    y: yPosition - 40,
    width: 495,
    height: 40,
    borderColor: rgb(0, 0, 0),
    borderWidth: 2,
  });

  page.drawText("Način plaćanja:", {
    x: 60,
    y: yPosition - 20,
    size: 10,
    font: boldFont,
  });

  const paymentInstructions =
    paymentMethod === "cash_on_delivery"
      ? `POUZEĆEM - Iznos za naplatu kuriru: ${total} RSD`
      : "UPLATOM - Roba se šalje nakon potvrde uplate";

  page.drawText(paymentInstructions, {
    x: 60,
    y: yPosition - 35,
    size: 9,
    font: regularFont,
  });

  yPosition -= 90;

  // Signature Fields
  page.drawText("Pripremio: ___________________", {
    x: 50,
    y: yPosition,
    size: 9,
    font: regularFont,
  });
  page.drawText("Datum: ___________________", {
    x: 220,
    y: yPosition,
    size: 9,
    font: regularFont,
  });
  page.drawText("Potpis: ___________________", {
    x: 390,
    y: yPosition,
    size: 9,
    font: regularFont,
  });

  // Footer - Properly centered
  const footerText = "Ovaj dokument je automatski generisan iz sistema Kosmos Promet";
  const footerWidth = regularFont.widthOfTextAtSize(footerText, 8);
  page.drawText(footerText, {
    x: (width - footerWidth) / 2,
    y: 30,
    size: 8,
    font: regularFont,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
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
      paymentMethod,
      note,
      orderItems,
      subtotal,
      deliveryCost,
      total,
    } = body;

    // Split full name into first and last name
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Prepare order data for backend API
    const backendOrderData = {
      customer: {
        email,
        first_name: firstName,
        last_name: lastName,
        billing_address: {
          country_code: "RS",
          address_line1: address,
          locality: city,
          postal_code: postalCode,
          given_name: firstName,
          family_name: lastName,
        },
        shipping_address: {
          country_code: "RS",
          address_line1: address,
          locality: city,
          postal_code: postalCode,
          given_name: firstName,
          family_name: lastName,
          phone_number: phone,
        },
      },
      products: orderItems.map((item: OrderItem) => ({
        product_id: item.productCode,
        quantity: item.quantity,
      })),
    };

    // Submit order to backend API
    const backendResponse = await fetch(
      `${process.env.BASE_URL}/api/v1/orders?cc=${process.env.API_HASH}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendOrderData),
      }
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      console.error("Backend order creation failed:", errorData);
      throw new Error("Failed to create order in backend system");
    }

    const backendResult = await backendResponse.json();
    const orderNumber = backendResult.order_number;

    if (!orderNumber) {
      throw new Error("Order number not received from backend");
    }

    // Logo URL (update this to match your production domain)
    const logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://kosmos-promet.vercel.app"}/images/logo.svg`;

    // Email to Owner (with print-ready format)
    const ownerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; }

            .header-top {
              background-color: #f8f9fa;
              border-bottom: 3px solid #000066;
              padding: 20px 30px;
              overflow: hidden;
            }
            .logo-section {
              float: left;
              width: 45%;
            }
            .logo {
              max-width: 120px;
              height: auto;
              display: block;
            }
            .company-info {
              float: right;
              width: 50%;
              text-align: right;
              font-size: 11px;
              line-height: 1.6;
              color: #333;
            }
            .company-info strong { display: block; font-size: 12px; margin-bottom: 3px; font-weight: bold; }

            .order-header { background-color: #006; color: white; padding: 20px 40px; text-align: center; }
            .order-header h1 { margin: 0; font-size: 24px; }

            .order-number { background-color: #4267b0; color: white; padding: 15px 40px; text-align: center; font-size: 18px; font-weight: bold; }

            .content { padding: 30px 40px; }

            .section { margin-bottom: 30px; }
            .section h2 { color: #000066; font-size: 18px; border-bottom: 2px solid #4267b0; padding-bottom: 8px; margin-bottom: 15px; }

            .customer-info { background-color: #fff3cd; border: 2px solid #ffc107; padding: 15px 20px; border-radius: 6px; margin-bottom: 20px; }
            .customer-info p { margin: 5px 0; }

            .payment-method { background-color: #e7f3ff; border: 2px solid #0066cc; padding: 15px 20px; border-radius: 6px; margin: 15px 0; font-weight: bold; color: #0c5460; }

            .product-list { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .product-list th { background-color: #000066; color: white; padding: 12px; text-align: left; font-weight: 600; }
            .product-list td { padding: 10px 12px; border-bottom: 1px solid #e0e0e0; }
            .product-list tr:last-child td { border-bottom: none; }
            .product-list tr:nth-child(even) { background-color: #f8f9fa; }

            .cost-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 15px; }
            .cost-row.subtotal { border-top: 1px solid #e0e0e0; padding-top: 15px; margin-top: 10px; }
            .cost-row.total { border-top: 2px solid #000066; padding-top: 15px; margin-top: 10px; font-size: 20px; font-weight: bold; color: #000066; }

            .footer { background-color: #000066; color: white; padding: 20px 40px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header-top">
              <div class="logo-section">
                <img src="${logoUrl}" alt="Kosmos Promet Logo" class="logo" />
              </div>
              <div class="company-info">
                <strong>Kosmos Promet d.o.o.</strong>
                Golubina\u010Dka 28<br>
                22320 In\u0111ija<br>
                T/F: 022 557 651<br>
                M: 063 647 205<br>
                PIB: 100699233<br>
                MB: 08546100
              </div>
            </div>

            <div class="order-header">
              <h1>NOVA PORUDŽBINA</h1>
            </div>

            <div class="order-number">
              Porudžbina #${orderNumber}
            </div>

            <div class="content">
              <!-- Customer Information -->
              <div class="customer-info">
                <h3 style="margin-top: 0; color: #856404;">PODACI O KUPCU</h3>
                <p><strong>Ime i prezime:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefon:</strong> ${phone}</p>
                <p><strong>Adresa:</strong> ${address}, ${city}, ${postalCode}</p>
                ${note ? `<p><strong>Napomena:</strong> ${note}</p>` : ""}
              </div>

              <!-- Payment Method -->
              <div class="payment-method">
                NAČIN PLAĆANJA: ${paymentMethod === "cash_on_delivery" ? "POUZEĆE" : "UPLATA NA RAČUN"}
              </div>

              <!-- Order Details -->
              <div class="section">
                <h2>SADRŽAJ PORUDŽBINE</h2>
                <table class="product-list">
                  <thead>
                    <tr>
                      <th>Šifra</th>
                      <th>Proizvod</th>
                      <th style="text-align: center;">Količina</th>
                      <th style="text-align: right;">Ukupno</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${orderItems
                      .map(
                        (item: OrderItem) => `
                      <tr>
                        <td><strong>${item.productCode}</strong></td>
                        <td>${item.name}</td>
                        <td style="text-align: center;">${item.quantity}</td>
                        <td style="text-align: right;">${item.total} RSD</td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>

                <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                  <tr style="border-top: 1px solid #e0e0e0;">
                    <td style="padding: 12px 10px; text-align: right; font-size: 15px; font-weight: 600; color: #333;">Međuzbir:</td>
                    <td style="padding: 12px 10px; text-align: right; font-size: 15px; color: #333; width: 150px;">${subtotal} RSD</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 10px; text-align: right; font-size: 15px; font-weight: 600; color: #333;">Troškovi isporuke:</td>
                    <td style="padding: 12px 10px; text-align: right; font-size: 15px; color: #333;">${deliveryCost} RSD</td>
                  </tr>
                  <tr style="border-top: 2px solid #000066;">
                    <td style="padding: 15px 10px; text-align: right; font-size: 20px; font-weight: bold; color: #000066;">UKUPNO ZA NAPLATU:</td>
                    <td style="padding: 15px 10px; text-align: right; font-size: 20px; font-weight: bold; color: #000066;">${total} RSD</td>
                  </tr>
                </table>
              </div>

              <!-- PDF Attachment Note -->
              <div style="background-color: #e7f3ff; border: 2px solid #0066cc; padding: 20px; margin: 30px 0; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #0066cc;">
                  <strong>📎 Prilog:</strong> Nalog za magacin je priložen kao PDF dokument.<br>
                  Preuzmite i odštampajte ga za pripremu pošiljke.
                </p>
              </div>
            </div>

            <div class="footer">
              <p>Ova porudžbina je automatski generisana iz sistema Kosmos Promet</p>
              <p style="font-size: 11px; margin-top: 10px;">PDF prilog sadrži detalje za magacin i pripremu pošiljke</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Payment instructions based on payment method
    const paymentInstructions =
      paymentMethod === "cash_on_delivery"
        ? `
      <div class="payment-instructions cod">
        <h3>Plaćanje: Pouzećem</h3>
        <p>Iznos navedene porudžbine plaćate kuriru prilikom preuzimanja pošiljke.</p>
      </div>
    `
        : `
      <div class="payment-instructions bank">
        <h3>Plaćanje: Uplatom na račun</h3>
        <p>Molimo Vas da uplatu izvršite prema sledećim podacima:</p>
        <p style="margin-left: 20px;">
          <strong>Broj računa:</strong> 160-135842-47<br>
          <strong>Poziv na broj:</strong> ${orderNumber}
        </p>
        <p><em>Roba će biti poslata nakon evidentirane uplate.</em></p>
      </div>
    `;

    // Email to Customer (Confirmation)
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; }

            .header-top {
              background-color: #f8f9fa;
              border-bottom: 3px solid #000066;
              padding: 20px 30px;
              overflow: hidden;
            }
            .logo-section {
              float: left;
              width: 45%;
            }
            .logo {
              max-width: 120px;
              height: auto;
              display: block;
            }
            .company-info {
              float: right;
              width: 50%;
              text-align: right;
              font-size: 11px;
              line-height: 1.6;
              color: #333;
            }
            .company-info strong { display: block; font-size: 12px; margin-bottom: 3px; font-weight: bold; }

            .order-header { background-color: #000066; color: white; padding: 20px 40px; text-align: center; }
            .order-header h1 { margin: 0; font-size: 24px; }

            .order-number { background-color: #4267b0; color: white; padding: 15px 40px; text-align: center; font-size: 18px; font-weight: bold; }

            .content { padding: 30px 40px; }

            .section { margin-bottom: 30px; }
            .section h2 { color: #000066; font-size: 18px; border-bottom: 2px solid #4267b0; padding-bottom: 8px; margin-bottom: 15px; }

            .product-list { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .product-list th { background-color: #f8f9fa; padding: 12px; text-align: left; border-bottom: 2px solid #000066; font-weight: 600; }
            .product-list td { padding: 10px 12px; border-bottom: 1px solid #e0e0e0; }
            .product-list tr:last-child td { border-bottom: none; }

            .cost-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 15px; }
            .cost-row.subtotal { border-top: 1px solid #e0e0e0; padding-top: 15px; margin-top: 10px; }
            .cost-row.total { border-top: 2px solid #000066; padding-top: 15px; margin-top: 10px; font-size: 20px; font-weight: bold; color: #000066; }

            .vat-note { text-align: right; font-size: 12px; color: #666; font-style: italic; margin-top: 8px; }

            .payment-instructions { background-color: #f8f9fa; border: 2px solid #4267b0; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .payment-instructions h3 { color: #000066; margin-top: 0; margin-bottom: 12px; font-size: 16px; }
            .payment-instructions p { margin: 8px 0; }
            .payment-instructions.cod { border-color: #28a745; }
            .payment-instructions.bank { border-color: #4267b0; }

            .delivery-info { background-color: #f8f9fa; padding: 15px 20px; border-radius: 6px; }
            .delivery-info p { margin: 5px 0; }

            .terms { font-size: 13px; color: #666; line-height: 1.8; padding: 20px; background-color: #f8f9fa; border-radius: 6px; }
            .terms h3 { color: #000066; font-size: 15px; margin-top: 0; }

            .footer { background-color: #000066; color: white; padding: 25px 40px; text-align: center; }
            .footer p { margin: 5px 0; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header with Logo and Company Info -->
            <div class="header-top">
              <div class="logo-section">
                <img src="${logoUrl}" alt="Kosmos Promet Logo" class="logo" />
              </div>
              <div class="company-info">
                <strong>Kosmos Promet d.o.o.</strong>
                Golubina\u010Dka 28<br>
                22320 In\u0111ija<br>
                T/F: 022 557 651<br>
                M: 063 647 205<br>
                PIB: 100699233<br>
                MB: 08546100
              </div>
            </div>

            <!-- Order Title -->
            <div class="order-header">
              <h1>Vaša porudžbina je uspešno primljena!</h1>
            </div>

            <!-- Order Number -->
            <div class="order-number">
              Porudžbina #${orderNumber}
            </div>

            <!-- Main Content -->
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 20px;">Poštovani/a <strong>${fullName}</strong>,</p>
              <p>Hvala što ste se opredelili za Kosmos Promet. Vaša porudžbina je uspešno primljena i biće obrađena u najkraćem mogućem roku.</p>

              <!-- Order Items -->
              <div class="section">
                <h2>Sadržaj porudžbine</h2>
                <table class="product-list">
                  <thead>
                    <tr>
                      <th>Šifra</th>
                      <th>Proizvod</th>
                      <th style="text-align: center;">Količina</th>
                      <th style="text-align: right;">Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${orderItems
                      .map(
                        (item: OrderItem) => `
                      <tr>
                        <td>${item.productCode}</td>
                        <td><strong>${item.name}</strong></td>
                        <td style="text-align: center;">${item.quantity}</td>
                        <td style="text-align: right;">${item.total} RSD</td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>

                <!-- Cost Summary -->
                <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                  <tr style="border-top: 1px solid #e0e0e0;">
                    <td style="padding: 12px 10px; text-align: right; font-size: 15px; font-weight: 600; color: #333;">Međuzbir:</td>
                    <td style="padding: 12px 10px; text-align: right; font-size: 15px; color: #333; width: 150px;">${subtotal} RSD</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 10px; text-align: right; font-size: 15px; font-weight: 600; color: #333;">Troškovi isporuke:</td>
                    <td style="padding: 12px 10px; text-align: right; font-size: 15px; color: #333;">${deliveryCost} RSD</td>
                  </tr>
                  <tr style="border-top: 2px solid #000066;">
                    <td style="padding: 15px 10px; text-align: right; font-size: 20px; font-weight: bold; color: #000066;">UKUPNO:</td>
                    <td style="padding: 15px 10px; text-align: right; font-size: 20px; font-weight: bold; color: #000066;">${total} RSD</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 10px; text-align: right; font-size: 12px; color: #666; font-style: italic;">* PDV uračunat u cenu</td>
                  </tr>
                </table>
              </div>

              <!-- Payment Instructions -->
              ${paymentInstructions}

              <!-- Delivery Information -->
              <div class="section">
                <h2>Podaci za isporuku</h2>
                <div class="delivery-info">
                  <p><strong>${fullName}</strong></p>
                  <p>${address}</p>
                  <p>${city}, ${postalCode}</p>
                  <p>Telefon: ${phone}</p>
                  ${note ? `<p style="margin-top: 10px;"><strong>Napomena:</strong> ${note}</p>` : ""}
                </div>
              </div>

              <!-- Terms and Conditions -->
              <div class="terms">
                <h3>Uslovi plaćanja i isporuke</h3>
                <p>Cene svih proizvoda izražene su u dinarima (RSD) i uključuju PDV.</p>
                <p>Plaćanje se vrši uplatom na tekući račun prodavca ili pouzećem prilikom preuzimanja pošiljke. U slučaju plaćanja putem uplate na račun, roba se šalje nakon evidentirane uplate.</p>
                <p>Isporuku vrši kurirska služba na adresu navedenu u porudžbini. Troškovi isporuke su fiksni i iznose 660 RSD po porudžbini i dodaju se na ukupnu vrednost poručene robe. Kupac prilikom preuzimanja plaća ukupan iznos naveden u porudžbini, bez dodatnih troškova.</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p style="font-size: 16px; margin-bottom: 10px;"><strong>Srdačan pozdrav,</strong></p>
              <p><strong>Kosmos Promet d.o.o.</strong></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Generate PDF for warehouse
    const pdfBytes = await generateWarehousePDF(
      orderNumber,
      fullName,
      address,
      city,
      postalCode,
      phone,
      paymentMethod,
      orderItems,
      subtotal,
      deliveryCost,
      total
    );

    // Convert Uint8Array to Buffer for email attachment
    const pdfBuffer = Buffer.from(pdfBytes);

    // Send email to owner (for testing, sending to customer as well)
    await resend.emails.send({
      from: "Kosmos Promet <onboarding@resend.dev>",
      to: [email], // Sending to customer for testing - change to ["slobodansimic82@gmail.com"] for production
      subject: `[ZA PRODAVCA] Nova porudžbina #${orderNumber} - ${fullName}`,
      html: ownerEmailHtml,
      attachments: [
        {
          filename: `Porudzbina-${orderNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Kosmos Promet <onboarding@resend.dev>",
      to: [email],
      subject: "Kosmos Promet | Vaša porudžbina je uspešno primljena!",
      html: customerEmailHtml,
    });

    return NextResponse.json(
      { message: "Emails sent successfully", orderNumber },
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
