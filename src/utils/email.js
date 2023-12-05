import nodemailer from "nodemailer";

export async function sendEmail(to, subject, html) {
  const { NODEMAILER_PASS, NODEMAILER_EMAIL } = process.env;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: NODEMAILER_EMAIL,
      pass: NODEMAILER_PASS,
    }
  });
  const info = await transporter.sendMail({
    from: "Levi to Ahmed",
    to,
    subject,
    html,
  })
  return info;
}