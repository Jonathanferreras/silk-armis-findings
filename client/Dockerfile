FROM node:22-alpine

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=optional

COPY . .

RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 5173

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run preview; else npm run dev; fi"]

