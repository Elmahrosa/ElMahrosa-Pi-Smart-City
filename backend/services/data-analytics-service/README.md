# Data Analytics Service

A high-performance service for logging and analyzing user actions in projects, built with TypeScript and Node.js. This service provides a robust API for tracking user interactions and generating analytics data.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Log user actions with metadata.
- Retrieve analytics data by user and project.
- Support for various action types.
- Built with TypeScript for type safety.
- RESTful API for easy integration.
- Comprehensive testing with Jest.

## Technologies

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing analytics data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **TypeScript**: Superset of JavaScript that adds static types.
- **Jest**: Testing framework for JavaScript.
- **ESLint**: Linter for identifying and fixing problems in JavaScript code.
- **Prettier**: Code formatter for maintaining consistent style.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Elmahrosa/Elmahrosa-Pi-Smart-City.git
   cd Elmahrosa-Pi-Smart-City/data-analytics-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/data-analytics
   PORT=3000
   ```

4. Build the TypeScript code:

   ```bash
   npm run build
   ```

## Usage

To start the server, run:

```bash
npm start
```

The server will be running on `http://localhost:3000`.

## API Documentation

### Log User Action

**Endpoint**: `POST /api/actions`

**Request Body**:
```json
{
  "userId": "string",
  "projectId": "string",
  "action": "string",
  "metadata": {
    "key": "value"
  }
}
```

**Response**:
- **201 Created**: Action logged successfully.
- **400 Bad Request**: Invalid input.

### Get Analytics by User and Project

**Endpoint**: `GET /api/analytics`

**Query Parameters**:
- `userId`: The ID of the user.
- `projectId`: The ID of the project.

**Response**:
- **200 OK**: Returns an array of analytics entries.

### Get Analytics by Action

**Endpoint**: `GET /api/analytics/action`

**Query Parameters**:
- `action`: The action type to filter by.

**Response**:
- **200 OK**: Returns an array of analytics entries for the specified action.

## Testing

To run the tests, use the following command:

```bash
npm test
```

This will execute the test suite using Jest and provide coverage reports.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
