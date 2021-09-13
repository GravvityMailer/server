# Automated Crypto Newsletter Server

![JavaScript](https://img.shields.io/badge/-JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![Nodejs](https://img.shields.io/badge/-Nodejs-339933?style=flat-square&logo=Node.js&logoColor=white)
![AWS](https://img.shields.io/badge/-AWS-232f3e?style=flat-square&logo=amazonaws&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ed?style=flat-square&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47a248?style=flat-square&logo=mongodb&logoColor=white)

### Table of Contents  
- [Introduction](https://github.com/GravvityMailer/server#introduction)
- [Installation](https://github.com/GravvityMailer/server#installation)

## Introduction
Are you interested in cryptocurrency? If you are then I am sure that you'd like to get realtime updates of the markets and the coins.
Here comes Gravvity! Realtime updates of your favourite coins in just Single email. 

**You can Check the Website <a href='https://gravvity.in'>here</a>**

<img src='https://github.com/GravvityMailer/Webapp/blob/main/Screenshot%20from%202021-09-08%2019-42-33.png?raw=true' width="500" height="600"/>

## Installation
- Clone the git repository using the below code snippet:
```javascript
git clone https://github.com/GravvityMailer/server
```
- Change your current working directory to the project folder:
```javascript
cd server
```
- In the root of the project, make a new file **_.env_** to store the environment variables:
```javascript
touch .env
vi .env

DEV_DB_URI=mongodb+srv://username:<password>@cluster0.yrdvu.mongodb.net/dev?retryWrites=true&w=majority
PROD_DB_URI=mongodb+srv://username:<password>@cluster0.yrdvu.mongodb.net/prod?retryWrites=true&w=majority
DEV_API_KEY=sample_dev_api_key
PROD_API_KEY=sample_prod_api_key
LAMBDA_AUTH_TOKEN=sample_lambda_auth_token
```

- Install the required dependencies and start the server in dev mode:
```javascript
npm i && npm run dev
```
**Note:**
You must have **_NodeJs_, _npm_, _mongodb_, _docker_** installed in your system in order to run the project properly


### Contributions are Welcome :heart:
