##### DEPENDENCIES

FROM --platform=linux/amd64 node:18-alpine3.17 AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app
RUN echo "${CREDS_URL}"

# Install Prisma Client - remove if not using Prisma

COPY prisma ./

# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

# Copy Google Secret Credentials
# COPY secret ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

##### BUILDER

FROM --platform=linux/amd64 node:18-alpine3.17 AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules/ ./node_modules/
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && SKIP_ENV_VALIDATION=1 pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

##### RUNNER

FROM --platform=linux/amd64 node:18-alpine3.17 AS runner
WORKDIR /app
ENV NODE_ENV production 

# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public/ ./public/
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/secret ./secret

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static/ ./.next/static/
COPY --from=builder --chown=nextjs:nodejs /app/.next/server/ ./.next/server/

ARG CREDS_URL
ARG GOOGLE_APPLICATION_CREDENTIALS
ENV GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS
ENV CREDS_URL=$CREDS_URL


USER nextjs
ADD ${CREDS_URL} ${GOOGLE_APPLICATION_CREDENTIALS}

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

