FROM node:latest as builder
WORKDIR /usr/src/app
ENV PATH /usr/src/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . ./

FROM builder as dev
CMD ["npm", "run", "dev"]

FROM builder as prod-builder
RUN npm run build

FROM nginx:latest as prod

COPY --from=prod-builder /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]