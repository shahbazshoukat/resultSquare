#!/bin/bash

if [[ -z "${WEBAPP_FQDN}" ]];then
  echo "Environment variables not set, build aborted."
  exit 1
else
  sed -i "s/.*appVersion.*/  \"appVersion\": \"${WEB_APP_VERSION}\"/g" /usr/local/onboarding-webapp/dist/assets/data/appConfig.json
  sed -i "s/WEBAPP_FQDN/${WEBAPP_FQDN}/g" /etc/nginx/conf.d/default
  sed -i "s/WEBAPP_FQDN/${WEBAPP_FQDN}/g" /etc/nginx/sites-available/default
  nginx -g "daemon off;"
fi
