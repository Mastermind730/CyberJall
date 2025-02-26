import { NextResponse,NextRequest } from "next/server";
import { transport } from "@/lib/email";

export async function POST(request:NextRequest){
    const username=process.env.PUBLIC_EMAIL_USERNAME;
    const password=process.env.PUBLIC_EMAIL_PASSWORD;
    const myEmail=process.env.PUBLIC_PERSONAL_EMAIL;

    const formData=await request.formData();
    const name=formData.get('name');
    const email=formData.get('email');
    const message=formData.get('message');
    const mobile_no=formData.get('number');
    console.log(message);

    try{
        const mailOptions: any = {
            from: username,
            to: myEmail,
            subject: 'Thanks for connecting to CyberJall',
            html: `
                <p>Name: ${name} </p>
                <p>Email: ${email} </p>
                <p>Message: ${message} </p>
            `,
        };
        
        if (email !== null) {
            mailOptions.replyTo = email;
        }
        
        const mail = await transport.sendMail(mailOptions);
        
       
        
    }catch(error) {  
        console.log(`Error sending email :${error}`);  
        NextResponse.json({message:"COULD NOT SEND MESSAGE"},{ status: 500 });
    }

    return NextResponse.json({message:"Success:email was sent"});
}