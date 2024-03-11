//i will link the DB with mongoDB later, in this demo i just use const users as db to retrieve data

// const readline = require('readline');

let loginAttempts = 0;
let accountLocked = false;

function login(username, password) {
    if (accountLocked) {
        console.log('Account is locked. Please try again later.');
        return;
    }

    const users = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' }
    ];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        console.log('Login successful. Redirecting to homepage.');
        //insert redirect to homepage
    } else {
        loginAttempts++;

        if (loginAttempts >= 5) {
            accountLocked = true;
            console.log('Too many login attempts. Account locked for 30 minutes.');
            setTimeout(() => {
                accountLocked = false;
                loginAttempts = 0;
                console.log('Account unlocked. You can now attempt to login again.');
            }, 30 * 60 * 1000);
        } else {
            console.log('Invalid login. Please check your username and password.');
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
