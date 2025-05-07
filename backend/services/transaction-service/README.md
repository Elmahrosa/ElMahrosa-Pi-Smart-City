# ElMahrosa Pi Smart City Transaction Service

## Description

The **ElMahrosa Pi Smart City Transaction Service** is a Node.js-based microservice designed to handle transactions for the ElMahrosa Pi Smart City project. This service provides a RESTful API for creating, retrieving, and managing transactions associated with various projects and users within the smart city ecosystem.

## Features

- Create transactions for specific projects and users.
- Retrieve transactions by ID, project ID, and user ID.
- Built with TypeScript for type safety and maintainability.
- Uses MongoDB for data persistence.
- Comprehensive testing with Jest.
- Linting and formatting with ESLint and Prettier.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Elmahrosa/elmahrosa-pi-smart-city-transaction-service.git
   cd elmahrosa-pi-smart-city-transaction-service
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/elmahrosa
   PORT=3000
   ```

   Adjust the `MONGODB_URI` to point to your MongoDB instance.

## Usage

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start the application:**

   ```bash
   npm start
   ```

   The application will be running on `http://localhost:3000`.

3. **Development mode:**

   For development, you can use `nodemon` to automatically restart the server on file changes:

   ```bash
   npm run dev
   ```

## API Documentation

### Create Transaction

- **Endpoint:** `POST /api/transactions`
- **Request Body:**
  ```json
  {
    "projectId": "string",
    "userId": "string",
    "amount": number
  }
  ```
- **Response:**
  - **201 Created**: Returns the created transaction object.
  - **400 Bad Request**: If the request body is invalid.

### Get Transaction by ID

- **Endpoint:** `GET /api/transactions/:id`
- **Response:**
  - **200 OK**: Returns the transaction object.
  - **404 Not Found**: If the transaction does not exist.

### Get Transactions by Project ID

- **Endpoint:** `GET /api/projects/:projectId/transactions`
- **Response:**
  - **200 OK**: Returns an array of transactions for the specified project.

### Get Transactions by User ID

- **Endpoint:** `GET /api/users/:userId/transactions`
- **Response:**
  - **200 OK**: Returns an array of transactions for the specified user.

## Testing

To run the tests, use the following command:

```bash
npm test
```

This will execute the test suite using Jest.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
