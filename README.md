# project-group-vivid-vampire-bats
[![Node.js CI](https://github.com/UOA-CS732-SE750-Students-2022/project-group-vivid-vampire-bats/actions/workflows/node.js.yml/badge.svg)](https://github.com/UOA-CS732-SE750-Students-2022/project-group-vivid-vampire-bats/actions/workflows/node.js.yml)

CS732/SE750 group repository for the Vivid Vampire Bats



# Boardscape

## Overview of the Project
This is a full-stack  web application  as  a  social platformfor  tabletop board  game  enthusiasts.

## Quick start guide
This web app is available online at: https://boardscape.herokuapp.com/ 
It is up and running 24/7 for you to use without any installation.

If you prefer to run the app locally, installation of the app is also quick and easy. All you need to do is to install some dependencies, and you are good to go. You can use yarn to do that.

### Clone the project from GitHub
```
git clone https://github.com/UOA-CS732-SE750-Students-2022/project-group-vivid-vampire-bats.git
```

### Move to the backend directory
```
cd backend
```

### Install the dependencies
Using yarn:
```
yarn install
```

### Run the backend
Using yarn:
```
yarn dev
```
The backend will now run in your default browser at: http://localhost:4001/graphql

### Move to the frontend directory
```
cd frontend
```

### Install the dependencies
Using yarn:
```
yarn install
```

### Run the frontend
Using yarn:
```
yarn dev
```

The frontend will now run in your default browser at: http://localhost:3000/

## Tools used in this project

### React

Representing  the  R  in  the MERNstack,  React  is  the  most  popular JavaScript  library  for  building  user  interfaces,  with  main  alternatives  being Angularand Vue. 

### Next.js
Next.js was  selected  as  an  additional  technology  compared  with  the  simpler create-react-app, as an additional technology to learn in the general scope of the  educational  nature  of  this  project.  Primarily,  Next.js  offers  the  advantages over  native  React  and  create-react-app  of  server-side  rendering,  which  assists with  complex  content  or  users  with  low-performance  devices.  It  is  used  by prominent content services such as Twitch and Hulu. We also considered using Gatsby,  but  chose  Next.js  due  to  ourfocus  being  on  content  rather  than  e-commerce like features.


### Express
Representing the E in the MERN stack, Express.js is a natural inclusion to  our  JavaScript  web  development  project.  Express  is  very  widely  used,  as  a component of both the MERN and MEAN stacks, and offers the expected benefits of being free, open-source, modular, and having the documentation and library benefits that come from it’s widespread adoption. It is the natural choice given the use of Node.js in the application.

### Apollo GraphQL
GraphQL  is  an  open-source  query  language  developed  by Facebook. Although it adds complexity compared with native express, it provides future-proofing   against  growth   and   additional   features   as   it   optimises   for accessing data from multiple sources and defines a straightforward query syntax that  can  be  adopted  by  multiple  teams.  Apollo  is  a  GraphQL  client,  and  is  the most widely adopted implementation of GraphQL. We have selected GraphQL as it  has  simplicity  and  flexibility  advantages  over  Relay,  whilst  providing  wider framework support than URQL.

### MongoDB
It is a document-oriented database and is based on the same model which makes it easy to store, transform and evolve data, in a way that it’s easy to work with. It also has a flexible schema which stores data in JSON-like format, so there’s no constraints regarding the structure of data

### Mongoose
Given the use of MongoDB and Express in this project, Mongoose is the natural choice to create a connection between the two technologies. It is the leading tool for this purpose, without significant competition,aside from a native implementation of MongoDB.

### Node.js
Representing  the  N  in  the  popular  MERN and  MEAN  web-development tech  stacks,  Node.js  is  the  core  of  our  server-side  architecture.  Having  been developed  in  response  to  flawsin  Apache  HTTP  server,  in  combination  with Googles development of the V8 JavaScript engine, Node.js allows JavaScript to act as the unifying language across web-development stacks, and gives rise to a large   number   of   useful   modules   accessed   through   npm   (node   package manager). 

### JavaScript
Javascript was  selected  as  the  language  of  choice,  the  alternative  being Typescript.


### Heroku
It  provides  easy  deployment  from  various  sources  such  as  GitHub. Applications can be directly linked from GitHub and default deployment can be enabled each time some code is pushed into the master branch.It also has an option for deployment from Heroku git itself, which can be used as a repository as well.

### Testing
For automated testing, we have used Jest to run some scripts and test some of the graphql endpoints of our application. For example, we have carried out API testing which can be seen in the 'src' folder and which naviagtes to the '__tests__' folder. In this folder, we have arranged various test case files in the application. For testing the API we have a file named event.test.js where we fetched the data from the graphql API and tested the result uaing jest. Similarly, we tested the boardgame graphql endpoint. In order to simulate the graphql server we setup a mock Apollo server to test our resolvers.

Using yarn:
```
cd backend
```
```
yarn install
```
```
yarn test
```

### ESlint
ESlint is one of a number of static code analysis tools. As a collaborative project, maintaining  good  standards  of  code  consistently  amongst  the  development team is important, and we selected ESlint due to it’s strong performance and the team’s familiarity with the tool.


## Project Management & Development Tools 
* Confluence (documentation): https://uoa-se750-2022-react-project.atlassian.net/wiki/spaces/PROJECT/
* Jira (managing tickets and individual’s responsibility): https://uoa-se750-2022-react-project.atlassian.net/browse
* Zoom (video conferencing for meetings)
* Git + GitHub (Version Control)
* VSC Visual Studio Code (IDE)
* Discord (instant messaging) slack is an alternative, but given the small size of the team (5)  and  short  nature  of  the  project  (11  Weeks),  we  have  decided  not  to  create  a  slack server for this project

