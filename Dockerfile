FROM openlabs/docker-wkhtmltopdf:latest
MAINTAINER Emanuel Jöbstl <emanuel.joebstl@gmail.com>

# Install dependencies for running web service
RUN apt-get -y install nodejs npm

RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

COPY ./package.json /usr/src/app/server
RUN npm install
COPY ./src/ /usr/src/app/server/src/
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm run compile
ENV SERVICE_PORT 80
EXPOSE 80

ENTRYPOINT ["/usr/bin/nodejs"]
CMD ["/usr/src/app/server/compiled/index.js"]
