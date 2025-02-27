
FROM node:23.0
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 5001

#run comand
CMD ["npm", "start"]
