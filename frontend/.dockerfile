# Use the official Node.js v22.12.0 LTS image as the base image
FROM node:22.12.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the backend server listens on
EXPOSE 3000

# Set the command to start the server
CMD ["npm", "start"]
