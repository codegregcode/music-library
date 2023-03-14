# Music Library

A project created as part of my studies with [Command Shift](https://www.commandshift.co/). In this project I'll be learning about database design, SQL, postgres and CRUD Operations.

## Roadmap

- ~~follow track~~

  ~~\*note that there may be a delay as I'll be moving house during this project 🙃~~

- ~~Deploy on render~~

## How to use

The easiest way to use this API is to head over to: [https://cgc-music-library.onrender.com/swagger/](https://cgc-music-library.onrender.com/swagger/) and explore the different endpoints simply by clicking them! If you would like to set up your own API and database on your own machine please read 'Installation'

## Installation

1. Install docker onto your machine
2. In your terminal: `<remove <> and change what's between them before entering command>`

   ```cli
   docker run --name postgres -p <pgPortNumber>:<pgPortNumber> -e POSTGRES_PASSWORD=<yourPassword> -d postgres
   ```

   This pulls and runs a postgres image needed to create a database.

3. Clone repo then move into the local repo and install the app dependencies:

   ```
   git clone https://github.com/codegregcode/music-library
   cd /path/to/repo
   npm install
   ```

4. You'll need to create .env and .env.test files to load the environment variables. Please note that the variable for PGDATABASE will need to be different in the .env and .env.test to avoid conflicts

   ```
   PGUSER=<user>
   PGHOST=localhost
   PGPASSWORD=<yourPassword>
   PGDATABASE=<nameOfDatabase>
   PGPORT=<pgPortNumber>
   PORT=<port>
   ```

5. Finally start the API using:

   ```
   npm start
   ```

6. In your browser type:

   ```
   localhost:<port you set in .env>/swagger/
   ```

7. You should now be able to see a breakdown of all the routes and be able to interact with the API!

   ![1678484626902](image/README/1678484626902.png)

## Routes

| HTTP Method | Endpoint             | Description                            |
| :---------- | :------------------- | :------------------------------------- |
| POST        | /artists             | Enters new artist into database        |
| GET         | /artists             | Returns all artist records in database |
| GET         | /artists/{id}        | GET/find an artist by ID               |
| PUT         | /artists/{id}        | Update an artist by ID                 |
| PATCH       | /artists/{id}        | Update an artist by ID                 |
| DELETE      | /artists/{id}        | Deletes artist with matching ID        |
| POST        | /artists/{id}/albums | Enters new album into database         |
| GET         | /albums              | Returns all album records in database. |
| GET         | /albums/{id}         | GET/find an album by ID                |
| PATCH       | /albums/{id}         | Update an album by ID                  |
| DELETE      | /albums/{id}         | Deletes album with matching ID         |

## Application dependencies

```
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.9.0",
    "postgres-migrations": "^5.3.0",
    "sequelize": "^6.28.1",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^4.6.2"
  }
```

## Developer dependencies

```
  "devDependencies": {
    "chai": "^4.3.7",
    "dotenv": "^16.0.3",
    "eslint": "^8.34.0",
    "mocha": "^10.2.0",
    "nodemon": "^2.0.20",
    "supertest": "^6.3.3"
  }
```

## Support

Thank you to all the support from tutors and fellow coursemates at Command Shift 🙌

## Authors and acknowledgment

[codegregcode](https://github.com/codegregcode)
