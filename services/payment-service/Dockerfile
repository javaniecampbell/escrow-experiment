# Now the framework
# You need to install dependencies for the app to run
FROM node:20.9.0-alpine AS base
WORKDIR /app
COPY package.json ./
# COPY package-lock.json ./
COPY ./prisma ./prisma
# RUN npm i --omit=dev
# RUN npm ci 
RUN npm i

# If I had typescript or meta framewrk that needs additional buid steps that produce artifacts (dist, .next, .angular, etc)
FROM base AS dev
EXPOSE 3000
ENV NODE_ENV=development
ENV DEBUG=deployment-service:*
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/prisma ./prisma
# This copies everything over to docker
COPY . .
# RUN apt-get update
# RUN apt-get install lsof
# This is the port that the container will be listening on
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/_health/ || exit 1
# CMD ["node", "./bin/www"]
CMD ["npm", "run","dev"]

# Multi-stage build next WEEK

# What is needed for the application to be built either at runtime or build time
# You to copy the source code into the container
# you need to tell what networking items are needed

FROM node:20.9.0-alpine AS production
EXPOSE 3000
ENV NODE_ENV=production
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/package.json ./package.json
# COPY --from=base /app/package-lock.json ./package-lock.json
COPY . .
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/_health/ || exit 1
CMD [ "node", "-r", "./utils/tracing.js","./bin/www" ]