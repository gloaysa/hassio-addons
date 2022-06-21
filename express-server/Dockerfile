ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8

RUN \
    apk add --no-cache \
        nodejs \
        npm

RUN npm install -g typescript

# Copy data for add-on
COPY package.json /server/
COPY package-lock.json /server/
COPY tsconfig.json /server/
COPY src /server/src
COPY run.sh /server/

WORKDIR /server

RUN chmod a+x ./run.sh

CMD [ "./run.sh" ]
