# example-compose

Setup server with docker compose over ssh. Syncs parent folder on server. Requires `./.env`.

### Backup

Ensure server ssh private key file (rsa_id) in your ~/.ssh folder.
Check BACKUP_LOCAL_DIR path in .env.production.local

```
./deploy.sh root@dwidge.online dwidge.online backup
```

### Restore

Danger will overwrite server database.

```
./deploy.sh root@dwidge.online dwidge.online restore
```

### Upload and rebuild

```
chmod +x sync.sh
./sync.sh
```

### Login

```
ssh root@learn-to-program.online
export COMPOSE_PROJECT_NAME=dev
cd example/*-compose
```

### Follow live logs

```
docker compose logs -f
```

### Start/restart all

```
docker compose up -d --build --remove-orphans
```

### Multi vCPU

```
docker compose up -d --build --remove-orphans --scale api=2 --scale react=2
```

### Stop all

```
docker compose down
```

### Delete all ssl certificates, mysqldb, nginx cache

```
docker compose down --volumes
```

# 3rd party license

evgeniy-khist/letsencrypt-docker-compose  
Nginx and Let’s Encrypt with Docker Compose in less than 3 minutes  
Distributed under the Apache License, Version 2.0.

dwidge/docker-sync  
Copyright DWJ 2023  
Distributed under the Boost Software License, Version 1.0.  
https://www.boost.org/LICENSE_1_0.txt
