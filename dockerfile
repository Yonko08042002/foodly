# Build stage
FROM node:20-alpine AS builder
RUN npm install -g pnpm@9

WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Make sure next is explicitly installed
RUN pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Verify next.js is installed before building
# Build the application
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
ENV APP_API_BASE_URL=https://uittraining-api.cloud.runsystem.site/api
ENV NEXTAUTH_SECRET=12345ssc67890
ENV NEXTAUTH_URL=https://uittraining-team-2.cloud.runsystem.site

RUN pnpm build


EXPOSE 3000

CMD ["pnpm", "start"]
