# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if using TypeScript)
# Uncomment the following line if your project uses TypeScript
# RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the application port (change if your app uses a different port)
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]  # Adjust the entry point based on your build output
