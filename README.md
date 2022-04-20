### Init project
`Package.json add script "prepare": "husky install"`
`run npm install"`

## For running Docker Containers

### Build the image

`docker-compose build`

### Start the dev server in container (Caution! CPU-heavy!)

`docker-compose -f docker-compose.dev.yml up`

### Stop the server

`docker-compose down`

### Build and start production build

`docker-compose up -d`

### Rebuild docker image
`docker compose restart backend`
