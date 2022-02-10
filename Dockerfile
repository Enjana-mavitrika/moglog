# Specify a base image
# alpine => means the minimal version of the node image
FROM node:16-alpine as builder

# specify working directory for the app
WORKDIR '/app'

# install some dependencies
COPY ./ ./
RUN npm install
RUN npm run build 

FROM nginx
EXPOSE 80
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/turing-gallery /usr/share/nginx/html
