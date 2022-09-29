FROM node:current-alpine3.15

WORKDIR /usr/app/tests
RUN apk update
RUN apk add git
RUN apk add chromium chromium-chromedriver chromium-swiftshader
RUN apk add firefox
RUN apk add openjdk11
RUN git clone https://github.com/SRVFLLN/Telnyx-wdio-tests /usr/app/tests
RUN cd /usr/app/tests
RUN git checkout fixes
RUN npm ci
RUN CHROME_BIN=/usr/bin/chromium-browser
RUN CHROME_PATH=/usr/lib/chromium
RUN npm run test:all:docker