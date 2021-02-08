# todo-app-backend
Backend code for todo-app

# Technology
Node, Express, Mysql

# Prerequisites
1) Make sure node is installed before running the application.

# Running application locally
1) Make sure nodemon is installed globally
2) Update the environment variables in nodemon.json file as shown below:
    DB_HOST: <DB_HOST_NAME> e.g: 'localhost'
    DB_USER: <DB_USER> e.g.: 'root'
    DB_PWD: <DB_PASSWORD>
    DB_NAME: <DB_CONNECTION_NAME>
    PORT: <SERVER_PORT>
    JWT_KET: <KEY_TO_SIGN_JWT>
 3) You can run the application in dev mode by running the command: npm run server
