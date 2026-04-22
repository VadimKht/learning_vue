#FROM nginx:alpine
FROM node:latest
RUN mkdir myapp
WORKDIR /myapp
#RUN npm install http-server
COPY frontend /myapp
RUN npm install
#RUN cd /myapp
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "run", "dev"]
