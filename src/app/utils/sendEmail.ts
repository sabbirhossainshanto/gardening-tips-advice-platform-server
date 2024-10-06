import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'sabbirshnt@gmail.com',
      pass: 'tbqw thpm xgjv zelb',
    },
  });

  await transporter.sendMail({
    from: 'sabbirshnt@gmail.com',
    to: 'sabbirhossainshanto3@gmail.com',
    subject: 'Reset password!',
    text: 'Change your password within 10 minutes!',
    html,
  });
};
