import fs from "node:fs";

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
    // Check and validate required fields
    for (const field of Document.fields) {
      if (field.required && !data[field.name]) {
        throw new Error(`${field.name} is required.`);
      }
    }

    // Populate fields
    Object.assign(this, data);
  }

  static getTableName() {
    // Enforce table name
    return `tab${this.tableName[0].toUpperCase() + this.tableName.slice(1)}`;
  }

  static loadFieldsFromJson() {
    const fileName = `${this.tableName}.json`;
    const filePath = `./models/${fileName}`;

    console.log(fileName);

    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, "utf8");
      this.fields = JSON.parse(jsonData);
    } else {
      throw new Error(
        `Model definition file not found.\n Create a ${fileName}.json file`
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

  static create(data: any) {
    this.validateModel();
    console.log(`${this.tableName} has been saved`);
    return new this(data);
  }

  static destroy(data: any) {
    // Drop table logic here
  }

  static alter(data: any) {
    // Alter table logic here
  }
}
