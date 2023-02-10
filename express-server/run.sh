#!/bin/bash
set -e

CONFIG="./config.txt"

if [ -n "$TZ" ] && [ -f /etc/localtime ]; then
     if [ -f /usr/share/zoneinfo/"$TZ" ]; then
         echo "Timezone set from $(cat /etc/timezone) to $TZ"
         ln -snf /usr/share/zoneinfo/"$TZ" /etc/localtime && echo "$TZ" >/etc/timezone
     fi
 fi

CONFIG_PATH=/data/options.json
CONNECTION_STRING="$(jq --raw-output '.connectionString' $CONFIG_PATH)"

echo Node Version
node -v
echo NPM version
npm -v
echo TypeScript version
tsc -v
echo Running npm install
npm install
echo Building and Starting the server...
npm run serve
