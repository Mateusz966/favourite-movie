# Use the official Node.js image as the base image
FROM node:18

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your application runs on (adjust as needed)
EXPOSE $PORT

# Specify the command to run your application
CMD ["npm", "run", "start"]