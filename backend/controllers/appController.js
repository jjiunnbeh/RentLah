import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

// import EMAIL from '/Users/trongphan/Desktop/SC2006/RentLah/backend/.env';
// import PASSWORD from '/Users/trongphan/Desktop/SC2006/RentLah/backend/.env';
import "dotenv/config";
/** send mail from testing account */
export const signup = async (req, res) => {

    /** testing account */
    let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: "<b>Successfully Register with us.</b>", // html body
      }


    transporter.sendMail(message).then((info) => {
        return res.status(201)
        .json({ 
            msg: "you should receive an email",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("Signup Successfully...!");
}

/** send mail from real gmail account */
export const getbill = (req, res) => {

    const { userEmail } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Reset Password for User",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "User you are SC2006 Master",
            intro: "Let's get an A++++++",
            table : {
                data : [
                    {
                        "link to reset your Password" : "http://bit.ly/sc2006resetpassword",
                    }
                ]
            },
            outro: "Pay me via paynow 12345678"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : process.env.EMAIL,
        to : userEmail,
        subject: "Reset Password for User",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}


export default {
    signup,
    getbill
}