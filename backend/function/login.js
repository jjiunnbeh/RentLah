//i will link the DB with mongoDB later, in this demo i just use const users as db to retrieve data

// const readline = require('readline');
let loginAttempts = 0;
let accountLocked = false;
//test database
const Customers = [
  { username: "customer1", password: "customer1" , accountLocked:false, user:"Customer"},
  { username: "customer2", password: "customer2", accountLocked:false, user: "Customer"},
];
const Agents = [
  { username: "agent1", password: "agent1" , accountLocked:false, user:"Customer"},
  { username: "agent2", password: "agent2", accountLocked:false, user: "Customer"},
];
export default function login(username, password, user) {
  //Check which type of user is signing in and go to the respective database
  const userFound = (username, password, userType) =>{
    if (String(userType) === "Customer")
    {
      if(Customers.find((c) => c.username === username && c.password === password && !c.accountLocked))
      {
        return true;
      }
      else if 
    }
  (userType === "Customer"
    ? Customers.find((c) => c.username === username && c.password === password ? !c.accountLocked ? true ) 
    : Agents.find((a) => a.username === username && a.password === password && !a.accountLocked));
  }



//This should be inside database as well tagged to user , update database when acc is locked
  if (accountLocked) {
    console.log("Account is locked. Please try again later.");
    return { message: "Account is locked. Please try again later." };
  }



  const userfound = users.find(
    (u) => u.username === username && u.password === password
  );

  if (userfound) {
    console.log(
      `Login successful. Redirecting to homepage. This is a ${user} signing in`
    );

    return { auth: "Sucessful" };
    // Insert redirect to homepage
    //This i think we can route in frontend --Jia Jiunn
  } else {
    // Check for exceeded attempts after failed login
    loginAttempts++;
    if (loginAttempts >= 5) {
      accountLocked = true;
      console.log("Too many login attempts. Account locked for 30 minutes.");

      setTimeout(() => {
        accountLocked = false;
        loginAttempts = 0;
        console.log("Account unlocked. You can now attempt to login again.");
      }, 30 * 60 * 1000);
      return { message: "Account locked due to too many failed attempts" };
    } else {
      console.log("Invalid login. Please check your username and password.");
      return { message: "Invalid username or password" };
    }
  }
}

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
