# Create Model CLI

This CLI tool allows you to quickly create a new model in the database.

## Installation

Clone this repository and run

```js
npm install -g
```

to install dependencies globally.

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

## Usage

Replace `<model_name>` with the name of your desired model. This will create a new folder under `models` directory containing `<model_name>.ts` and `<model_name>.json` files, defining the model and its structure.

For example, to create a model named `User`, run:

```bash
divic_test create-model User
```

This will create a folder `models/User` with `User.ts` and `User.json` files inside.
