# ElMahrosa Pi Smart City - Crowdfunding Service

Welcome to the **ElMahrosa Pi Smart City** crowdfunding service! This service is designed to facilitate crowdfunding for innovative projects within the ElMahrosa Smart City initiative. It allows users to create projects, contribute funds, and track project progress.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Running Tests](#running-tests)
- [Docker Support](#docker-support)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User authentication and authorization
- Create and manage crowdfunding projects
- Contribute to projects and track funding progress
- Input validation and error handling
- Comprehensive logging and monitoring
- RESTful API for easy integration
- Docker support for containerization

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application
- **TypeScript**: Superset of JavaScript for type safety and better tooling
- **Express**: Web framework for building APIs
- **MongoDB**: NoSQL database for storing project and user data
- **Mongoose**: ODM for MongoDB to manage data models
- **JWT**: JSON Web Tokens for secure authentication
- **Jest**: Testing framework for unit and integration tests
- **Docker**: Containerization for easy deployment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Elmahrosa/elmahrosa-pi-smart-city.git
   cd elmahrosa-pi-smart-city/crowdfunding-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/elmahrosa
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. Build the TypeScript files:

   ```bash
   npm run build
   ```

5. Start the application:

   ```bash
   npm start
   ```

The application will be running on `http://localhost:3000`.

## API Documentation

### Authentication

- **POST /api/auth/login**
  - Request body: `{ "email": "user@example.com", "password": "yourpassword" }`
  - Response: `{ "token": "your_jwt_token" }`

### Projects

- **POST /api/projects**
  - Create a new crowdfunding project.
  - Requires authentication.
  - Request body: `{ "title": "Project Title", "description": "Project Description", "fundingGoal": 1000, "deadline": "2023-12-31T23:59:59Z" }`
  - Response: Project details.

- **GET /api/projects/:id**
  - Retrieve a specific project by ID.
  - Response: Project details.

- **POST /api/projects/:id/contribute**
  - Contribute to a project.
  - Requires authentication.
  - Request body: `{ "amount": 500 }`
  - Response: Updated project funding details.

### Error Handling

The API returns appropriate HTTP status codes and error messages for invalid requests.

## Running Tests

To run the test suite, use the following command:

```bash
npm test
```

This will execute all unit and integration tests using Jest.

## Docker Support

### Build the Docker Image

To build the Docker image for the crowdfunding service, run:

```bash
npm run docker:build
```

### Run the Docker Container

To run the Docker container, execute:

```bash
npm run docker:run
```

The application will be accessible at `http://localhost:3000`.

## Contributing

We welcome contributions to the ElMahrosa Pi Smart City crowdfunding service! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please reach out to:

- **Email**: info@elmahrosa-expo.com
- **GitHub**: [Elmahrosa](https://github.com/Elmahrosa)

Thank you for your interest in the **ElMahrosa Pi Smart City** crowdfunding service! We hope you find it useful and engaging. Happy coding!
