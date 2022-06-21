ARG BUILD_FROM
FROM BUILD_FROM

ENV LANG C.UTF-8

COPY package.json /server/

RUN \
    apk add --no-cache \
        nodejs \
        npm

RUN npm install -g typescript

# Copy data for add-on
COPY server /server

COPY run.sh /server/

RUN ls /server

RUN chmod a+x /server/run.sh

CMD [ "/server/run.sh" ]
