# ==== BUILD IMAGE
FROM node:20 as build-env

# Copy All
COPY ./nest /src

# set the workdir
WORKDIR /src

RUN ls -all

RUN apt-get update && apt-get upgrade -y

# install whole stuff
RUN npm install
RUN npm run build:libs:all
RUN npm run build:apps:yumio

# ==== RUNTIME IMAGE
# change to alpine later
FROM node:20 as runtime  

RUN apt-get update && apt-get upgrade -y

COPY --from=build-env src/dist/apps/yumio src/

# cause bundler for some reason does not work, we should be able to drop at is some point
COPY --from=build-env src/node_modules src/node_modules

WORKDIR /src

# try to load new relic without the experimental loader
CMD ["node", "-r", "dotenv/config",  "main.js", "--insecure-http-parser"]

EXPOSE 4000
