//i will link the DB with mongoDB later, in this demo i just use const users as db to retrieve data
import jwt from "jsonwebtoken";//jwt  
import 'dotenv/config';
import { MongoClient } from "mongodb";

let password_dummy;
// const readline = require('readline');
//test database
// const Customers = [
//   { username: "customer1", password: "customer1" , accountLocked:false, userType:"Customer", loginAttempts:0, email:"customer1@gmail.com"},
//   { username: "customer2", password: "customer2", accountLocked:false, userType: "Customer", loginAttempts:0, email:"customer2@gmail.com"},
//   {username:"SC2006", password:"1234", accountLocked: false, userType: "Customer", loginAttempt: 0, email:"SC2006@gmail.com"},
// ];
// const Agents = [
//   { username: "agent1", password: "agent1" , accountLocked:false, userType:"Agent", loginAttempts:0,email:"agent2@gmail.com"},
//   { username: "agent2", password: "agent2", accountLocked:false, userType: "Agent", loginAttempts:0,email:"agent2@gmail.com"},
// ];

export default async function login(username, password, userType) {
  // const userArray = userType === "Customer" ? Customers : Agents;
  const schema = "test";
  let collectionName;
  if (userType === "Customer") {
    collectionName = "user_database";
  } else {
    collectionName = "agent_database";
  }

  let client = await connectToDatabase();
  const db = client.db(schema);
  // console.log(db.find((user) => user.username === username));
  // return db.find((user) => user.username === username);
  const collection = db.collection(collectionName);


  // Find the user document based on the username
  const user = await collection.findOne({ username: username });
  console.log(user)
  // let user = findUser(username, userType);

  // 2. Handle non-existent user (Won't locked)
  if (!user) {
    console.log("Invalid username or password. e1");
    // return { auth: "Unsuccessful", user: userType };
    return { message: "Invalid username or password. Please try again later.", userType: userType };
  }
  console.log(user);

  // 3. Check account lock status
  if (user.accountLocked) {
    console.log("Account is locked. Please try again later.");
    // return { auth: "Unsuccessful", user: user.userType };
    return { message: "Account is locked.", userType: userType };
  }

  // 4. Check password and handle login attempts
  console.log(user.password);
  console.log(password);
  if (user.password === password) {
    console.log(`Login successful for ${userType} ${username}`);
    //JWT token
    const jwtToken = jwt.sign(
      { id: user.username, email: user.email, type: userType },
      process.env.JWT_SECRET, { expiresIn: "1h" }
    );
    console.log(jwtToken);
    return { message: "Successful", userType: userType, token: jwtToken };
  } else {
    // Login attempts not more than 5
    user.loginAttempts++;
    if (user.loginAttempts >= 5) {
      user.accountLocked = true;
      console.log("Too many login attempts. Account locked for 5 minutes.");
      //Timer to lock
      setTimeout(() => {
        user.accountLocked = false;
        user.loginAttempts = 0;
        console.log("Account unlocked. You can now attempt to login again.");
      }, 5 * 60 * 1000); // Unlock after 5 minutes

    } else {
      console.log("Incorrect username or password. e2");
    }
  }

  // Login failed (wrong password or locked account)
  // return { auth: "Unsuccessful", user: user.userType };
  return { message: "Invalid username or password. Please try again later.", userType: userType };
}


async function findUser(username, userType) {
  const client = await connectToDatabase();
  // const userArray = userType === "Customer" ? Customers : Agents;
  let schema;
  let collectionName;
  if (userType === "Customer") {
    schema = "test";
    collectionName = "user_database";
  } else {
    schema = "test";
    collectionName = "agent_database";
  }

  const db = client.db(schema);
  // console.log(db.find((user) => user.username === username));
  // return db.find((user) => user.username === username);
  const collection = db.collection(collectionName);

  // Find the user document based on the username
  const user = await collection.findOne({ username: username });


  console.log(user.password);
  return user;
}

async function connectToDatabase() { //preferably mongoDB
  /**
   * Connection URI. Replace placeholders with your actual credentials.
   * Refer to https://docs.mongodb.com/ecosystem/drivers/node/ for details.
   */
<<<<<<< HEAD
  const uri = "hehe";
=======
  const uri = process.env.MONGO;
>>>>>>> 93277c2 (connected to db)
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    const client = await MongoClient.connect(uri);
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error; // Re-throw the error for handling
  }
}
/*  Function now
export default function login(username, password, user) {
  //Check which type of user is signing in and go to the respective database
  //1. Check wheteher the user exists.
  const userFound = (username, userType) =>
  {
    {String(userType) === "Customer" ? Customers.find((c)=>c.username === username): Agents.find((a)=>a.username === username)
  }
  if (userFound)
  {
    //Check whether account is locked
    if (String(userType) === "Customer" ? Customers.find((c)=>c.username === username && c.accountLocked): Agents.find((a)=>a.password === password && a.accountLocked))
      console.log("Account is locked. Please try again later.");
      return {auth: "Unsucessful", user: String(userType)};
    }
    //Either customer or agent login sucessful
    if (String(userType) === "Customer" ? Customers.find((c)=>c.username === username && c.password === password && !c.accountLocked): Agents.find((a)=>a.username === username && a.password === password && !a.accountLocked))
    {
      console.log(`Login successful. Redirecting to homepage. This is a ${userType} signing in`
      );
      return { auth: "Sucessful", user: String(userType) };
    }
    else if (String(userType) === "Customer" ? Customers.find((c)=>c.username === username && c.password === password && c.accountLocked): Agents.find((a)=>a.username === username && a.password === password && a.accountLocked))
    {
      loginAttempts++;
      if (loginAttempts >= 5) {
        accountLocked = true;
        console.log("Too many login attempts. Account locked for 30 minutes.");

        setTimeout(() => {
          accountLocked = false;
          loginAttempts = 0;
          console.log("Account unlocked. You can now attempt to login again.");
        }, 30 * 60 * 1000);
       return {auth: "Unsucessful", user: String(userType)};
    }

    }


  }*/


// const serFound = {}
//   const uerFound = (username, password, userType) =>{
//     if (String(userType) === "Customer")
//     {
//       if(Customers.find((c) => c.username === username && c.password === password && !c.accountLocked))
//       {
//         console.log(`Login successful. Redirecting to homepage. This is a ${userType} signing in`
//         );
//         return { auth: "Sucessful", user: String(userType) };
//       }
//       else if ()
//     }
//   (userType === "Customer"
//     ? Customers.find((c) => c.username === username && c.password === password ? !c.accountLocked ? true ) 
//     : Agents.find((a) => a.username === username && a.password === password && !a.accountLocked));
//   }



// //This should be inside database as well tagged to user , update database when acc is locked
//   if (accountLocked) {
//     console.log("Account is locked. Please try again later.");
//     return { message: "Account is locked. Please try again later." };
//   }



//   const userfound = users.find(
//     (u) => u.username === username && u.password === password
//   );

//   if (userfound) {
//     console.log(
//       `Login successful. Redirecting to homepage. This is a ${user} signing in`
//     );

//     return { auth: "Sucessful" };
//     // Insert redirect to homepage
//     //This i think we can route in frontend --Jia Jiunn
//   } else {
//     // Check for exceeded attempts after failed login
//     loginAttempts++;
//     if (loginAttempts >= 5) {
//       accountLocked = true;
//       console.log("Too many login attempts. Account locked for 30 minutes.");

//       setTimeout(() => {
//         accountLocked = false;
//         loginAttempts = 0;
//         console.log("Account unlocked. You can now attempt to login again.");
//       }, 30 * 60 * 1000);
//       return { message: "Account locked due to too many failed attempts" };
//     } else {
//       console.log("Invalid login. Please check your username and password.");
//       return { message: "Invalid username or password" };
//     }
//   }
// }

// Example usage:
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Enter Username: ', (user_name) => {
//     rl.question('Enter Password: ', (pass_word) => {
//         login(user_name, pass_word);
//         rl.close();
//     });
// });
