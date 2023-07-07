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


**Note**

If you don't use docker you can run server using **background** process

```bash
pm2 start server.js --watch
```

Extension `pm2-runtime` is required only to prevent killing container after invoking process


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

**Note**
To change `production` to `development` mode you must change `Dockerfile`
from:

```yml
CMD ["npm", "run", "start:prod"]
```

to

```yml
CMD ["npm", "run", "start:dev"]
```

## Monitoring
### 1. Production

On production to monitoring all processes launched use [pm2](https://pm2.keymetrics.io/)

**Note**

Command `pm2` don't exists in container standalone so we need to use it with `npx` prefix


1. Monitoring speedbar

  ```
  $ npx pm2 set pm2:sysmonit true
  $ npm pm2 update
  ```

### 2. Development

- nodemon
- supervisior

**Why we dont use it on production also?**

Answer:
- [freecodecamp](https://www.freecodecamp.org/news/you-should-never-ever-run-directly-against-node-js-in-production-maybe-7fdfaed51ec6/)
- [stackoverflow](https://stackoverflow.com/questions/67719335/do-i-need-nodemon-in-production)

## Troubleshooting

- starting **prod environoment**

Custom `pm2` worker run in background which cause stopping container after starting process.

[Solution](https://stackoverflow.com/questions/55936473/docker-exits-with-code-0-when-using-pm2-start)




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