FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install react-scripts
RUN npm install react-router-dom --save
RUN npm install

COPY . .

CMD ["npm", "start"]
