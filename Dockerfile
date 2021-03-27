FROM node:12.17.0
WORKDIR /usr/src/survey-app-server
COPY ./ ./
RUN npm install
CMD ["/bin/bash"]