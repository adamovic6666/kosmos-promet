import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, reason, message } = body;

    // Email to Owner
    const contactEmailHtml = `
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
            .message-box { background-color: white; padding: 20px; margin: 15px 0; border-left: 3px solid #003366; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nova Poruka - Kosmos Promet</h1>
            </div>
            <div class="content">
              <div class="section">
                <h2>Podaci o pošiljaocu</h2>
                <div class="info-row"><span class="label">Ime i prezime:</span> ${fullName}</div>
                <div class="info-row"><span class="label">Email:</span> ${email}</div>
                <div class="info-row"><span class="label">Razlog kontakta:</span> ${reason}</div>
              </div>

              <div class="section">
                <h2>Poruka</h2>
                <div class="message-box">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Auto-reply email to customer
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #003366; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .greeting { font-size: 18px; margin-bottom: 20px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Hvala na poruci!</h1>
            </div>
            <div class="content">
              <div class="greeting">
                Poštovani/a ${fullName},
              </div>
              <p>Hvala što ste nas kontaktirali. Primili smo Vašu poruku i odgovorićemo u najkraćem mogućem roku.</p>

              <p><strong>Vaša poruka:</strong></p>
              <div style="background-color: white; padding: 15px; border-left: 3px solid #003366; margin: 15px 0;">
                ${message.replace(/\n/g, "<br>")}
              </div>

              <p>Ukoliko imate dodatnih pitanja, slobodno nas kontaktirajte.</p>
            </div>
            <div class="footer">
              <p>Kosmos Promet<br>
              Email: office@kosmospromet.com<br>
              Web: www.kosmospromet.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to owner
    await resend.emails.send({
      from: "Kosmos Promet <hello@kosmospromet.com>",
      to: ["office@kosmospromet.com"],
      subject: `Nova poruka od ${fullName} - ${reason}`,
      html: contactEmailHtml,
      replyTo: email, // Allow direct reply to customer
    });

    // Send auto-reply to customer
    await resend.emails.send({
      from: "Kosmos Promet <hello@kosmospromet.com>",
      to: [email],
      subject: "Potvrda prijema poruke - Kosmos Promet",
      html: autoReplyHtml,
      replyTo: 'office@kosmospromet.com',
    });

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending contact emails:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
