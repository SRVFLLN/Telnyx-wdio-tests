FROM node:current-alpine3.15

WORKDIR /usr/app/tests
RUN apk update
RUN apk add git
RUN apk add chromium
RUN apk update && apk add --no-cache bash \
        alsa-lib \
        at-spi2-atk \
        atk \
        cairo \
        cups-libs \
        dbus-libs \
        eudev-libs \
        expat \
        flac \
        gdk-pixbuf \
        glib \
        libgcc \
        libjpeg-turbo \
        libpng \
        libwebp \
        libx11 \
        libxcomposite \
        libxdamage \
        libxext \
        libxfixes \
        tzdata \
        libexif \
        udev \
        xvfb \
        zlib-dev \
        chromium \
        chromium-chromedriver
RUN CHROMEDRIVER_FILEPATH = '/usr/bin/chromedriver'
RUN apk add firefox
RUN apk add openjdk11
RUN git clone https://github.com/SRVFLLN/Telnyx-wdio-tests /usr/app/tests
RUN cd /usr/app/tests
RUN npm ci
RUN npm run test:all