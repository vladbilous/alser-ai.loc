FROM nginx:alpine

# Copy the static website files to the default nginx public folder
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
