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

FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html
ARG NGINX_CONF
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public /usr/share/nginx/html/public

RUN rm -rf /usr/share/nginx/html/*

RUN mkdir .next
RUN chown nginx:nginx .next

COPY --from=builder --chown=nginx:nginx /app/.next/standalone /usr/share/nginx/html
COPY --from=builder --chown=nginx:nginx /app/.next/static /usr/share/nginx/html/.next/static

COPY ${NGINX_CONF} /etc/nginx/conf.d/default.conf

#USER nextjs

EXPOSE 80


# # FROM base AS runner
# # WORKDIR /app

# # ENV NODE_ENV production

# # RUN addgroup --system --gid 1001 nodejs
# # RUN adduser --system --uid 1001 nextjs

# # COPY --from=builder /app/public ./public

# # RUN mkdir .next
# # RUN chown nextjs:nodejs .next

# # COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# # COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# # USER nextjs

# # EXPOSE 80

# # ENV PORT 3000
# # ENV HOSTNAME "0.0.0.0"

CMD [ "nginx", "-g", "daemon off;" ]
# CMD ["node", "server.js"]