#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { snakeToPascal } from "../app/Strategies/caseStrategy";

const argv = yargs(hideBin(process.argv)).parserConfiguration({}).parseSync();

const argumentsArr = argv["_"];

if (!argumentsArr.length) {
  console.log("Hello! This shows that your installation was successful\n");
  console.log("Create a new model using the following command:\n");
  console.log("divic_test create-model <model_name>");
  process.exit(1);
}

if (
  argumentsArr.length !== 2 ||
  !(argumentsArr as string[]).includes("create-model")
) {
  console.error("Command should look like so:\n");
  console.error("divic_test create-model <model_name>");
  process.exit(1);
}

const modelName = snakeToPascal(argumentsArr[1] as string);

const modelDirectory = path.join(__dirname, "../../", "models", modelName);
const modelTsFile = path.join(modelDirectory, `${modelName}.ts`);
const modelJsonFile = path.join(modelDirectory, `${modelName}.json`);

try {
  if (!fs.existsSync(modelDirectory)) {
    fs.mkdirSync(modelDirectory, { recursive: true });
  }
} catch (err) {
  console.error(err);
}

// Create {Model}.ts file
const tsCode = `
import Document from "../../database/document"

export class ${modelName} extends Document {
    static tableName = "tab${modelName}"
    
    constructor(data: any) {
        super(data);
    }
}
`;
fs.writeFileSync(modelTsFile, tsCode.trim());

// Create {Model}.json file
const jsonCode = `{
  "name": "${modelName}",
  "fields": [
    { "name": "id", "type": "number", "required": true }
  ]
}`;

fs.writeFileSync(modelJsonFile, jsonCode.trim());

console.log(`Model ${modelName} created successfully.`);
