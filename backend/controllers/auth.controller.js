import Customer from "../db/customer.model.js";
import Agent from "../db/agent.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken"; //jwt
import "dotenv/config";

import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

function isPasswordStrong(password) {     
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Example regular expression
  return regex.test(password);
}

//Register Customer
export const registerCustomer = async (req, res, next) => {
  const { username, email, password, phoneNo } = req.body;
  const strongpass = isPasswordStrong(password);

  if (password.length < 10)
  {
    return next(
      errorHandler(
        401,
        {type:"password", content:"Password length must be greater than 10."}
        
      ))
  }
  if (!strongpass)
  {
    return next(
      errorHandler(
        401,
        {type:"password", content:"Password must contain at least 1 upper Case letter, 1 special symbol and normal case letter"}
      ))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newCustomer = new Customer({
    username,
    email,
    password: hashedPassword,
    phoneNo,
  });
  try {
    await newCustomer.save();
    console.log(`${newCustomer.username} 's account is created sucessfully`);
    res
      .status(201)
      .json(`${newCustomer.username} 's account is created sucessfully`);
  } catch (error) {
    console.log(error.keyValue);
    const message = error.keyValue
    if (error.keyValue.username)
    {
      return next(
        errorHandler(
          409,
          {type:"username",content:"Username already existed in our database."}
        ))
    }
    else if (error.keyValue.email)
    {
      return next(
        errorHandler(
          409,
          {type:"email",content: "Email address already existed in our database."}
        ))
    }
    else if (error.keyValue.phoneNo)
    {
      return next(
        errorHandler(
          409,
          {type:"phoneNo",content: "Phone number already existed in our database."}
        ))
    }
  

  }
};

//Register agent
export const registerAgent = async (req, res, next) => {
  const { username, email, password, phoneNo,agentname, agentregnum } = req.body;
  if (password.length < 10)
  {
    return next(
      errorHandler(
        401,
        {type:"password", content:"Password length must be greater than 10."}
        
      ))
  }
  if (!strongpass)
  {
    return next(
      errorHandler(
        401,
        {type:"password", content:"Password must contain at least 1 upper Case letter, 1 special symbol and normal case letter"}
      ))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newAgent = new Agent({
    username,
    email,
    password: hashedPassword,
    phoneNo,
    agentname,
    agentregnum,
  });
  try {
    await newAgent.save();
    console.log(`${newAgent.username} 's account is created sucessfully`);
    res
      .status(201)
      .json(`${newAgent.username} 's account is created sucessfully`);
  } catch (error) {
    console.log(error);
    console.log(error.keyValue);
    const message = error.keyValue
    if (error.keyValue.username)
    {
      return next(
        errorHandler(
          409,
          {type:"username", content:"Username already existed in our database."}
        ))
    }
    else if (error.keyValue.email)
    {
      return next(
        errorHandler(
          409,
         {type:"email",content: "Email address already existed in our database."}
        ))
    }
    else if (error.keyValue.phoneNo)
    {
      return next(
        errorHandler(
          409,
          {type:"phoneNo",content: "Phone number already existed in our database."}
        ))
    }
    else if (error.keyValue.agentregnum)
    {
      return next(
        errorHandler(
          409,
          {type:"license", content:"The license no. has already been registered by another agent."}
        ))

    }
  

  }
};



//Customer Login
export const loginCustomer = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validCustomer = await Customer.findOne({ username });
    if (!validCustomer) {
      return next(errorHandler(404, "Invalid username or pasword"));
    }
    //Customer do exist, now check the acccount lock status
    if (validCustomer.accountLocked) {
      const curTime = new Date();
      const lockDuration = 5 * 60 * 1000;
      const unlockTime = new Date(
        validCustomer.lockedAt.getTime() + lockDuration
      );

      // Check if it's time to unlock the account
      if (curTime >= unlockTime) {
        // Reset login attempt counter and then unlock the account
        validCustomer.loginAttempts = 0;
        validCustomer.accountLocked = false;
        //Save info back to database
        await validCustomer.save();
      } else {
        const remainingTime = Math.ceil((unlockTime - curTime) / 1000); // Remaining time in seconds
        return next(
          errorHandler(
            403,
            `Account is locked. Please try again in ${remainingTime} seconds`
          )
        );
      }
    }
    const validPassword = bcryptjs.compareSync(
      password,
      validCustomer.password
    );
    if (!validPassword) {
      validCustomer.loginAttempts += 1;
      if (validCustomer.loginAttempts >= 5) {
        validCustomer.accountLocked = true;
        validCustomer.lockedAt = new Date();
      }
      await validCustomer.save();
      return next(errorHandler(401, "Invalid username or password"));
    }
    const jwtToken = jwt.sign(
      { id: validCustomer._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const {password: pass, ...rest} = validCustomer._doc;
    const token =jwtToken;
    res
      .status(200)
      .json({rest, token});
  } catch (error) {
    return next(error);
  }
};

export const loginAgent = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validAgent = await Agent.findOne({ username });
    if (!validAgent) {
      return next(errorHandler(404, "Invalid username or pasword"));
    }
    //Agent do exist, now check the acccount lock status
    if (validAgent.accountLocked) {
      const curTime = new Date();
      const lockDuration = 5 * 60 * 1000;
      const unlockTime = new Date(validAgent.lockedAt.getTime() + lockDuration);

      // Check if it's time to unlock the account
      if (curTime >= unlockTime) {
        // Reset login attempt counter and then unlock the account
        validAgent.loginAttempts = 0;
        validAgent.accountLocked = false;
        //Save info back to database
        await validAgent.save();
      } else {
        const remainingTime = Math.ceil((unlockTime - curTime) / 1000); // Remaining time in seconds
        return next(
          errorHandler(
            403,
            `Account is locked. Please try again in ${remainingTime} seconds`
          )
        );
      }
    }
    const validPassword = bcryptjs.compareSync(password, validAgent.password);
    if (!validPassword) {
      validAgent.loginAttempts += 1;
      if (validAgent.loginAttempts >= 5) {
        validAgent.accountLocked = true;
        validAgent.lockedAt = new Date();
      }
      await validAgent.save();
      return next(errorHandler(401, "Invalid username or password"));
    }
    const jwtToken = jwt.sign({ id: validAgent._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const {password: pass, ...rest} = validAgent._doc;
    const token =jwtToken;
    res
      .status(200)
      .json({rest, token});
  } catch (error) {
    return next(error);
  }
};

export const forgetPassword = async (req, res, next) => {

  const { email, type } = req.body;
  console.log(req.body);
  let validUser;
  if (type === "customer") {
    validUser = await Customer.findOne({ email });
  } else {
    validUser = await Agent.findOne({ email });
  }
  if (validUser)
  {console.log("connected");}}

  //     const token = jwt.sign({id: validUser._id}, "jwt_secret_key", {expiresIn: "1d"})
  //     var transporter = nodemailer.createTransport({
  //         service: 'gmail',
  //         auth: {
  //           user: process.env.EMAIL,
  //           pass: process.env.PASSWORD
  //         }
  //       });
        
  //       var mailOptions = {
  //         from: process.env.EMAIL,
  //         to: validUser.email,
  //         subject: 'Reset Password Link',
  //         text: `http://localhost:5173/reset_password/${validUser._id}/${token}`
  //       };
        
  //       transporter.sendMail(mailOptions, function(error, info){
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           return res.send({Status: "Success"})
  //         }
  //       });
  // }};

// app.post('/reset-password/:id/:token', (req, res) => {
//   const {id, token} = req.params
//   const {password} = req.body

//   jwt.verify(token, "jwt_secret_key", (err, decoded) => {
//       if(err) {
//           return res.json({Status: "Error with token"})
//       } else {
//           bcrypt.hash(password, 10)
//           .then(hash => {
//               UserModel.findByIdAndUpdate({_id: id}, {password: hash})
//               .then(u => res.send({Status: "Success"}))
//               .catch(err => res.send({Status: err}))
//           })
//           .catch(err => res.send({Status: err}))
//       }
//   })
// })
//   }

//   if (!validUser)
//   {
//     res
//     .status(200)
//     .json({
//       message: `Sucessfully login as ${validCustomer.username}`,
//       token: jwtToken,
//     });

//   }
// };
/** send mail from testing account */
// export const signup = async (req, res) => {

//     /** testing account */
//     let testAccount = await nodemailer.createTestAccount();

//       // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: testAccount.user, // generated ethereal user
//             pass: testAccount.pass, // generated ethereal password
//         },
//     });

//     let message = {
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Successfully Register with us.", // plain text body
//         html: "<b>Successfully Register with us.</b>", // html body
//       }


//     transporter.sendMail(message).then((info) => {
//         return res.status(201)
//         .json({ 
//             msg: "you should receive an email",
//             info : info.messageId,
//             preview: nodemailer.getTestMessageUrl(info)
//         })
//     }).catch(error => {
//         return res.status(500).json({ error })
//     })

//     // res.status(201).json("Signup Successfully...!");
// }

// /** send mail from real gmail account */
// export const getbill = (req, res) => {

//     const { userEmail } = req.body;

//     let config = {
//         service : 'gmail',
//         auth : {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD
//         }
//     }

//     let transporter = nodemailer.createTransport(config);

//     let MailGenerator = new Mailgen({
//         theme: "default",
//         product : {
//             name: "RentLah by Z440",
//             link : 'https://mailgen.js/'
//         }
//     })

//     let response = {
//         body: {
//             name : "user",
//             intro: "Here is your reset password link",
//             table : {
//                 data : [
//                     {
//                         'Your reset link':'url'
//                     }
//                 ]
//             },
//             outro: "Do not share your password with anyone."
//         }
//     }

//     let mail = MailGenerator.generate(response)

//     let message = {
//         from : process.env.EMAIL,
//         to : userEmail,
//         subject: "RentLah! How dare you forget your password?",
//         html: mail
//     }

//     transporter.sendMail(message).then(() => {
//         return res.status(201).json({
//             msg: "you should receive an email"
//         })
//     }).catch(error => {
//         return res.status(500).json({ error })
//     })

//     // res.status(201).json("getBill Successfully...!");
// };
