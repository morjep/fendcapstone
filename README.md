# Travel companion

## Project description

This is a project for the Udacity front-end development nano-degree.

The project consists of a

- Webserver - Node.js
- Web application framework for routing - Express.js
- Build tool - Webpack
- Service worker - Workbox
- External APIs - geonames, weatherbit and pixabay

The solution allows you to enter multiple destinations (country + city) and a traveldate.
One at a time!

The app will then insert the destination on the page, with a countdown to the trip + relevant picture + current forecast (next 16 days).

## Building and running on localhost

First install dependencies:

```sh
npm install --legacy-peer-deps
```

To create a production build:

```sh
npm run build-prod
```

To create a development build:

```sh
npm run build-dev
```

To run dev-server:

```sh
npm run dev-server
```

- Create a new .env file in the root of your project
- Go to geonames, weatherbit and pixabay sites and set up the relevant accounts and get the required developer API keys
- Fill the .env file with your API keys like this:

```
GEONAMES_USERNAME=*****************
WEATHERBIT_API_KEY=****************
PIXABAY_API_KEY=*******************
```

- Open two terminals at the root of the project
- In terminal 1 start the node.js server with:

```
npm run start
```

- In terminal 2 start the dev version of the front-end with:

```
npm run dev-server
```

## Running

```sh
node dist/bundle.js
```

## Testing

To run unit tests:

```sh
npm test
```
