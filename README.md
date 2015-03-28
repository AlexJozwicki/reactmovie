# React Movies

A tutorial application made with React, React Router and Airflux.
The goal is to create a small application covering all the concepts of React and Flux.

## Starting the tutorial

```
npm install
gulp
```

Gulp will then start a server on port 8001.
To access it, go to http://localhost:8001


### Building tools

The project is built around gulp task manager responsible for:
- building your application with Browserify
- building the CSS
- starting a livereload server on port 8001

# Steps

## Overview
0. One base React component, rendered into the DOM
1. Base setup of an application, using the state with an input
2. Displaying a static list of movies
3. Editing the list of movies
4. Using stores to keep the list of movies
5. Creating new routes for your application using React Router
6. Asynchronous call to a web service

## Step 0

### Concepts covered

React Application, React Components, State

### Project anatomy

- app.js: renders HomeScreen into the DOM
- HomeScreen.jsx: main component of the application

## Step 1

### Concepts covered

State

### What changed since the previous step

1. We create several components, all tied together in the `Home` component
2. `BasicReactSample` component has a state
3. `changeName` callback modifies the state
4. An input is mapped to the state value, and triggers the `changeName` callback

## Step 1 best

### Concepts covered

ValueLink

### What changed since the previous step

1. `BasicReactSample` has a `linkState` function
3. An input is mapped to the state value using a the ValueLink object provided by `linkState`

## Step 2

### Concepts covered

Simple React Router, Passing Props, Proptypes

### What changed since the previous step

1. app.js now defines routes. Each route is simply mapped to a React component
2. Home.jsx uses the Router for the NavBar
3. `Home` component is used for the scaffolding of the application, and render the component selected by the route
4. `MovieList` iterates through a list of movies, rendering a `Movie` component for each one, passing the movie through props
5. `Movie` has a proptyes static attribute to validates the props

## Step 3

### Concepts covered

Passing callbacks from a parent component to its child

### What changed since the previous step

1. `MovieForm` was added to add movies
2. `MovieList` has function to add movies to its state..
3. .. and passes the function to `MovieForm`

## Step 4

### Concepts covered

1. Flux Stores and action
2. Maping the state of a store to the state of a component

### What changed since the previous step

1. `MovieActions` defines the Flux actions
2. `MovieStore` create the store containing the movies
3. `MovieList` is connected to the `MovieStore` to get its data

### Step 4 More

1. Adding another action into the mix
2. `Home` listens to this action to display notifications

## Step 5

### Concepts covered

Routing with params, Seperating the loading logic from display, asynchronous Flux actions 

### What changed since the previous step

1. `MovieEditor` is now a seperate component and has a route..
2. .. it handles the loading of the movie to edit..
3. and passes it through `props` to `MovieForm`
4. `find` is an asynchronous action

## Step 6

### Concepts covered

AJAX call using `fetch`

### What changed since the previous step

1. All data are coming from a web service (started together with gulp)
2. `api` package defines the web services calls using `fetch` API
3. Actions are now directly mapped to these calls returning Promises
