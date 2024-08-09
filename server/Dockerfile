FROM node:22-alpine

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE ${PORT:-3000}

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run start; else npm run dev; fi"]
