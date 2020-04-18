import nodemailer from 'nodemailer'
import {decrypt, encrypt} from '../utils/encryption';
import Message from '../models/Message';
import errorHandler from '../utils/errorHandler';
import Todo from '../models/Todo';
import Newsletter from '../models/Newsletter';
import Review from '../models/Review';


async function sendEmail(req:any, res:any) {
    try{
        let encryptedEmail;
        let htmlContent = '';
        let subjectText = '';

        if(req.query.theme === 'password') {
            encryptedEmail = encrypt(req.body.email);
            subjectText = "Reset your TripHelper account password 🕵";
            htmlContent = `
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
        }

        if (req.query.theme === 'booked') {
            subjectText = "Tour order";
            htmlContent = `
                <div style="padding: 10px; text-align: center; background: rgba(128,128,128,0.16);">
                    <h4 style="font-size: 23px">
                        <span style="color: rgb(4,7,5)">Trip</span><span style="color: rgb(111,194,226)">Helper</span>
                    </h4>
                    <div style="padding-bottom: 15px">Thank you for order tour 
                        <span style="font-size: 15px; color: rgb(104,172,206);">${req.body.tour.title}</span>
                        ! 😊
                    </div>
                    <div style="padding-bottom: 15px">Departure: ${req.body.tourDate.dateFrom.day}/${req.body.tourDate.dateFrom.month}/${req.body.tourDate.dateFrom.year}</div>
                    <div style="margin-bottom: 20px; background: #eebb3adb; padding: 16px; font-size: 15px;">We will call you soon and confirm your order 📞</div>
                </div>
            `;
        }

        if (req.query.theme === 'confirmed') {
            subjectText = "Order Confirmed! 🎉🎉🎉";
            htmlContent = `
                <div style="padding: 10px; text-align: center; background: rgba(128,128,128,0.16);">
                    <h4 style="font-size: 23px">
                        <span style="color: rgb(4,7,5)">Trip</span><span style="color: rgb(111,194,226)">Helper</span>
                    </h4>
                    <div style="margin-bottom: 20px; padding: 16px; font-size: 15px;">Your order ${req.body.tour.en.title}  was confirmed 👌</div>
                </div>
            `;
        }

        if (req.query.theme === 'sibscribed') {
            subjectText = "You've subscribed on our news! 📰";
            htmlContent = `
                <div style="padding: 10px; text-align: center; background: rgba(128,128,128,0.16);">
                    <h4 style="font-size: 23px">
                        <span style="color: rgb(4,7,5)">Trip</span><span style="color: rgb(111,194,226)">Helper</span>
                    </h4>
                    <div style="margin-bottom: 20px; padding: 16px; font-size: 15px;">
                        Thank u for following us! <br>
                        + know about special offers 🎁<br>
                        + tour discounts 👍 <br>
                        + new popular tours 👀<br>
                    </div>
                </div>
            `;
        }

        if( req.body.title || req.body.message) {
            subjectText = req.body.title;
            htmlContent = `
                <div style="padding: 10px; text-align: center; background: rgba(128,128,128,0.16);">
                    <h4 style="font-size: 23px">
                        <span style="color: rgb(4,7,5)">Trip</span><span style="color: rgb(111,194,226)">Helper</span>
                        <span style="color: rgb(4,7,5)">News</span>
                    </h4>
                    <div style="margin-bottom: 20px; padding: 16px; font-size: 15px; word-wrap: break-word;">${req.body.message}</div>
                </div>
            `;
        }

        let info;
        if(req.body.email === 'yana-triphelper@mail.ru') {
            let transporter = nodemailer.createTransport({
                host: "smtp.mail.ru",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "triphelper2020@mail.ru", // generated ethereal user
                    pass: "th2020project15" // generated ethereal password
                }
            });

            info = await transporter.sendMail({
                from: 'TripHelper <triphelper2020@mail.ru>', // sender address
                to: req.body.email,
                subject: subjectText, // Subject line
                text: "Hello world?", // plain text body
                html: htmlContent // html body
            });
        } else {
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

            info = await transporter.sendMail({
                from: '"TripHelper 🏝" <triphelper2020@mail.ru>', // sender address
                to: "bar@example.com, baz@example.com", // list of receivers
                subject: subjectText, // Subject line
                text: "Hello world?", // plain text body
                html: htmlContent // html body
            });
        }

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(250).json("Mail has been sent");
    } catch(err) {
        console.log(err)
        if(err.responseCode == 550) {
            res.status(550).json({
                success: false,
                message: "Looks like you've entered not existing email"
            })
        } else {
            errorHandler(res, err);
        }
    }
}


async function createUserMessage(req:any, res:any) {
    const today = new Date();

    const currDate = {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };

    const message = new Message({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        message: req.body.message,
        date: {
            day: currDate.day,
            month: currDate.month,
            year: currDate.year
        },
        answered: false
    });

    try {
        await message.save();
        res.status(201).json(message)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function createNewsletter(req:any, res:any) {
    const newsletter = new Newsletter({
        emails: []
    });

    try {
        await newsletter.save();
        res.status(201).json(newsletter);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function updateNewsletter(req:any, res:any) {
    try {
        let newsletter: any = await Newsletter.findById("5e941f902d391821309f87da");
        let emails = newsletter.emails;
        if (emails.indexOf(req.body.email) !== -1) {
            res.status(409).json({
                message: 'User with such email is already subscribed.' })
        } else {
            emails.push(req.body.email);

            const updatedEmails = await Newsletter.findOneAndUpdate(
                {_id: "5e941f902d391821309f87da"},
                {$set: {emails}},
                {new: true}
            );

            res.status(200).json(updatedEmails);
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

export {sendEmail, createUserMessage, createNewsletter, updateNewsletter}
