# RentLah : A real estate web application

<p align="center">
  <img src="./frontend/src/assets/Login Choice Screenshot.png" alt="RentLah Login Choice Image" width="800"/>
</p>

<p>
  <img src="./frontend/src/assets/react.svg" alt="React Logo" style="width: 50px; height: 50px;"/>
  <img src="./frontend/src/assets/mongodb.png" alt="MongoDb logo" style="width: 50px; height: 50px;"/>
  <img src="./frontend/src/assets/expressserver.png" alt="Express.js logo" style="width: 100px; height: 50px;"/>
  <img src="./frontend/src/assets/nodejs.jpg" alt="Node.js logo" style="width: 100px; height: 50px;"/>
  <img src="./frontend/src/assets/firebase.png" alt="Firebase logo" style="width: 100px; height: 50px;"/>
  <img src="./frontend/src/assets/git.png" alt="git logo"style="width: 50px; height: 50px;"/>
</p>

To run this web applicaton, clone this file, then cd into your working directory:

Then run the following code to launch the front end:  

```
cd RentLah/frontend
npm i
npm run dev
```

Paste the link into your browser.  

Open a new terminal.  

Then go back to the RentLah directory and  

```
cd backend
```

Now in the backend directory, create a file with the name **.env**  

Inside the **.env** file, key in the following:  

**Note: Replace <...> with your own secret key and MongoDB uri**  


```
JWT_SECRET=<Your secret key>
MONGO=<Your MongoDB uri>
VITE_FIREBASE_API_KEY = "<Your firebase key>"
PASSWORD="<Your generated app password from Google Account>"
EMAIL="<Your gmail email address>"
```
Then in the backend directory, run the following:  

```
npm i
npm run dev
```
