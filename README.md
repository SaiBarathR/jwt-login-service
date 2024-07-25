# Node.js JWT Authentication Server

A Node.js server providing JWT authentication for a sign-in/sign-up client.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)  
4. [Docker](#docker)      
5. [Configuration](#configuration)
6. [API Endpoints](#api-endpoints)
7. [Usage](#usage)
8. [Client Information](#client-information)
9. [Client Repository](#client-repository)
10. [Dependencies](#dependencies)
11. [License](#license)

## Introduction

This Node.js authentication server is designed to provide JWT authentication for a sign-in/sign-up client. It includes Google Sign-In integration, manual sign-up/sign-in, and user management features. The server is built using Node.js, Express, Sequelize, and PostgreSQL. It is designed to be used with a CORS-enabled client application. The client application can be found [here](https://github.com/SaiBarathR/login-page-with-jwt-auth-one-tap-sign-in).

## Prerequisites

Ensure you have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)
- PostgreSQL (as per the configuration, you can modify it for other databases)
- Google API key and OAuth credentials (see [Google Sign-In](https://developers.google.com/identity/gsi/web/guides/overview) for more information)
- A CORS-enabled client application (see [Client Information](#client-information))

## Installation

To install and run the server locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/SaiBarathR/jwt-login-node-service.git
    ```

2. Navigate to the project directory:

    ```bash
    cd jwt-login-node-service
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    npm start
    ```

## Docker

To run the server using Docker, follow these steps:

1. Follow the steps 1 & 2 in [Installation](#installation) to clone the repository and navigate to the project directory.
    
2. Build the Docker image:

    ```bash
    docker build -t jwt-login-node-service .
    ```
3. Run the Docker container:

    ```bash
    docker run -p 8080:8080 jwt-login-node-service
    ```    

## Configuration

Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
GOOGLE_CLIENT_ID= # Google client ID for OAuth.
GOOGLE_CLIENT_SECRET= # Google client secret for OAuth.
GOOGLE_API_KEY= # Google API key.
AUTH_SECRET= # Secret key for JWT authentication.
CORS_URLS= # Comma-separated list of allowed CORS URLs.
MODE= # Development mode.
```
Configure the PostgreSQL database settings in the environment variables as follows:

```bash
DB_HOST= # Database host.
DB_USER= # Database user.
DB_PASS= # Database password.
DB_NAME= # Database name.
DB_DIALECT= # Database dialect.
```

## API Endpoints

### Authentication Endpoints

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/signin**: Sign in with account and password.
- **POST /api/auth/googleSignIn**: Sign in/register with Google.

### User Management Endpoints

- **GET /api/test/all**: Public content.
- **GET /api/test/user**: User content (requires authentication).
- **POST /api/userInfo**: Get user information (requires authentication).
- **DELETE /api/deleteAccount/:type/:account**: Delete user account (requires authentication).

## Usage

1. **Sign Up**

    ```bash
    POST /api/auth/signup
    ```

    Parameters:
    - `account`: User's account.
    - `password`: User's password (optional).
    - `name`: User's name.
    - `age`: User's age.
    - `gender`: User's gender.
    - `photo`: User's photo URL (optional).

2. **Sign In**

    ```bash
    POST /api/auth/signin
    ```

    Parameters:
    - `account`: User's account.
    - `password`: User's password.

3. **Google Sign-In**

    ```bash
    POST /api/auth/googleSignIn
    ```

    Parameters:
    - `code`: Authorization code from Google OAuth.

4. **Get User Information**

    ```bash
    POST /api/userInfo
    ```

    Requires authentication.

5. **Delete User Account**

    ```bash
    DELETE /api/deleteAccount/:type/:account
    ```

    Requires authentication.

## Client Information

- [Client Website](https://login-page-with-jwt-auth-one-tap-sign.netlify.app/login)
- [Client Repository](https://github.com/SaiBarathR/login-page-with-jwt-auth-one-tap-sign-in)

## Dependencies

- `bcryptjs`: Password hashing.
- `cors`: Cross-Origin Resource Sharing.
- `dotenv`: Environment variable management.
- `express`: Web application framework.
- `google-auth-library`: Google OAuth library.
- `jsonwebtoken`: JSON Web Token implementation.
- `node-fetch`: HTTP requests.
- `nodemon`: Development server auto-restart.
- `pg`: PostgreSQL client for Node.js.
- `sequelize`: SQL ORM for Node.js.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.