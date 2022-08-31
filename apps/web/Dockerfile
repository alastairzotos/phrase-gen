FROM node:14-slim As development

COPY /libs/ ./libs/

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "start"]
