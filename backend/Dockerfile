FROM node:latest
RUN mkdir /work
WORKDIR /work
COPY serverside .
RUN npm install
EXPOSE 8080
CMD ["node", "server.cjs"]
