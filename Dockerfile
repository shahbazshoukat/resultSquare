########################################
# Setting Docker Node
########################################

FROM node:12

########################################
# Setting root user
########################################

USER root

ENV HOME=/usr/local/resultsquare-webapp

########################################
# Creating Directory
########################################

RUN mkdir $HOME && \
    apt-get -qqy update && \
    apt-get -qqy --no-install-recommends install \
    nginx && \
    rm -rf /var/lib/apt/lists/*

########################################
# Setting Code directory
########################################

WORKDIR $HOME

########################################
# Copying code
########################################

COPY ./ $HOME

########################################
# Installing dependencies and
# configuring nginx
########################################

RUN chmod 777 -R $HOME && \
    chmod 777 -R /usr/local/lib/node_modules/ && \
    npm config set user 0 && \
    npm config set unsafe-perm true && \
    npm install -g @angular/cli@8 typings && \
    npm install && npm install -g pm2 && \
    npm run build:ssr

########################################
# Expose port
########################################

EXPOSE 80

CMD ["pm2-docker", "dist/server.js", "--no-auto-exit"]
