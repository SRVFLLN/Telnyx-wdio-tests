FROM node:current-alpine3.15

WORKDIR /usr/app/tests
RUN apk update
RUN apk add git
RUN apk add wget
RUN apk add dpkg
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb
RUN apk add firefox
RUN git clone https://github.com/SRVFLLN/Telnyx-wdio-tests /usr/app/tests
RUN cd /usr/app/tests
RUN npm ci
RUN npm run test:all