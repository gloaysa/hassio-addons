ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8

ADD package.json /

RUN \
    apk add --no-cache \
        nodejs \
        npm

RUN npm install -g typescript
# Copy data for add-on
COPY server /
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
