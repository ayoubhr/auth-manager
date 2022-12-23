# Auth Middleware Manager
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)<br>

###### *This project consists of a NodeJS RESTful API with two main features:* <br>

* A user registering and JWT authentication feature.

* A middleware layer that is gatekeeped with a JWT token verification.

## Structure of the application

###### *There is two different routes a request to the auth-manager can take:* <br>

* Auth route: this route leads to an internal service layer that is host to the register() and login() user functions.

* Middleware route: this route leads to a controller layer where requests to 3rd party services can be placed.

As was described previously, the middleware route endpoints are secured with the _"VerifyToken"_ helper that sits on the helpers folder inside the api. The Auth route path is open and accesible without verification.

To make code modular and more readable, both routes are held in their own specific file that then gets exported into a general _RouteTable_ class that is then passed into our _Express_ application upon initialization.

###### *Test cases:* <br>

![ScreenShot](https://gyazo.com/c37711d579456b5dcd1a49b133e38aaa)

###### *Relevant commands:* <br>

* npm run dev: runs ts-node-dev on index.ts for development purposes.

* npm test: transpiles the typescript application into a javascript module in the /dist folder and then runs the test cases with _Mocha_.

* npm start: transpiles the typescript application into a javascript module in the /dist folder and then runs the application.

###### *How to launch:* <br>

1. npm install.
2. npm run dev or npm start.
