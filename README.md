# Backend Engineer Test Task (Divic)

This is the complete backend application for the application for Divic's MERN developer task

Ensure you have Node installed. Node version >=v17
To use, you can clone the repository and run:

```bash
$ npm install
```

to install the dependencies.

Compile files by running the following command (Typescript compiler is required):

```bash
$ npm run build
```

This will create a `dist/` folder containing the compiled JS files.
Run a JS file by passing the path of the file relative to the `dist` folder as a node command:

For example,

```bash
$ node dist/server.js
```

## Application Usage

1. Hooks
   The hooks are present in the `hooks/` folder. Navigate to the `hooks/examples/` folder to see examples on how the hooks are implemented.

   For example, to implement the `afterStart` hook:

```js
// hooks/afterStartEx.ts
import { registerHook, runHooks } from "../index";

async function afterStartFunction1() {
  console.log("Logger is online...");
}

async function afterStartFunction2() {
  console.log("DB is connecting...");
}

async function afterStartFunction3() {
  console.log("Running after check 1 and 2");
}

// Register each function as hooks
registerHook("afterStart", afterStartFunction1);
registerHook("afterStart", afterStartFunction2);
registerHook("afterStart", afterStartFunction3);

async function startApp() {
  /**
   * Application code logic...
   * ...
   * */

  // Run the hooks
  await runHooks("afterStart");
}

startApp(); // Start server
```

2. CLI Tool for Model Creation.

This CLI tool allows you to quickly create a new model.

To use the CLI tool provided by the application, navigate to the root folder of the application and run

```bash
$ npm install -g
```

to install dependencies globally.

(Optional) You may additionally need to give the CLI executable permission by running:

```bash
$ chmod u+x ./bin/create-model.js
```

Test the CLI by executing the command in the terminal

```bash
$ divic_test
```

If all is done correctly, a welcome message will be displayed on the console:

```bash
$ divic_test
Hello! This shows that your installation was successful:

Create a new model using the following command:

divic_test create-model <model_name>
```

- CLI usage

Replace `<model_name>` with the name of your desired model. This will create a new folder under `models` directory containing `<model_name>.ts` and `<model_name>.json` files, defining the model and its structure.

For example, to create a model named `User`, run:

```bash
$ divic_test create-model User
```

This will create a folder `models/User` with `User.ts` and `User.json` files inside.

Define the `User` model in the `User.json` file:

```json
// User.json
{
  "name": "User",
  "fields": [
    { "name": "id", "type": "string", "required": true },
    { "name": "firstName", "type": "string", "required": true },
    { "name": "lastName", "type": "string", "required": true }
  ]
}
```

Create a `User` instance like so:

```js
// mockUser.ts

import { User } from "../models/User/User";

const user = User.create({
  id: 1,
  firstName: "Larry",
  lastName: "Olaleru",
});
```

3. API Endpoint

To run the server made for this application, run the following command:

```bash
$ node dist/server.js
```

If no default port has been set, go to the address `http://127.0.0.1:8000/metrics/`. If everything goes well, you should get a 200 (OK) response.
If a port was set, go to the address `http://127.0.0.1:{PORT}/metrics/`

- Usage
  To retrieve data based on model name, navigate to the web address, `http://127.0.0.1:8000/api/model-data`.

Query parameters include:

- modelName (required): Name of the model (e.g., User)
- fields: An array specifying fields to retrieve e.g., ['*'] retrieves all fields while ['firstName'] retrieves the firstName of all `User` data
- filters: Object specifying filter conditions (e.g., { "fullName": ["==", "David"], "createdAt": [">=", "1-1-2023"] }). Supported operators include ==, >= and <=.

To work with the endpoint, you can create mock data by navigating to the `database/seeds/` folder.
Use the `modelSeed.ts` file to create mock data like so:

```js
// database/seeds/modelSeed.ts
import { User } from "../../models/User/User";

// Add mock data here

export const mockData = {
  user: [
    new User({
      id: 1,
      firstName: "Larry",
      lastName: "Olaleru",
      createdAt: "2023-01-01",
    }),
    new User({
      id: 2,
      firstName: "David",
      lastName: "Joe",
      createdAt: "2022-06-01",
    }),
  ],
  profile: [],
  // Add more mock data by following the convention: modelname: [model instance]
};
```

## Mail

[Larry](mailto:olalerulanre@gmail.com)
