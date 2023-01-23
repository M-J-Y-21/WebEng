<p align="center">
  <a href="https://www.rug.nl/" target="blank">
  <img src="https://www.freelogovectors.net/svg09/university-of-groningen-logo-freelogovectors.net_.svg" width="200" alt="University of Groningen Logo" />
  </a>
</p>
# Introduction

Below you will find a discussion on the design and implementation of our project for the Web Engineering course at the University of Groningen. We were essentially tasked to build a web app that allows users to search for songs and artists and view information about them. The app allows users to create, update, and delete songs and artists. It also allow users to view the top songs and artists for a given year.

## Outcomes of all milestones

### M1 API Design
<a href="http://openapi.com/" target="blank">
  <img src="https://avatars3.githubusercontent.com/u/16343502?v=3&s=200" width="200" alt="OpenAPI Logo" />
  </a>

For the first milestone as required we designed and documented our RESTful API. We did this using Swagger and the OpenAPI specification. We also created a mock server using SwaggerHub. The API is documented on the spec.yml file available on this repo. The spec file documents the following functionalities:
* Retrieving, creating, updating, or deleting all information for a specific song by
its unique ID
* Retrieving all songs with a given name, or none if there is no song with this name or no name was provided
* Retrieving or deleting all songs for a specific artist by artist ID or artist
name
* Retrieving summary information (number of songs, earliest and latest release by date, highest popularity among all songs) for a specific artist
by artist ID or artist name
* Retrieving a list of the top N, N > 1 songs by popularity for a given year, returned in batches of M = {10, 20, 50, 100}
* Retrieving a list of the top N, N > 1 artists by popularity for a given year, returned in batches of M = {10, 20, 50, 100}

### M2 API Implementation
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a> </p>
#### NestJS
For our backend we decided to use NestJS which is a framework for building efficient, scalable Node.js server-side applications. Because of this in addition to other reasons such as:
* Having good documentation
* Improvments on the Express framework like dependency injection
* Approachable syntax and structure to our experience with Java
* Provides a powerful CLI tool for generating and scaffolding code, making development faster and more efficient

All of these reasons made us choose NestJS as our backend framework. Moreover another point why we ended up choosing NestJS is because of its good seperation of concerns. In fact NestJS is built on the principles of separation of concerns, which promotes the separation of different aspects of the application into distinct, modular components. This makes it easy to manage and maintain the codebase, and also improves code reusability.

One way in which NestJS achieves separation of concerns is through the use of services and controllers.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://docs.nestjs.com/assets/Controllers_1.png" width="600" alt="Controller diagram Logo" /></a> </p>



Services are responsible for handling business logic and data processing, while controllers are responsible for handling the incoming requests and returning the appropriate responses. This separation allows for a clear division of responsibilities, making it easy to understand and maintain the codebase.

For example, a service may handle the process of creating and saving a new user to a database, while a controller may handle the process of handling a request to create a new user, validating the request data, and calling the appropriate service method. This separation allows for easy testing, as each component can be tested independently.

In addition, services can be easily shared across different controllers, further increasing code reusability. This helps to keep the controllers lean and focused on handling requests, while the services handle the heavy lifting of processing data.

Overall, the separation of concerns achieved by using services and controllers in NestJS makes the codebase more maintainable, testable and scalable.

#### Database

<p align="center">
  <a href="http://postgresql.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" width="200" alt="Postgresql logo" /></a>
  <a href="http://react.com/" target="blank">
  <img src="https://pbs.twimg.com/profile_images/1613536032028348416/GkLVuxvN_400x400.png" width="200" alt="React Logo" />
  </a>
</p>

For our database setup we decided to go with PostgreSQL with Prisma as our ORM. This was because of the following reasons:
* PostgreSQL is a powerful and feature-rich open-source relational database that is well-suited for handling complex data and large workloads.
* Prisma is a modern data access layer that provides a powerful and intuitive API (Prisma studio) for interacting with databases
* Prisma provides a powerful migration system that allows you to evolve your database schema in a safe and predictable way

#### Summary of M2

<p align="center">
  <a href="http://insomnia.com/" target="blank"><img src="https://s3.amazonaws.com/s3.roaringapps.com/assets/icons/1561251841927-Insomnia.png
" width="200" alt="Insomnia API logo" /></a>
  </a>
</p>



With these tools we were able to implement all of the functionalities that we had designed in M1. We learnt a lot as this was all our first experience with any kind of web development. Using many tools initially was intimidating. In order to do a lot of the testing for our backend we initially just ran it on localhost in one our browsers. We also used insomnia to test non GET endpoints.

We also dabbled with docker and docker-compose. We were able to get a docker-compose file working that would run our backend and database.

### M3 Frontend Implementation

<p align="center">
  <a href="http://react.com/" target="blank">
  <img src=https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg width=200 />
  </a>
</p>
We decided to go with react for our frontend. This was because of the following reasons:

* React is a component-based framework, which makes it easy to build reusable components that can be shared across different pages
* React has tons of community support, which makes it easy to find solutions to common problems
* Because react is so popular it also has so many libraries that are available for it. This makes it easy to add features to our application without having to reinvent the wheel

Maybe most importantly is simply the popularity of react which will help us get the 💸 in the future.

### Dockerisation
<p align="center">
  <a href="http://docker.com/" target="blank">
  <img src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png.webp" width=200 />
  </a>
</p>

We dockerised our whole application. As a result anyone can simply clone the repo and run the following command to get the application running:

```bash
docker-compose up
```
Wait a few minutes and you should be able to access the application at http://localhost:3001

### Distribution of Work Among Team Members

<p align="center">
  <img src="https://toggl.com/blog/wp-content/uploads/2019/09/unnamed-51.png" width=200 />
</p>

The distribution of work was as follows:

* **M1** - All team members worked on this together
* **M2** - Matan did most of the initial backend including initial docker/prisma setup, Jasper refined backend and added fast seeding of 1000 songs + artists
* **M3** - Jasper and Alex handled most of the frontend, Jasper led the dockerisation of the application with some help from Matan

# Now that we are done with that, let me ask you
<p align="center">
<iframe src="https://giphy.com/embed/d7mMzaGDYkz4ZBziP6" width="480" height="268" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/d7mMzaGDYkz4ZBziP6">via GIPHY</a></p>
</p>