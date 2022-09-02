# FROM node:16-alpine as base
# RUN apk update
# WORKDIR /app

# ARG SCOPE
# ENV SCOPE $SCOPE

# ARG PORT
# ENV PORT $PORT

# # Install dependencies
# FROM base as installer
# COPY package.json yarn.lock ./
# COPY apps/${SCOPE}/package.json apps/${SCOPE}/package.json

# # Add libs here
# COPY libs/phrase-gen/package.json libs/phrase-gen/package.json

# RUN yarn --frozen-lockfile

# # Build
# FROM base as builder 
# RUN yarn global add turbo
# COPY turbo.json package.json yarn.lock ./
# COPY apps/${SCOPE} apps/${SCOPE}
# COPY libs libs
# COPY --from=installer /app/node_modules ./node_modules
# RUN turbo run build --scope=${SCOPE} --include-dependencies

# FROM builder
# EXPOSE ${PORT}
# CMD yarn workspace ${SCOPE} start

FROM node:16-alpine
RUN apk update

ARG SCOPE
ENV SCOPE $SCOPE

ARG PORT
ENV PORT $PORT

ARG FRONTEND_URL
ENV FRONTEND_URL $FRONTEND_URL
ARG JWT_SIGNING_KEY
ENV JWT_SIGNING_KEY $JWT_SIGNING_KEY
ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID $GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ENV GOOGLE_CLIENT_SECRET $GOOGLE_CLIENT_SECRET
ARG FB_APP_ID
ENV FB_APP_ID $FB_APP_ID
ARG FB_APP_SECRET
ENV FB_APP_SECRET $FB_APP_SECRET
ARG DB_CONNECTION_STRING
ENV DB_CONNECTION_STRING $DB_CONNECTION_STRING

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL $NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID $NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_FB_APP_ID
ENV NEXT_PUBLIC_FB_APP_ID $NEXT_PUBLIC_FB_APP_ID

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
COPY apps/${SCOPE}/package.json apps/${SCOPE}/package.json

# Add libs here
COPY libs/phrase-gen/package.json libs/phrase-gen/package.json
COPY libs/dtos/package.json libs/dtos/package.json

RUN yarn --frozen-lockfile

# Build
RUN yarn global add turbo
COPY turbo.json package.json yarn.lock ./
COPY apps/${SCOPE} apps/${SCOPE}
COPY libs libs
RUN turbo run build --scope=${SCOPE} --include-dependencies

EXPOSE ${PORT}
CMD yarn workspace ${SCOPE} start