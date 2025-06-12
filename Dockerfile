# Stage 1: Use a lightweight Nginx image as the base
FROM nginx:alpine

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy all the static assets from your project (HTML, CSS, JS, images, etc.)
# to the Nginx public directory
COPY . /usr/share/nginx/html/

# Expose port 80 to allow traffic to the web server
EXPOSE 80

# The default Nginx command will start the server, so no CMD is needed
