# Description: Deploy frontend docker image
gunzip frontend.docker.gz -f && \
docker load --input frontend.docker && \
docker compose down && \
docker compose up -d

