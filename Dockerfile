FROM node:alpine3.17
WORKDIR /usr/code
COPY package*.json /usr/code
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
#change to start:prod after deployment