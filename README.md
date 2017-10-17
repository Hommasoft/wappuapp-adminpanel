# Wappuapp adminpanel

## Prerequisites

To run Wappuapp adminpanel locally, you need

- Docker, 17.0.6 =>
- Docker Compose, 1.11.2 =>

- Mac users should use Docker for Mac
- Windows users should use Docker for Windows
- Linux users should know what they are doing

For developing, you need

- Node 8.0.0 for adminpanel, 4.8.4 for backend. USE NVM TO MANAGE.
- NPM 5.0 for adminpanel, 2.15.11 for backend. AGAIN, USE NVM.

## Get started

- Clone the repository, and then clone the backend repository into that folder so the structure is following:

```sh
wappuapp-adminpanel/
    wappuapp-backend/
```

- Run `sh tools/init.sh` to install stuff and check .env-files
- Fill in the environmental variables
- When running for the first time, or if you need to run database-migrations, run
- `sh tools/start-with-db.sh`, otherwise
- Start the development environment by running `sh tools/start-dev-env.sh`
- Follow the on-screen instructions

## Coding conventions

- EditorConfig is used to maintain consistency. Install a plugin for your editor.
- ESLint is run on both repositories during commits for staged files.
- Prettier is used on the adminpanel repository, install a plugin for that and enable format on save.
- To avoid failures with dependencies updating, use NPM's save-exact config
- `npm config set save-exact true`

## Docker

Connecting to a Docker container to access bash:

```sh
docker exec -it [cont. name] bash
```

Stopping containers:

```sh
docker-compose -p [project name] down
```