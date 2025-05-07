# ElMahrosa Pi Smart City - Auth Service

Welcome to the **Auth Service** of the ElMahrosa Pi Smart City project. This service handles user authentication, registration, email verification, password management, and role-based access control.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration with email verification
- Secure password hashing and storage
- JWT-based authentication
- Role-based access control (Admin/User)
- Password reset functionality
- Input validation using express-validator
- Comprehensive logging with Winston
- Environment variable management with dotenv

## Technologies Used

- **Node.js**: JavaScript runtime for building the server
- **TypeScript**: Superset of JavaScript for type safety
- **Express**: Web framework for building APIs
- **Mongoose**: ODM for MongoDB
- **bcrypt**: Library for hashing passwords
- **jsonwebtoken**: Library for creating and verifying JWTs
- **nodemailer**: For sending verification and password reset emails
- **winston**: Logging library for better debugging and monitoring
- **dotenv**: For managing environment variables

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Elmahrosa/elmahrosa-pi-smart-city.git
   cd elmahrosa-pi-smart-city/auth-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/elmahrosa
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. Build the TypeScript files:

   ```bash
   npm run build
   ```

5. Start the server:

   ```bash
   npm start
   ```

## Configuration

The service can be configured using environment variables defined in the `.env` file. Here are the key variables:

- `PORT`: The port on which the server will run.
- `MONGODB_URI`: The connection string for your MongoDB database.
- `JWT_SECRET`: Secret key used for signing JWT tokens.
- `EMAIL_USER`: Email address used for sending verification and reset emails.
- `EMAIL_PASS`: Password for the email account.

## API Endpoints

### User Registration

- **POST** `/api/auth/register`
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - Response:
    - 201 Created: User registered successfully.
    - 400 Bad Request: Validation errors or email already in use.

### User Login

- **POST** `/api/auth/login`
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - Response:
    - 200 OK: Returns a JWT token.
    - 400 Bad Request: Invalid credentials.

### Email Verification

- **GET** `/api/auth/verify/:token`
  - Response:
    - 200 OK: Email verified successfully.
    - 400 Bad Request: Invalid or expired token.

### Password Reset Request

- **POST** `/api/auth/reset-password`
  - Request Body:
    ```json
    {
      "email": "user@example.com"
    }
    ```
  - Response:
    - 200 OK: Password reset email sent.
    - 404 Not Found: User not found.

### Password Reset

- **POST** `/api/auth/reset/:token`
  - Request Body:
    ```json
    {
      "password": "newpassword"
    }
    ```
  - Response:
    - 200 OK: Password reset successfully.
    - 400 Bad Request: Invalid or expired token.

## Testing

To run the tests for the Auth Service, use the following command:

```bash
npm test
```

This will execute the test suite using Jest and provide coverage reports.

## Contributing

We welcome contributions to the Auth Service! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear messages.
4. Push your branch to your forked repository.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please reach out to the project maintainer at info@elmahrosa-expo.com.
