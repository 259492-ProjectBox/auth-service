# Start with the oven/bun base image
FROM oven/bun AS build

WORKDIR /app

# ARG NODE_VERSION=20
# RUN apt update \
#     && apt install -y curl
# RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
#     && bash n $NODE_VERSION \
#     && rm n \
#     && npm install -g n

# Copy the package.json and bun.lockb to the container for caching dependencies
COPY package.json package.json
COPY bun.lockb bun.lockb

# Install dependencies using bun
RUN bun install

# Copy the rest of your application files
COPY src ./src
COPY utils ./utils
COPY types ./types
COPY prisma ./prisma

# Install Prisma and generate Prisma Client using bun (ensure you're using 'bun' to generate)
RUN bun install prisma --dev
RUN bun prisma generate

# Verify the generated Prisma files (optional, useful for debugging)
RUN ls -lh ./node_modules/.prisma/client

# Set NODE_ENV to production
ENV NODE_ENV=production

# Build the application with bun
RUN bun build \
  --compile \
  --minify-whitespace \
  --minify-syntax \
  --target bun \
  --outfile server \
  ./src/index.ts

# Start a new stage with distroless base image to minimize the container size
FROM gcr.io/distroless/base

WORKDIR /app

# Copy the built server from the build stage
COPY --from=build /app/server server

# Expose the application port
EXPOSE 3002

# Set the entrypoint to start the application
CMD ["./server"]
