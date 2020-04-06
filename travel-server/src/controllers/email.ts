import nodemailer from 'nodemailer'
import {decrypt, encrypt} from '../utils/encryption';


async function sendEmail(req:any, res:any) {
    try{
// Test sender
    /*
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        });

    */
        let transporter = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "triphelper2020@mail.ru", // generated ethereal user
                pass: "th2020project15" // generated ethereal password
            }
        });

        const encryptedEmail = encrypt(req.body.email);
        const htmlContent = `
                <div style="padding: 10px; text-align: center; background: rgba(128,128,128,0.16);">
                    <h4 style="font-size: 23px">
                        <span style="color: rgb(4,7,5)">Trip</span><span style="color: rgb(111,194,226)">Helper</span>
                    </h4>
                    <div style="padding-bottom: 15px">Click to the button to reset the password for your TripHelper account</div>
                    <div style="padding: 10px">
                        <a style="border-radius: 5px; font-size: 15px; color: black; text-decoration: none; padding: 10px; width: 70px; height: 40px; background: rgb(111,194,226); padding: 10px" 
                           href=${"http://localhost:4200/login?email=" + encryptedEmail}>
                           Reset Password
                        </a>
                    </div>
                </div>
            `;


        // Test adressee
/*        let info = await transporter.sendMail({
            from: '"TripHelper 🏝" <triphelper2020@mail.ru>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Reset your TripHelper account password 🕵", // Subject line
            text: "Hello world?", // plain text body
            html: htmlContent // html body
        });*/

        let info = await transporter.sendMail({
            from: 'TripHelper <triphelper2020@mail.ru>', // sender address
            to: req.body.email,
            subject: "Reset your TripHelper account password 🕵", // Subject line
            text: "Hello world?", // plain text body
            html: htmlContent // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(250).json("Mail has been sent");
    } catch(err) {
        if(err.responseCode == 550) {
            res.status(550).json({
                success: false,
                message: "Looks like you've sent not existing email"
            })
        } else {
            res.status(550).json({
                success: false,
                message: "Error occured while sending mail"
            })
        }
    }
}

export {sendEmail}
