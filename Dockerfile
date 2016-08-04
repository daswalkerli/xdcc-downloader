FROM node:4
MAINTAINER Jérémie Drouet <jeremie.drouet@gmail.com>

COPY . /code
WORKDIR /code

RUN mkdir /data \
  && apt-get update \
  && apt-get install -y libicu-dev \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && npm install

CMD node .
