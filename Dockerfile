FROM node:18-alpine AS base_image
ARG environment

# Criar grupo, usuário e diretório /app com permissões corretas
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 -G nodejs nextjs && \
    mkdir /app && \
    chown nextjs:nodejs /app

WORKDIR /app
RUN npm install -g pnpm

# ----------------------
# Dependency Image
# ----------------------
FROM base_image AS dependency_image

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat

# Copiar arquivos de dependências
COPY --chown=nextjs:nodejs package.json pnpm-lock.yaml ./

# Instalar dependências como nextjs
USER nextjs
RUN pnpm install --frozen-lockfile

# ----------------------
# Builder Image
# ----------------------
FROM base_image AS builder_image
WORKDIR /app

ARG NEXT_PUBLIC_API_URL=http://98.90.231.160:6030/api/
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ARG environment=production

COPY --chown=nextjs:nodejs . .

COPY --from=dependency_image --chown=nextjs:nodejs /app/node_modules ./node_modules

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=${environment}

USER nextjs
RUN pnpm build

# ----------------------
# Production Image
# ----------------------
FROM base_image AS production_image
WORKDIR /app

ARG environment=production

ENV NODE_ENV=${environment}
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Copiar arquivos necessários
COPY --from=builder_image --chown=nextjs:nodejs /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder_image --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder_image --chown=nextjs:nodejs /app/public ./public
COPY --from=builder_image --chown=nextjs:nodejs /app/node_modules ./node_modules

# Trocar para usuário nextjs
USER nextjs

# Expor porta e definir comando
EXPOSE 3000
CMD ["pnpm", "start:next"]
