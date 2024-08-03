FROM node:18.16.0 as build-stage
EXPOSE 4173
RUN mkdir -p /app 
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 100000
COPY . .
RUN yarn run build
CMD [ "yarn", "run", "preview"]