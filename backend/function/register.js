const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt'); // password hashing

const typeOfUsers = [
    { user: 'Agent' },
    { user: 'Customer' }
];

async function register(username, password, userType) {
    console.log("Welcome to the register page!");

    // input validation
    if (!username || !password || !userType) {
        throw new Error('Missing required fields: username, password, and userType');
    }

    const client = await connectToDatabase(); // connect to MongoDB 

    try {
        const database = client.db('sample_airbnb');
        const usersCollection = database.collection('users');

        // Check for existing username (optional):
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
        // Handle errors appropriately (e.g., send error response to user)
    } finally {
        await client.close(); // Close the database connection
    }
}

async function connectToDatabase() {
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

// //Example usage:
// register('new_user', 'secure_password', 'Customer')
//     .then(() => console.log('Registration successful'))
//     .catch((error) => console.error('Registration failed:', error.message));
