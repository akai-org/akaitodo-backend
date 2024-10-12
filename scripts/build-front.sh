#!/bin/bash

docker compose --env-file="../.docker.env" --profile frontend up --build -d