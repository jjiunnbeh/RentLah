
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'; // Import dotenv package to load environment variables

dotenv.config(); // Load environment variables from .env file


// have to create .env file and add these:
// EMAIL_USER=dummy mail
// EMAIL_PASSWORD=dummy mail password


async function connectToDatabase() { // taken from register.js
    /**
     * Connection URI. Replace placeholders with your actual credentials.
     * Refer to https://docs.mongodb.com/ecosystem/drivers/node/ for details.
     */
    const uri = "mongodb+srv";

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



// Function to generate random token
function generateRandomToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Function to send reset password email
async function sendResetPasswordEmail(email, resetLink) {
    try {
        // Create Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Use env var
                pass: process.env.EMAIL_PASSWORD // use env var
            }
        });

        // Define email options
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Your Password',
            text: ` Please click the following link to reset your password:
            ${resetLink}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log("Reset password email sent successfully");
    } catch (error) {
        console.error("Error sending reset password email:", error.message);
        throw error;
    }
}


// Function to generate reset password link
function generateResetPasswordLink(user) {
    // Generate a unique link
    const resetToken = generateRandomToken(); // random generation
    const resetLink = `https://example.com/reset-password?token=${resetToken}`;
    return resetLink;
}


// Example usage:
// forgetPassword('user@example.com')
//   .then(() => console.log('Forget password process completed successfully'))
// .catch(error => console.error('Forget password process failed:', error.message));
