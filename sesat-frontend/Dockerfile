FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm ci; 

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SESAT_API_URL
ENV NEXT_PUBLIC_SESAT_API_URL=$NEXT_PUBLIC_SESAT_API_URL
RUN npm run build

FROM base AS runner
WORKDIR /app

RUN apk update && apk add curl

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# EXPOSE 3000

# ENV PORT 3000
# ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]