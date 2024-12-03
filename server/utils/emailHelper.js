import nodemailer from "nodemailer";

const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.APP_NAME,
      pass: process.env.APP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.APP_NAME,
    to,
    subject,
    text
  })
};

export default sendMail;
