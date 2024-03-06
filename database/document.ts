import fs from "node:fs";
import path from "node:path";

interface FieldDefinition {
  id: string | number;
  name: string;
  type: "number" | "string";
  required?: boolean;
}

export default class Document {
  static tableName: string;

  static fields: FieldDefinition[] = [];

  constructor(data: any = {}) {
    // Populate fields
    Object.assign(this, data);
  }

  static getTableName() {
    // Enforce table name
    return `tab${this.tableName[0].toUpperCase() + this.tableName.slice(1)}`;
  }

  static loadFieldsFromJson() {
    const fileName = `${this.tableName.replace("tab", "")}`;
    const filePath = `../${fileName}/${fileName}.json`;

    if (fs.existsSync(path.resolve(__dirname, filePath))) {
      const jsonData = fs.readFileSync(
        path.resolve(__dirname, filePath),
        "utf8"
      );
      this.fields = JSON.parse(jsonData)["fields"];
    } else {
      throw new Error(
        `Model definition file not found.\nCreate a ${fileName}.json file`
      );
    }
  }

  static tableNameIsValid() {
    return /^tab[A-Z][a-zA-Z0-9]*$/.test(this.tableName);
  }

  static validateModel() {
    if (!this.tableNameIsValid()) {
      throw new Error(
        `Invalid table name: ${this.tableName}. Table name should follow the pattern tab<ModelName>.`
      );
    }

    this.loadFieldsFromJson(); // Proceed to create fields
  }

  static validateData(data: {}) {
    for (const field of this.fields) {
      // Check and validate required fields
      if (field.required && !data[field.name as keyof {}]) {
        throw new Error(`${field.name} is required.`);
      }

      if (typeof data[field.name as keyof {}] !== field.type) {
        throw new Error(
          `${field.name} is of incorrect type. Expected type should be ${field.type}`
        );
      }
    }
  }

  static create(data: {}) {
    this.validateModel();
    this.validateData(data);
    console.log(`Table ${this.tableName} has been created`);
    return new this(data);
  }

  static destroy(data: {}) {
    // Drop table logic here
  }

  static alter(data: {}) {
    // Alter table logic here
  }
}
