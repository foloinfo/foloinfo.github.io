---
title: Solving MySQL connection error using with docker on Ubuntu (sqlalchemy)
date: '2023-03-03T15:00:00.000Z'
---

I normally use postgres, but sometimes I need to use MySQL for some projects.

It was my first project using python (FastAPI), and I got into some truble connecting to MySQL between containers.

Container A (api) is a web server which runs python script, trying to connect with sqlalchemy.

Container B (db) is a MySQL 8.0 docker container.

Here is the simplified version of docker-compose.yml

```yaml
version: "3"
  services:
    api:
      ...
      depends_on:
        - db
    db:
      image: mysql:8.0
      restart: always
      environment:
        MYSQL_ROOT_HOST: "%"
        MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
      ports:
        - 3307:3306
```

When I run `docker-compose up`, it starts fine and I can connect to MySQL container without any problem.

```shell
# I works fine.
mysql--host 0.0.0.0 --port 3307 - u root
```

However, sqlalchemy complains that it can't connect to MySQL.

The first problem was I got my configuration file wrong and it was trying to connect with wrong host.

```python
# the error may be "Unknown MySQL server host '127.0.0.1'"
sqlalchemy.exc.OperationalError: (MySQLdb.OperationalError)(2005, "Unknown MySQL server host 'not_used' (-3)")
```

The second problem was I could find the host, but couldn't connect to the server.

First I thought it was a problem with password or bind-address setting, but nothing worked.

```python
sqlalchemy.exc.OperationalError: (MySQLdb.OperationalError)(2002, "Can't connect to MySQL server on 'db' (115)")
```

Finally I found that Ubuntu docker requires extra setting for communicating between containers.

Adding `host.docker.internal:host-gateway` resolved issue completely. You don't need to configure custom networks, just add one line.

```yaml
services:
  app:
    extra_hosts:
      - "host.docker.internal:host-gateway"
```
