FROM node:alpine
WORKDIR /app
COPY /build /app
CMD ["npx", "serve", "-s"]
