#Builds application
#1.use node 18 as the base
FROM node:18 as build-stage
#2. define the working directory
WORKDIR /build
#3. copy the source code
COPY . .
#4.Instal dependencies
RUN npm install
#5.build the application
RUN npm run build
 
#copies the static dist files and Node server files
#1.use node 18 as the base
FROM node:18 as production-stage
#2.define working directory
WORKDIR /app
#3. copy the package and serve files
COPY package.json main.js ./
#4.copy the static files
COPY --from=build-stage /build/dist/ dist/
#5. install dependencies
RUN npm install --omit=dev
#6. Build
RUN rm -rf build
#7. expose port 
EXPOSE 3032
#8. run application
CMD [ "node", "main.js" ]