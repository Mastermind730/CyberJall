import { NextResponse } from "next/server";
import { transport } from "@/lib/email";

export async function POST(request: Request) {
    const username = process.env.PUBLIC_EMAIL_USERNAME;
    // const password = process.env.PUBLIC_EMAIL_PASSWORD;
    const myEmail = process.env.PUBLIC_PERSONAL_EMAIL;

    try {
        const formData = await request.json();
        const name = formData.name;
        const email = formData.email;
        const message = formData.message;
        console.log(message);

        if (!name || !email || !message) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const mailOptions = {
            from: username,
            to: myEmail,
            subject: 'Thanks for connecting to CyberJall',
            html: `
                <p>Name: ${name} </p>
                <p>Email: ${email} </p>
                <p>Message: ${message} </p>
            `,
            replyTo: email
        };
        
         await transport.sendMail(mailOptions);
        
        return NextResponse.json({ message: "Success: email was sent" });
        
    } catch (error) {  
        console.log(`Error sending email: ${error}`);  
        return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
    }
}