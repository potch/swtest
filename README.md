# ServiceWorker Web Push example

A minimal ServiceWorker / Web Push example. Only uses one non-standard package, [web-push](https://www.npmjs.com/package/web-push)

To Setup: `npm install`

To Run: `npm start`

## Structure

* **index.js** - Server-side code- serves static resources and contacts the push server.
* **index.html** - Client-side code- requests permission from user and informs the server of the API endpoint.
* **service-worker.js** - Background script that recieves and processes notification events even when the page isn't open.
