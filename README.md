# Gotham

## Web app

Start the backend, frontend and db services with the following docker command:</br>
<i>make sure to have the docker cli installed</i>

```sh
  docker-compose up -d
```

Visit <a href="http://localhost:8080">localhost:8080</a>
## Mobile app

Start the backend, frontend and db services with the following docker command:</br>
<i>make sure to have the docker cli installed</i>

```sh
  docker-compose up postgres backend
```

Create a build of the mobile app by running the following command in ./frontend:</br>
<i>make sure to have android studio installed</i>

```sh
  npm install && npm run android
```

## Seeds

For dev purpose you can the run seed command in ./backend:

```sh
  npm install && npm run seed
```

You can now login with the admin with the following credentials:

  - username: admin
  - password: admin