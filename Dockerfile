FROM node:16-alpine as base
RUN apk update
WORKDIR /app

ARG SCOPE
ENV SCOPE $SCOPE

ARG PORT
ENV PORT $PORT

# Install libs
# Only copy package.jsons, so don't have to reinstall deps on file changes
FROM base as installer
COPY package.json yarn.lock ./
COPY apps/${SCOPE}/package.json apps/${SCOPE}/package.json

# Add libs here
COPY libs/phrase-gen/package.json libs/phrase-gen/package.json

RUN yarn --frozen-lockfile

FROM base as builder 
RUN yarn global add turbo
COPY turbo.json package.json yarn.lock ./
COPY apps/${SCOPE} apps/${SCOPE}
COPY libs libs
COPY --from=installer /app/node_modules ./node_modules
RUN turbo run build --scope=${SCOPE} --include-dependencies

FROM builder
EXPOSE ${PORT}
CMD yarn workspace ${SCOPE} start