import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const typeOfUsers = [
    { user: 'Agent' },
    { user: 'Customer' }
];

function isPasswordStrong(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Example regular expression
    return regex.test(password);
}

async function register(username, password, userType) {
    console.log("Welcome to the register page!");

    // input validation
    if (!username || !password || !userType) {
        throw new Error('Missing required fields: username, password, and userType');
    }

    // check password validation
    if (password.length < 10) {
        console.log("Password length must be greater than 10");
    }
    if (!isPasswordStrong(password)) {
        console.log("Password must contain at least 1 upper Case letter, 1 special symbol and normal case letter");
    }
    // connect to database (MongoDB)
    const client = await connectToDatabase();

    try {
        const database = client.db('sample_airbnb');
        const usersCollection = database.collection('users');

        // check for existing username
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            throw new Error('Username already exists');
        }

        // password hashing:
        const saltRounds = 17; // can be adjusted if needed
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // user document to be stored in DB, can change the struct later
        const newUser = {
            username,
            password: hashedPassword,
            userType,
            // add other relevant user information as needed
        };

        // insert user into DB:
        const result = await usersCollection.insertOne(newUser);

        console.log(`New user created with ID: ${result.insertedId}`);
    } catch (error) {
        console.error('Error registering user:', error.message);
        // handle errors appropriately (e.g., send error to user)
    } finally {
        await client.close();
    }
}

async function connectToDatabase() { //preferably mongoDB
    /**
     * Connection URI. Replace placeholders with your actual credentials.
     * Refer to https://docs.mongodb.com/ecosystem/drivers/node/ for details.
     */
    const uri = "mongodb+srv://yamemtid69:SC2006PROJECT@sc2006project.1tavfjr.mongodb.net/?retryWrites=true&w=majority&appName=SC2006Project";

    try {
        const client = await MongoClient.connect(uri);
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error; // Re-throw the error for handling
    }
}

// //Example usage:
// register('new_user', 'secure_password', 'Customer')
//     .then(() => console.log('Registration successful'))
//     .catch((error) => console.error('Registration failed:', error.message));
