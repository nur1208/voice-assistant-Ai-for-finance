import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export default async function sendEmail(options) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   console.log("here");

  // const testAccount = await nodemailer.createTestAccount();
  // console.log({ testAccount });

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "k3qolz2fkc5upqoc@ethereal.email", // generated ethereal user
      pass: "6fgvF5uHpt7Z5pwNNG", // generated ethereal password
    },
  });

  // let transporter = nodemailer.createTransport({
  //   service: "smtp.163.com",
  //   host: "smtp.163.com",

  //   // auth: {
  //   //   type: "OAuth2",
  //   //   user: process.env.MAIL_USERNAME,
  //   //   pass: process.env.MAIL_PASSWORD,
  //   //   clientId: process.env.OAUTH_CLIENTID,
  //   //   clientSecret: process.env.OAUTH_CLIENT_SECRET,
  //   //   refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  //   // },

  //   auth: {
  //     user: process.env.MAIL_USERNAME_163,
  //     pass: process.env.MAIL_PASSWORD_163,
  //     // credentials: process.env.ACCESS_TOKEN_163,
  //     // accessToken: process.env.ACCESS_TOKEN_163,
  //   },
  //   // requireTLS: true,

  //   port: 465,
  //   // secure: true,
  //   // proxy: "http://127.0.0.1:9999",
  // });
  // // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: options.email, // list of receivers
    subject: options.message, // Subject line
    text: options.message,
    // html, // plain text body
  });

  // eslint-disable-next-line no-console
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // eslint-disable-next-line no-console
  console.log(
    "Preview URL: %s",
    nodemailer.getTestMessageUrl(info)
  );
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
