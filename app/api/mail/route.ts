import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@/utils/supabase/server";
import VerifyEmailTemplate from "../../../emails/VerifyEmailTemplate";
import { render } from "@react-email/render";

export async function POST(request: Request) {

  try {
    const data = await request.json();
    const email = data.email;

    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      console.error("Missing Zoho SMTP credentials");
      return new NextResponse("Server misconfiguration: Missing environment variables", { status: 500 });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Store OTP in Supabase
    const supabase = await createClient();

    // First, delete any existing entry for the email
    const { data: existing, error: fetchError } = await supabase
    .from("otps")
    .select("email")
    .eq("email", email)
    .single(); // Fetch a single result (if exists)

    if (fetchError) {
      console.error("Error fetching existing OTP entry:", fetchError.message);
    } else if (existing) {
    // If the entry exists, delete it
      const { error: deleteError } = await supabase
        .from("otps")
        .delete()
        .eq("email", email);
      
      if (deleteError) {
        console.error("Error deleting existing OTP entry:", deleteError.message);
      }
    }

    // Now insert the new OTP entry
    const { error } = await supabase.from("otps").upsert([
    { email, otp, expires_at: expiresAt }
    ]);

    if (error) {
    console.error("Error storing OTP:", error.message);
    return new NextResponse("Error storing OTP", { status: 500 });
    }

    // Configure Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: "smtppro.zoho.in", // Correct Zoho SMTP server
      port: 465,               // Use SSL port (465), or use 587 for TLS
      secure: true,            // Use true for SSL
      auth: {
        user: process.env.ZOHO_EMAIL,  // Your Zoho email address
        pass: process.env.ZOHO_PASSWORD,  // Your Zoho password or app-specific password if 2FA is enabled
      },
    });    

    // Render the React email template to HTML (await the promise)
    const htmlContent = await render(VerifyEmailTemplate({ verificationCode: otp }));

    // Send the email
    const mailOptions = {
      from: 'LegalReferencer <noreply@legalreferencer.site>',
      to: email,
      subject: "Verify Email",
      html: htmlContent, // Use the resolved HTML string
    };

    try {
      const sendmaildata = await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, message: "Email sent successfully" });
    } catch (sendError) {
      // Detailed error logging
      console.error("Error sending email:", sendError);
      console.error("Error response:", sendError.response); // Logs more details about the authentication issue
      return new NextResponse("Error sending email", { status: 500 });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return new NextResponse("Error sending email", { status: 500 });
  }
}
