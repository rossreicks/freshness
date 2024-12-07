# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# don't know why this is necessary, but it is
FROM base AS debug
RUN stat /usr/src/app/node_modules/@tanstack/start/dist/esm/client/createServerFn.js

# [optional] tests & build
ENV NODE_ENV=production
ENV SERVER_PRESET=bun
RUN bun test
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/bun.lockb .
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/.vinxi .vinxi
COPY --from=prerelease /usr/src/app/.output .output
COPY --from=prerelease /usr/src/app/recipes.db recipes.db

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", ".output/server/index.mjs" ]
