FROM node:carbon-slim
# Cambiar el academy por el nombre de nuestra app
# Create app directory
WORKDIR /git/academy-api

# Install app dependencies
COPY package.json /git/academy-api/
RUN npm install

# Bundle app source
COPY . /git/academy-api/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]