FROM node:11.3.0-alpine
# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

EXPOSE 5006

CMD ["npm" ,"start" ]