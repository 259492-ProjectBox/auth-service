# Elysia with Bun runtime

## Install Bun

```
https://bun.sh/docs/installation
```

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

# Install List

```
bun add @elysiajs/swagger
bun add axios
bun add @elysiajs/jwt
bun add -d @types/jsonwebtoken
bun add @elysiajs/cors
bun add -d prisma
```

# Prisma

We can setup prisma project with prisma init

`bunx prisma init`

Then we can run prisma migrate to sync our database with Prisma schema:

`bunx prisma migrate dev --name init`

Prisma Client Generation: After running migrate dev, you should regenerate the Prisma Client to ensure your application is up to date with the latest database schema:

`bunx prisma generate`

Re-run Migration (if necessary): If there was an issue with the initial migration, you can reset and reapply it:
`bunx prisma migrate reset`

Remove prisma

```bun remove prisma
bun remove @prisma/client
```

# Because the bun prisma generate not working (bun not support)

use drizzle orm instead

```
bun add drizzle-orm postgres
bun add -d drizzle-kit

```


When create user in vm and use ssh but when try to access by that user account then got 
` Permission denied (publickey).`
- 1. Let check if that user already have ssh key in that user go to user folder by root
    for example /home/{non_root_user}/.ssh and check in authorized_key

- 2. If already has authorized_key then
```
Sometimes the issue comes from permissions and ownership. For instance, if you want to log in as root, /root, .ssh and authorized_keys must belong to root. Otherwise, sshd won't be able to read them and therefore won't be able to tell if the user is authorized to log in.

In your home directory:
/home/{non_root_user}/
chown -R your_user:your_user .ssh

As for rights, go with 700 for .ssh and 600 for authorized_keys

chmod 700 .ssh
chmod 600 .ssh/authorized_keys


```

if you dont want to use sudo everytime with every command use 
`sudo -s`
or Own the directory you want by using chown:
`sudo chown your_username directory `

Add the User to the Docker Group
Run the following command to add kunmhing to the docker group:
```
sudo usermod -aG docker kunmhing
```

# Testing
Unit testing 
`bun add --save-dev @types/sinon`