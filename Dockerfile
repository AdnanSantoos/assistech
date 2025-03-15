FROM node:18-alpine as build-stage
RUN apk add --no-cache curl gnupg libstdc++

WORKDIR /app
COPY . .

# precisa disso senão não terá env
ARG APP_ENV
ENV APP_ENV=${APP_ENV}

RUN if [ "$APP_ENV" = "production" ] && [ -f "/app/.env.deploy.local" ]; then \
    cp /app/.env.deploy.local /app/.env; \
    fi

RUN if [ "$APP_ENV" = "dev" ] && [ -f "/app/.env.staging.local" ]; then \
    cp /app/.env.staging.local /app/.env; \
    fi

RUN ENV_COMMANDS=$(cat .env | sed 's/ / \&\& export /g' | sed 's/^/export /') && \
    eval ${ENV_COMMANDS}

RUN export $(grep -v '^#' .env | xargs) || echo "Falha ao carregar o .env"

RUN npm install

RUN npm run build-env
RUN npm run build
RUN npm install -g @angular/cli
RUN ng build --configuration=production

FROM nginx:1.16-alpine as production-stage

# copy config
COPY docker/nginx/gzip.conf /etc/nginx/gzip.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# copy from build
RUN mkdir /usr/share/nginx/html/app
COPY --from=build-stage /app/dist/assistech/browser /usr/share/nginx/html/app
COPY --from=build-stage /app/dist/assistech/browser/index.html /usr/share/nginx/html

# make all files belong to the nginx user
RUN chown nginx:nginx -R /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
