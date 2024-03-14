import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'; // Assuming you use Nodemailer for sending emails

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw error;
    }
}

// Function to handle forget password use case
async function forgetPassword(email) {
    try {
        // Connect to the database
        await connectToDatabase();

        // 1. Check if the email exists in the database
        const user = await client.db("sample_airbnb").collection("users").findOne({ email });

        // 2. Handle non-existent email
        if (!user) {
            throw new Error('Email not found');
        }

        // 3. Generate and send reset password link to the user's email
        const resetLink = generateResetPasswordLink(user);
        await sendResetPasswordEmail(email, resetLink);

        console.log(`Reset password link sent to ${email}: ${resetLink}`);

        // 4. Optionally, update the database to mark that a reset link was sent
        // This could involve updating a field in the user document indicating that a reset link was sent
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
    // Generate a unique reset password link, such as a token or a unique URL
    // For simplicity, let's assume it's just a random token
    const resetToken = generateRandomToken();
    const resetLink = `https://example.com/reset-password?token=${resetToken}`;
    return resetLink;
}

// Function to send reset password email
async function sendResetPasswordEmail(email, resetLink) {
    // Create Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    // Define email options
    let mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Reset Your Password',
        text: `Dear user, 
            You have requested to reset your password. Please click the following link to reset your password:
            ${resetLink}`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent successfully");
}

// Function to generate random token (for simplicity)
function generateRandomToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Example usage:
forgetPassword('user@example.com')
    .then(() => console.log('Forget password process completed successfully'))
    .catch(error => console.error('Forget password process failed:', error.message));
