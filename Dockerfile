FROM node:current-alpine3.15

WORKDIR /usr/app/tests
RUN apk update
RUN apk add git
RUN apk add chromium
RUN CHROME_PATH='usr/lib/chromium'
RUN apk add firefox
RUN apk add openjdk11
RUN git clone https://github.com/SRVFLLN/Telnyx-wdio-tests /usr/app/tests
RUN cd /usr/app/tests
RUN npm ci
RUN npm run test:all