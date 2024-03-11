#!/bin/bash
cp -n .docker.env .docker.env.local
docker compose --env-file=".docker.env.local" up --build -d