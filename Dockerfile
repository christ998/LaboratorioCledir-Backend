FROM node:12-alpine3.12 AS build
WORKDIR /lab-backend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]