<h1 align="center">
  <a href="https://rug.nl"><img src="https://www.rug.nl/about-ug/practical-matters/huisstijl/logobank-new/corporatelogo/corporatelogorood/rugr_logoen_rood_rgb.png" width="500" alt="University of Groningen Logo"/></a>
</h1>

Below you will find a discussion on the design and implementation of our project for the Web Engineering course at the University of Groningen. We were tasked to build a web app that allows users to search for songs and artists and view information about them. The app allows users to create, update, and delete songs and artists. It also allow users to view the top songs and artists for a given year.

# Milestones

## M1: API Design

<p align="center">
  <a href="https://swagger.io"><img src="https://avatars3.githubusercontent.com/u/16343502?v=3&s=200" width="200" alt="OpenAPI Logo"/></a>
</p>

For the first milestone as required we designed and documented our RESTful API. We did this using [Swagger](https://swagger.io) and the accompanying OpenAPI specification. The API is documented in the [spec.yml](backend/spec.yml) file and has the following functionalities:

* Retrieving, creating, updating, or deleting all information for a specific song by its unique ID
* Retrieving all songs with a given name, or none if there is no song with this name or no name was provided
* Retrieving or deleting all songs for a specific artist by artist ID or artist name
* Retrieving summary information (number of songs, earliest and latest release by date, highest popularity among all songs) for a specific artist by artist ID or artist name
* Retrieving a list of the top N, N > 1 songs by popularity for a given year, returned in batches of M = {10, 20, 50, 100}
* Retrieving a list of the top N, N > 1 artists by popularity for a given year, returned in batches of M = {10, 20, 50, 100}

Therefore the outcome of this milestone is documentation for a REST API that allows users to retrieve, create, update, and delete information about songs and artists.

## M2: API Implementation

<p align="center">
  <a href="https://nestjs.org"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest.js Logo"/></a>
</p>

### NestJS

For our backend we decided to use [NestJS](https://nestjs.org), a framework for building efficient, scalable [Node.js](https://nodejs.org) server-side applications. Additional reasons to use the platform include:

* Having good documentation
* Improvements on the [Express](https://expressjs.com) framework like dependency injection
* Approachable syntax and structure, thanks to our experience with Java
* A powerful CLI tool for generating and scaffolding code, making development faster and more efficient

All of these reasons made us choose NestJS as our backend framework. Moreover another point why we ended up choosing NestJS is because of its good seperation of concerns. In fact, NestJS is built on the principles of separation of concerns, which promotes the separation of different aspects of the application into distinct, modular components. This makes it easy to manage and maintain the codebase, and also improves code reusability.

One way in which NestJS achieves separation of concerns is through the use of services and controllers.

<p align="center">
  <a href="https://docs.nestjs.com/controllers" target="blank"><img src="https://docs.nestjs.com/assets/Controllers_1.png" width="800" alt="Controller diagram" /></a>
</p>

Services are responsible for handling business logic and data processing, while controllers are responsible for handling the incoming requests and returning the appropriate responses. This separation allows for a clear division of responsibilities, making it easy to understand and maintain the codebase.

For example, a service may handle the process of creating and saving a new user to a database, while a controller may handle the process of handling a request to create a new user, validating the request data, and calling the appropriate service method. This separation allows for easy testing, as each component can be tested independently.

In addition, services can be easily shared across different controllers, further increasing code reusability. This helps to keep the controllers lean and focused on handling requests, while the services handle the heavy lifting of processing data.

Overall, the separation of concerns achieved by using services and controllers in NestJS makes the codebase more maintainable, testable and scalable.

With NestJS we were able to implement all of API design requirements outlined in milestone 1 with some rather easy to read code. This can be seen below with an example
of the code from our artists controller:


```typescript
@Delete('songs')
  async deleteSongsByArtist(
    @Query('id') id: string,
    @Query('name') name: string,
    @Headers('Content-Type') contentType: string,
    @Res() res
  ) {
    const songs = await this.artistsService.deleteSongsByArtist(id, name);
    this.sendResponse(res, contentType, songs);
  }
```
The above shows how easy in NestJS it is to have properties like uniform interface through the use of decorators. In addition its easy to see we have self decribing messages as we have a header for content-type.

As a result its clear to see with this discussion and upon further inspection of the code we implemented the backend i.e. the REST API in a very clean and maintainable way.

### Database

<p align="center">
  <a href="https://postgresql.org"><img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" width="200" alt="PostgreSQL logo"/></a>
  <a href="https://prisma.io"><img src="https://pbs.twimg.com/profile_images/1613536032028348416/GkLVuxvN_400x400.png" width="200" alt="React Logo"/></a>
  </a>
</p>

For our database setup we decided to go with [PostgreSQL](https://postgresql.org) with [Prisma](https://prisma.io) as our ORM. This was because of the following reasons:

* PostgreSQL is a powerful and feature-rich open-source relational database that is well-suited for handling complex data and large workloads
* Prisma is a modern data access layer that provides a powerful and intuitive API (Prisma studio) for interacting with databases
* Prisma provides a powerful migration system that allows you to evolve your database schema in a safe and predictable way
* Prisma client is a type-safe database client that allows you to interact with your database using plain JavaScript or TypeScript


You can see with the following why prisma was a good choice for us:

```typescript
async createSong(createSongDto: CreateSongDto) {
    return await prisma.song.create({
      data: {
        id: createSongDto.id,
        title: createSongDto.title,
        artist_ids: createSongDto.artist_ids,
        popularity: createSongDto.popularity,
        release_date: createSongDto.release_date
      }
    });
  }
```

The code above is very readbale and easy to understand. This is because of the use of the `prisma` object which is a wrapper around the database. This object allows us to easily interact with the database and perform CRUD operations. This is a very powerful feature of Prisma and as such from the implementation point of view we thought prisma would be a good choice.

### Summary

<p align="center">
  <a href="https://insomnia.rest/"><img src="https://s3.amazonaws.com/s3.roaringapps.com/assets/icons/1561251841927-Insomnia.png" width="200" alt="Insomnia Logo"/></a>
</p>

With these tools we were able to implement all of the functionalities that we had designed in M1. We learnt a lot as this was all our first experience with any kind of web development. Using many tools initially was intimidating. In order to do a lot of the testing for our backend we initially just ran it on localhost in one our browsers. We also used Insomnia to test non GET endpoints.

We also dabbled with Docker and `docker compose`. We were able to get a docker-compose file working that would run our frontend, backend and database with one terminal command.

## M3 Frontend Implementation

<p align="center">
  <a href="https://reactjs.org"><img src=https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg width=200 alt="React Logo"/></a>
  </a>
</p>

We decided to go with [React](https://reactjs.org) for our frontend. This was because of the following reasons:

* React is a component-based framework, which makes it easy to build reusable components that can be shared across different pages
* React has tons of community support, which makes it easy to find solutions to common problems
* Because React is so popular it also has so many libraries that are available for it. This makes it easy to add features to our application without having to reinvent the wheel

Maybe most importantly is simply the popularity of React which will help us get the 💸 in the future.

Through the use of our frontend we were able to hook up with our backend that we made in M2 and make fully implemented web app as the requirements outlined for milestone 3.

### Dockerisation

<p align="center">
  <a href="https://docker.com"><img src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png.webp" width=200 alt="Docker Logo"/></a>
  </a>
</p>

We separated the tiers of our application using [docker](https://docker.com). As a result anyone can simply clone the repo and run the following command to get the application running:

```bash
docker compose up
```

Wait until the application has started up and you should be able to access the application on <http://localhost:3001>.

## Distribution of Work

<p align="center">
  <img src="https://toggl.com/blog/wp-content/uploads/2019/09/unnamed-51.png" width=200 alt="Teamwork makes the dream work!"/>
</p>

The distribution of work among us was as follows:

* **M1** - All team members worked on this together
* **M2** - Matan did most of the initial backend including initial docker/prisma setup, Jasper finished and refined backend
* **M3** - Jasper and Alex handled most of the frontend, Jasper led the dockerisation of the application with some help from Matan

## Application Layers Discussion

<p align="center">
  <img src="images/layers.png" width=500 alt="Application Layers"/>
</p>

We decided that we want to have a relatively small amount of functionality shipped in our client. This was mainly because of performance considerations. Therefore we decided we would have a remote presentation applications as seen in the diagram below.

<p align="center">
  <img src="images/remote.png" width=500 alt="Remote Presentation Application"/>
</p>

This means that we would have a client that would be responsible for the following:
* UI events
* UI rendering
* UI state management
* UI styling

The client then communicates with our backend through the REST API. This allows us to have a very simple client that is easy to maintain and extend. It leaves room for us to add more features to the client in the future while still allowing us to some interesting things on the client that a static application could not do such as UI state management.

## Guidlines on running

When running the application you will need to have [docker](https://docker.com) installed. You can then simply run the following command to get the application running:

```bash
docker compose up
```
Wait until the application has started up and you should be able to access the application on <http://localhost:3001>.

If you want you can have a look at the database to make sure you get the correct data to search with. In our docker setup we have made sure to run prisma studio on port 5556. So when you have started the app you can simply go to <http://localhost:5556> to view the database.

## Discussion on our REST API Maturity level

<p align="center">
  <img src="images/Rest.png" width=500>
</p>

When analyzing what level our REST api falls into it easy to see that is level 2 at the very least. This is because we use:

* Resource identification through URIs
* Uniform interface with correct use of HTTP methods
* Self-descriptive messages

The self descriptive messages might require a bit more discussion. Self descriptive messages means that the messages that are exchanged between the client and server contain all of the information necessary for the client to understand the message and the state of the request. This includes information such as the type of request being made and the format of the data being sent. This allows for a more flexible and decoupled communication between the client and server, as the client does not need to rely on any external documentation or configuration to understand the messages. 

With the following code snippet it is also clear that we are using self descriptive messages. The response contains the status code, the message and the data. This allows the client to understand the status of the request and the data that is being sent back.

```typescript
private sendResponse(res, accept: string, data: any) {
    if (accept == 'text/csv') {
      res.header('Content-Type', 'text/csv');
      res.send(parse(data));
    } else {
      res.send(data);
    }
  }
```

As can be seen in the code snippet above we have a method to check what type of response the client wants so we can always deliver a response it can easily understand i.e. self describing messages. Hence it's clear our REST API is at least level 2.

We pretty match do a kind of content-type swapping as can be seen in the scientific diagram below.
<p align="center">
  <img src="images/contentType.jpg"
  width=500>
</p>

Now when checking if is our REST api could be considered for level 3 we need to see that it adheres to the following HATEOAS (Hypermedia as the engine of application state). HATEOAS is a principle of RESTful web architecture that states that a client can navigate through the application's state by following hypermedia links, rather than having to construct URLs or make arbitrary HTTP requests.

In practical terms this means that the server includes links (dynamically generated based on initial response) to other resources in the responses it sends to the client, and the client can use these links to discover and navigate to other parts of the application.

Knowing these facts we can see that we've also adhered to HATEOAS in our application this can be seen in the following pictures of our application.

<p align="center">
  <img src="images/YellowGet.png" width=800>
  <br>
  <br>
  <img src="images/YellowMoreInfo.png" width=800>
</p>

As can be seen in the pictures above we have a link to the more info page of Yellow. This link is dynamically generated based on the initial response. This allows the client to navigate through the application's state by following hypermedia links, rather than having to construct URLs or make arbitrary HTTP requests.

Furthermore we also adhere to stateless interactions as we don't store any client state like sessions or cookies on the server. This means that the server does not need to keep track of the state of the client. This allows for a more scalable and fault tolerant application as the server does not need to keep track of the state of the client.

Therefore we can conclude that our REST API is level 3.

<p align="center">
  <img src="images/Join.jpg" width=800>
</p>

```
Darth Vader: Join me, and together we can rule the galaxy with your level 3 REST API.

Luke Skywalker/Us: I'll never join you, our API was made for jedis only not for sith scum like you.

Darth Vader: You underestimate my power.

-- Luke Skywalker/Us and Darth Vader fight, Vader proceeds to use some despicable tactics --
```

<p align="center">
  <img src="images/choke.jpg" width=800>
</p>

# So let us ask you...

<p align="center">
  <img src="https://media.giphy.com/media/d7mMzaGDYkz4ZBziP6/giphy.gif" width=800>
</p>
