ARG version=18.12

# as builder
FROM node
#//  :${version}-alpine

RUN apt-get update -y && apt-get upgrade -y && apt-get install wget -y && apt-get autoclean -y && apt-get autoremove -y
# Set the working directory to /app inside the container
WORKDIR /app

RUN npm install -g npm@latest

COPY ./package.json /app/package.json

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN (NODE_ENV='production' npm install || cat /root/.npm/_logs/*.log) && (ls -1A; ls -1A /root/.npm/_logs); mkdir -p /downloads; ls -al /;  echo ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# Copy app files
COPY ./dist /app/dist/


# Expose port
EXPOSE 8081 9091


# Start the server
ENTRYPOINT ["node", "/app/dist/server.js"]

# default parameters to ENTRYPOINT
CMD ["0.0.0.0:8081", "0.0.0.0:9091"]
