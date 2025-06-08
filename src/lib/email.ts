import nodemailer from "nodemailer";


export const transport=nodemailer.createTransport({
    host:'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth:{
        user:process.env.PUBLIC_EMAIL_USERNAME,
        pass:process.env.PUBLIC_EMAIL_PASSWORD
    },
});