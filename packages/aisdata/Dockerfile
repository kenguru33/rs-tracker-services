FROM node:12-alpine as build

WORKDIR /app
ARG NPM_TOKEN
RUN echo //registry.npmjs.org/:_authToken=$NPM_TOKEN > .npmrc  
COPY package.json .
RUN npm install
RUN rm -f .npmrc
COPY . .

# Do multistage build to prevent leaving the npm token in build layer
FROM build
WORKDIR /app
COPY --from=build ./app .

CMD ["npm", "start:prod"]