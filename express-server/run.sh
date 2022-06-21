#!/bin/bash
set -e
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
echo Running npm install --production
npm install
echo Starting the server...
npm run serve
