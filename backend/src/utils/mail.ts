import { config } from 'dotenv';
import nodemailer from 'nodemailer'
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars'

config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

transporter.verify(function (error, success) {
    console.log("Server is ready to take our messages");
});


const sendPaswordResetEmail = async (email: string, names: string, passwordResetToken: string) => {
    try {
        const templatePath = path.join(__dirname, 'templates', 'reset-password.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8').toString();
        const template = handlebars.compile(source);

        const context = {
            names,
            passwordResetCode: passwordResetToken
        };

        const html = template(context);

        const info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "NEC Voting App Password Reset",
            html
        });

        console.log("Password Reset Message sent: %s", info.messageId);

        return {
            message: "Email sent successfully",
            status: true
        };
    } catch (error) {
        return { message: "Unable to send email", status: false };
    }
};

const sendPaswordResetSuccessfulEmail = async (email: string, names: string) => {
    try {
        const templatePath = path.join(__dirname, 'templates', 'reset-password-successful.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8').toString();
        const template = handlebars.compile(source);

        const context = {
            names
        };

        const html = template(context);

        const info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "NEC Voting App Reset Successfully",
            html
        });

        console.log("Password Reset Successfully Message sent: %s", info.messageId);

        return {
            message: "Email sent successfully",
            status: true
        };
    } catch (error) {
        return { message: "Unable to send email", status: false };
    }
};

export { sendPaswordResetSuccessfulEmail, sendPaswordResetEmail };