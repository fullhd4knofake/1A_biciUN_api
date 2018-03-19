FROM node:carbon-slim
# Create app directory
WORKDIR /git/biciUN-api

# Install app dependencies
COPY package.json /git/biciUN-api/
RUN npm install

# Bundle app source
COPY . /git/biciUN-api/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
