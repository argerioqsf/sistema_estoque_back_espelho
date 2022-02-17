FROM node:12.3.1

WORKDIR /node-app

COPY ["package.json", "package-lock.json", "./"]

RUN ls

RUN npm install --production

# Descomente abaixo para modo developer
RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 3333

# Descomente abaixo para modo developer
CMD nodemon -L --watch . app.js

# Comente abaixo para modo developer
# CMD ["node", "app.js"]