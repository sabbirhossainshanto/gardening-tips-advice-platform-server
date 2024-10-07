import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: config.sender_email,
      pass: config.sender_app_password,
    },
  });
  const mailData = {
    from: config.sender_email,
    to,
    subject: 'Reset password!',
    text: 'Change your password within 10 minutes!',
    html,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};
