@ECHO OFF

ECHO Building docker image and setting up docker compose...
cd ..
docker-compose --env-file=.docker.env up --build -d
ECHO Finished