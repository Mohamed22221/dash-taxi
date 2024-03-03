# Stage 1: Build the React application
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install -f

# Copy the entire React application source code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Create the Nginx image
FROM nginx:alpine

# Copy the production-ready build files from the first stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file for this application
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Remove the React app source code folder to reduce image size
RUN rm -rf /app

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
