### Init project
`add script "prepare": "husky install" to package.json`<br/>
`run npm install"`

## For running Docker Containers

### Build the production image
`docker-compose build`

### Build the development image
`docker-compose -f docker-compose.dev.yml build`

### Stop the server
`docker-compose down`

### Build and start production build
`docker-compose up -d`

### Rebuild docker image
`docker-compose -f docker-compose.dev.yml rm --stop`<br/>
`docker-compose -f docker-compose.yml rm --stop`<br/>
`docker-compose build`<br/>
`docker-compose -f docker-compose.dev.yml build`<br/>
`remove previous images`<br/>

### Start the dev server in container (Caution! CPU-heavy!)
`docker-compose -f docker-compose.dev.yml up`

### Start cash(redis) server(For develop in localhost mode)
`docker-compose -f docker-compose.dev.yml up redis`

### Local development mode
#### If you need a cache service, run docker redis ("Start cash")
`npm run dev:local`

