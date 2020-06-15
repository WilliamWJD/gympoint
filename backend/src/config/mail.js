require("dotenv").config();

export default {
  host: "smtp.mailtrap.io",
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: "Equipe Gympoint <contato@gympoint.com.br>",
  },
};
