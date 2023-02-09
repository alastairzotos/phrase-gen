FROM node:14-slim As development

ENV NEXT_PUBLIC_API_URL=https://phrase-gen-api.bitmetro.io
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=417389414400-vig6vjcsj4uj0kujoscrnj9oj9n5jn24.apps.googleusercontent.com
ENV NEXT_PUBLIC_FB_APP_ID=768507144435011

ADD libs libs

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "start"]
