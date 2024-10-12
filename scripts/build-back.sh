#!/bin/bash

docker compose --env-file="../.docker.env" --profile backend up --build -d