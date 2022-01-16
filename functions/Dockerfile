FROM node:16-alpine

# Need to include the wkdir or errors will occur with
# as we are using the later versions of node
WORKDIR /app 
ADD . /app/
RUN ls -la
RUN npm install -g firebase-tools
RUN npm install

EXPOSE 5000
CMD [ "firebase", "serve"]