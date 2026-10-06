FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npx prisma generate

RUN npm run build 


FROM node:20-slim as prod 

WORKDIR /app 

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma7.config.ts ./prisma7.config.ts

EXPOSE 3000

CMD [ "node" , "dist/index.js"]
