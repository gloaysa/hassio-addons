ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8

RUN \
    apk add --no-cache \
        nodejs \
        npm

RUN npm install -g typescript

# Copy data for add-on
COPY package.json /addon/
COPY package-lock.json /addon/
COPY server /addon/server/
COPY client /addon/client/
COPY run.sh /addon/

WORKDIR /addon

RUN chmod a+x ./run.sh

CMD [ "./run.sh" ]
