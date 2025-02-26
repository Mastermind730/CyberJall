import nodemailer from "nodemailer";


export const transport=nodemailer.createTransport({
    host:'smtp.gmail.com',
    auth:{
        user:process.env.PUBLIC_EMAIL_USERNAME,
        pass:process.env.PUBLIC_EMAIL_PASSWORD
    },
});