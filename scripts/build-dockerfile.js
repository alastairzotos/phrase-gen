const fs = require('fs');
const path = require('path');

const dockerfileTemplate = libs => `
FROM node:16-alpine as base
RUN apk update
WORKDIR /app

ARG SCOPE
ENV SCOPE $SCOPE

# Install libs
# Only copy package.jsons, so don't have to reinstall deps on file changes
FROM base as installer
COPY package.json yarn.lock ./
COPY apps/\${SCOPE}/package.json apps/\${SCOPE}/package.json
${libs.map(lib => `COPY libs/${lib}/package.json libs/${lib}/package.json`)}
RUN yarn --frozen-lockfile

FROM base as builder 
RUN yarn global add turbo
COPY turbo.json package.json yarn.lock ./
COPY apps/\${SCOPE} apps/\${SCOPE}
COPY libs libs
COPY --from=installer /app/node_modules ./node_modules
RUN turbo run build --scope=\${SCOPE} --include-dependencies

EXPOSE 3000

CMD yarn workspace \${SCOPE} start`;

const libs = fs.readdirSync(path.resolve(__dirname, '..', 'libs'));

fs.writeFileSync(path.resolve(__dirname, '..', 'Dockerfile'), dockerfileTemplate(libs));