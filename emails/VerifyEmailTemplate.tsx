import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerifyEmailProps {
  verificationCode?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

//const otp = Math.floor(100000 + Math.random() * 900000).toString();

export default function VerifyEmailTemplate({
  verificationCode = '524867',
}: VerifyEmailProps ) {

  
  return (
    <Html>
      <Head >
      <link
          href="https://fonts.googleapis.com/css2?family=Ysabeau+Infant&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>Legal Referencer Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
          <Section style={logoContainer}>
            <div style={{
              display: "flex", // Ensure text is aligned correctly
              justifyContent: "center",
              alignItems: "center", // Vertically center the text with the image
              fontSize: "1.5rem", // text-2xl equivalent
              fontFamily: "Ysabeau, sans-serif", // Add fallback font
              fontWeight: "bold",
              margin: 0, // Remove default margins for proper alignment
            }}>
            <Img
              src="https://res.cloudinary.com/djexwlr3s/image/upload/v1739443018/nuz93f8apxfu5iuqkgtg.jpg" //Image can be added directly go through react email doc
              width="40"
              height="40"
              alt="Justice Lady"
              style={{ marginLeft: "10px", marginRight: "5px" }}  // Add space between image and text
            />
              Legal Referencer
            </div>
          </Section>

            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Thanks for starting with the Legal Referencer. We
                want to make sure it's really you. So, please enter the following
                verification code when prompted. If you don&apos;t want to
                create an account, you can ignore this message.
              </Text>
              <Section style={verificationSection}>
                <Text style={{...verifyText, textAlign: "center"}}>Verification code</Text>

                <Text style={{...codeText, textAlign: "center"}}>{verificationCode}</Text>
                <Text style={{...validityText, textAlign: "center"}}>
                  (This code is valid for 5 minutes)
                </Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Legal Referencer will never email you and ask you to disclose
                or verify your password, credit card, or banking account number.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif, 'Ysabeau' ",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif, 'Ysabeau' ",
  fontSize: "14px",
  margin: "24px 0",
};

const logoContainer = {
  display: "flex",
  marginTop: "32px",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px", textAlign: "justify" as const, textJustify: "inter-word" as const };

const lowerSection = { padding: "25px 35px" };

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  display: "flex",
  flexDirection: "column" as const, // Stack items vertically
  alignItems: "center", // Horizontally center the content
  justifyContent: "center", // Vertically center the content
  textAlign: "center" as const, // Make sure text is centered
  width: "100%",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
