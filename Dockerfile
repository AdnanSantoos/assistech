FROM node:18-alpine as build-stage
RUN apk add --no-cache curl gnupg libstdc++

WORKDIR /app
COPY . .

# precisa disso senão não terá env
ARG APP_ENV

RUN if [ "$APP_ENV" = "production" ] && [ -f "/app/.env.deploy.local" ]; then \
    cp /app/.env.deploy.local /app/.env; \
    fi

RUN if [ "$APP_ENV" = "dev" ] && [ -f "/app/.env.staging.local" ]; then \
    cp /app/.env.staging.local /app/.env; \
    fi

RUN ENV_COMMANDS=$(cat .env | sed 's/ / \&\& export /g' | sed 's/^/export /') && \
  eval ${ENV_COMMANDS}

RUN npm install

RUN npm run build-env
RUN npm run build

FROM node:18-alpine as production-stage

WORKDIR /app

# copy from build
COPY --from=build-stage /app /app

EXPOSE 4000
CMD ["npm", "run", "serve:ssr:assistech"]

