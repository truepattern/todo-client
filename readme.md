This application is a sample todo client written using jquerymobile, backbone & jade templates. 

## Tools required
  * npm install -g bbb

## Directories
  * Client Sources are in directory app/*
  * Templates - app/templates (or) views - both are symlink
  * Assets/Libraries - are in assets/*

## Generate require.js
All the client side sources are put-together into one file (require.js), in order to do it, run command bbb
  * bbb

## For release
  * bbb release
  * cp dist/release/index.css public/index.css
  * cp dist/release/require.js public/require.js

## API Server
Please refer to todo-server on how to run the backend API server.
  * serves /api/v1/todos resource with standard CRUD operations

## Refereneces
  * https://github.com/backbone-boilerplate/grunt-bbb
  * https://github.com/muraken720/node-crud
