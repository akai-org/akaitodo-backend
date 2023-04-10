# AKAI TODO (backend)


## Run

### Manually

1. Copy `.env` file

```
$ cp .env .env.local
```

And set `NODE_ENV=dev`. Optionally you can fix all others parameters

2. Run node service

```
$ npm start
```

You can also use `start:dev` or `start:prod`

### On Docker
In this way project will be using **env** variables passed from `.docker.env` by `docker-compose.yml` file and overwrite params in `.env ` file used defaulty

1. Create **local** `.docker.env` file instance and setup database connection parameters

```
$ cp .docker.env .docker.env.local
```

2. To build first time

```
$ docker compose --env-file=".docker.env.local" up --build -d
```

To **up** application use (optionally you can add `-d` flat to hide logs):

```
$ docker compose --env-file=".docker.env.local" up
```

## Troubleshooting

- Check relations in db (foreign keys)

```sql
SELECT 
  TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
FROM
  INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
  REFERENCED_TABLE_SCHEMA = '<database>' AND
  REFERENCED_TABLE_NAME = '<table>';
```