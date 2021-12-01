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

![image](https://user-images.githubusercontent.com/44285344/144260469-0be17de8-45e5-40cb-a4b4-1df5e2425bee.png)


## Seeds

For dev purpose you can the run seed command in ./backend:

```sh
  npm install && npm run seed
```

You can now login with the admin with the following credentials:

  - username: admin
  - password: admin
