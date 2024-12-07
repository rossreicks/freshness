# Use an official Node.js image
FROM node:20-slim as base
WORKDIR /usr/src/app

# Install dependencies
FROM base AS dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Build the application
FROM dependencies AS build
COPY . ./
RUN yarn build

# Create the final production image
FROM node:20-slim as release
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.output ./.output
COPY --from=build /usr/src/app/.vinxi ./.vinxi
COPY --from=build /usr/src/app/recipes.db ./recipes.db
COPY package.json yarn.lock ./

# Expose and start the application
USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
