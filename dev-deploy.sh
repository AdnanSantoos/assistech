gunzip dev-frontend.docker.gz -f && \
docker load --input dev-frontend.docker && \
docker compose down && \
docker compose -f docker-compose.staging.yml up -d
