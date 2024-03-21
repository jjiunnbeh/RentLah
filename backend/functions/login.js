// //i will link the DB with mongoDB later, in this demo i just use const users as db to retrieve data
// import jwt from "jsonwebtoken";//jwt  
// import 'dotenv/config';
// import { MongoClient } from "mongodb";


// export default async function login(username, password, userType) {
//   // const userArray = userType === "Customer" ? Customers : Agents;
//   const schema = "test";
//   let collectionName;
//   if (userType === "Customer") {
//     collectionName = "user_database";
//   } else {
//     collectionName = "agent_database";
//   }

//   let client = await connectToDatabase();
//   const db = client.db(schema);
//   // console.log(db.find((user) => user.username === username));
//   // return db.find((user) => user.username === username);
//   const collection = db.collection(collectionName);


//   // Find the user document based on the username
//   const user = await collection.findOne({ username: username });
//   console.log(user)
//   // let user = findUser(username, userType);

//   // 2. Handle non-existent user (Won't locked)
//   if (!user) {
//     console.log("Invalid username or password. e1");
//     // return { auth: "Unsuccessful", user: userType };
//     return { message: "Invalid username or password. Please try again later.", userType: userType };
//   }
//   console.log(user);

//   // 3. Check account lock status
//   if (user.accountLocked) {
//     console.log("Account is locked. Please try again later.");
//     // return { auth: "Unsuccessful", user: user.userType };
//     return { message: "Account is locked.", userType: userType };
//   }

//   // 4. Check password and handle login attempts
//   console.log(user.password);
//   console.log(password);
//   if (user.password === password) {
//     console.log(`Login successful for ${userType} ${username}`);
//     //JWT token
//     const jwtToken = jwt.sign(
//       { id: user.username, email: user.email, type: userType },
//       process.env.JWT_SECRET, { expiresIn: "1h" }
//     );
//     console.log(jwtToken);
//     return { message: "Successful", userType: userType, token: jwtToken };
//   } else {
//     // Login attempts not more than 5
//     user.loginAttempts++;
//     if (user.loginAttempts >= 5) {
//       user.accountLocked = true;
//       console.log("Too many login attempts. Account locked for 5 minutes.");
//       //Timer to lock
//       setTimeout(() => {
//         user.accountLocked = false;
//         user.loginAttempts = 0;
//         console.log("Account unlocked. You can now attempt to login again.");
//       }, 5 * 60 * 1000); // Unlock after 5 minutes

//     } else {
//       console.log("Incorrect username or password. e2");
//     }
//   }

//   // Login failed (wrong password or locked account)
//   // return { auth: "Unsuccessful", user: user.userType };
//   return { message: "Invalid username or password. Please try again later.", userType: userType };
// }


// async function findUser(username, userType) {
//   const client = await connectToDatabase();
//   // const userArray = userType === "Customer" ? Customers : Agents;
//   let schema;
//   let collectionName;
//   if (userType === "Customer") {
//     schema = "test";
//     collectionName = "user_database";
//   } else {
//     schema = "test";
//     collectionName = "agent_database";
//   }

//   const db = client.db(schema);
//   // console.log(db.find((user) => user.username === username));
//   // return db.find((user) => user.username === username);
//   const collection = db.collection(collectionName);

//   // Find the user document based on the username
//   const user = await collection.findOne({ username: username });


//   console.log(user.password);
//   return user;
// }

// async function connectToDatabase() { //preferably mongoDB
//   /**
//    * Connection URI. Replace placeholders with your actual credentials.
//    * Refer to https://docs.mongodb.com/ecosystem/drivers/node/ for details.
//    */
//   // const uri = "hehe";
//   const uri=process.env.MONGO;
//   const client = new MongoClient(uri);

//   try {
//     const client = await MongoClient.connect(uri);
//     return client;
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     throw error; // Re-throw the error for handling
//   }
// }
