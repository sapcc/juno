# Mercury

Mercury is an API microservice for generating and managing requests.

Requests are generated when the user needs a resource or wants to perform an action for which he/she has no authorization. In this case, the process is outsourced and checked by an authorized person in a ping-pong process (reject / aprove).

Mercury makes it possible to create and edit requests regardless of the context.

## Development

A running mongodb server is required to develop the app. The connection to the server is configured via .env.

`MONGO_ENDPOINT_URL="mongodb://test: test@localhost:27017"`

### Workspaces

If you develop with workspaces, you can simply start a new environment with "mongo" image and access it in the project via localhost.

**APP_PORT** is set to 27017
and the two environment variables accordingly
**MONGO_INITDB_ROOT_USERNAME** **MONGO_INITDB_ROOT_PASSWORD**

Example:

the following settings:

```
APP_PORT=27017
MONGO_INITDB_ROOT_USERNAME=test
MONGO_INITDB_ROOT_PASSWORD=test
```

result in

`"mongodb://test:test@localhost:27017"`

![Screenshot](./doc/mongo_env.png)
