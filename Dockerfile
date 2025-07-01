FROM node:23-alpine

WORKDIR /bridgebot

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

CMD ["pnpm", "build-start"]
