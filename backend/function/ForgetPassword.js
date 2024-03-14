import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'; // can use nodemailer for sending emails



async function connectToDatabase() { // taken from register.js
    /**
     * Connection URI. Replace placeholders with your actual credentials.
     * Refer to https://docs.mongodb.com/ecosystem/drivers/node/ for details.
     */
    const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/sample_airbnb?retryWrites=true&w=majority";

    try {
        const client = await MongoClient.connect(uri);
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error; // Re-throw the error for handling
    }
}


// main function
async function forgetPassword(email) {
    try {
        // Connect to the database
        await connectToDatabase();

        // 1. Check if the email exists in the database
        const user = await client.db("sample_airbnb").collection("users").findOne({ email }); // database:: sample_airbnb, same as login.js

        // 2. Handle non-existent email
        if (!user) {
            throw new Error('Email not found');
        }

        // 3. Generate and send reset password link
        const resetLink = generateResetPasswordLink(user);
        await sendResetPasswordEmail(email, resetLink);

        console.log(`Reset password link sent to ${email}: ${resetLink}`);

        // 4. optional: can update database to show link sent
        await client.db("sample_airbnb").collection("users").updateOne(
            { email },
            { $set: { resetLinkSent: true } }
        );

        // Close the MongoDB connection
        await client.close();
    } catch (error) {
        console.error("Error in forgetPassword:", error.message);
        throw error;
    }
}

// Function to generate reset password link
function generateResetPasswordLink(user) {
    // Generate a unique reset password link
    const resetToken = generateRandomToken(); // random generation
    const resetLink = `https://example.com/reset-password?token=${resetToken}`;
    return resetLink;
}

// Function to send reset password email
async function sendResetPasswordEmail(email, resetLink) {
    // Create Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // need to create dummy email for this
            pass: 'your-email-password'
        }
    });

    // Define email options
    let mailOptions = {
        from: 'your-email@gmail.com', // better to use dummy, can use env variables
        to: email,
        subject: 'Reset Your Password',
        text: ` Please click the following link to reset your password:
            ${resetLink}`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent successfully");
}

// Function to generate random token
function generateRandomToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Example usage:
// forgetPassword('user@example.com')
 //   .then(() => console.log('Forget password process completed successfully'))
   // .catch(error => console.error('Forget password process failed:', error.message));
