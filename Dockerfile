FROM node:14.13.1 AS build-stage

WORKDIR /opt/ng
COPY package.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH" 

COPY e2e ./e2e
COPY src ./src
COPY *.json ./
COPY *.js ./
RUN ng build --prod

FROM nginx:1.19.2-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /opt/ng/dist/front-app /usr/share/nginx/html