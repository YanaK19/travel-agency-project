import errorHandler from '../utils/errorHandler';
import nodemailer from 'nodemailer'

async function sendEmail(req:any, res:any) {
    try{
    //let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "triphelper2020@mail.ru", // generated ethereal user
            pass: "th2020project15" // generated ethereal password
        }
    });

    let info = await transporter.sendMail({
        from: 'TripHelper <triphelper2020@mail.ru>', // sender address
        to: req.body.email,
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "Hi" // html body
    });

    /*    console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));*/
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
