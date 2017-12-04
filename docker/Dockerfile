FROM node:argon

MAINTAINER Vladimir Pasechnik <vladimir.pasechnik@gmail.com>
RUN npm install npm -g

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle app source
COPY bin /app/bin/
COPY build /app/build/
COPY config /app/config/
COPY dist /app/dist/
COPY node_modules /app/node_modules/
COPY server /app/server/
COPY src /app/src/
COPY .babelrc /app/
COPY package.json /app/
RUN ls -alF /app

ENV HOST "0.0.0.0"
ENV PORT "3000"
ENV NODE_ENV "production"
EXPOSE 3000

RUN npm install
RUN npm run robocss
RUN npm run bootstrap

CMD ["start:prod"]
ENTRYPOINT ["npm", "run"]
