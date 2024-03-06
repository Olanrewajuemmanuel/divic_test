import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { mockData } from "../../database/seeds/modelSeed";
import Document from "../../database/document";

interface ModelRequest extends Request {
  modelName: string;
  fields: string;
  filters: string;
}

export default function modelController(
  request: Request<{}, {}, ModelRequest>,
  response: Response
) {
  const { modelName, fields, filters } = request.query;

  if (!modelName) return response.status(400).send("Model name is required");

  //   Check if model exists
  const source = path.join(__dirname, "../../", "models");
  const listDirs = fs.readdirSync(source, { withFileTypes: false });
  if (
    !listDirs.find(
      (dir) =>
        dir.toString().toLowerCase() === modelName.toString().toLowerCase()
    )
  )
    return response.status(404).json({ error: "Model not found" });

  const data: Document[] =
    mockData[modelName.toString().toLowerCase() as keyof {}];
  // No data for model available
  if (!data)
    return response.json({
      error: {
        message: `No record of ${modelName} found`,
      },
    });

  let results: Document[] = data;

  // Apply filters
  if (filters) {
    // TODO: Lowercase search
    try {
      let parsedFilters = JSON.parse(filters.toString());
      for (const field in parsedFilters) {
        const [operator, value] = parsedFilters[field];

        results = results.filter((item) => {
          switch (operator) {
            case "==":
              // Fullname filter
              if (field === "fullName") {
                return (
                  `${item["firstName" as keyof {}]} ${
                    item["lastName" as keyof {}]
                  }` === value
                );
              }
              return item[field as keyof {}] === value;
            case ">=":
              if (field === "id") {
                return item[field as keyof {}] >= parseInt(value);
              }
              return new Date(item[field as keyof {}]) >= new Date(value);
            case "<=":
              if (field === "id") {
                item[field as keyof {}] <= value;
              }
              return new Date(item[field as keyof {}]) <= new Date(value);

            // Add more comparison operators as needed
            default:
              return true;
          }
        });
      }
    } catch (error) {
      return response.status(400).send(error);
    }
  }

  //   Apply field filters logic
  if (fields) {
    try {
      let parsedFields = JSON.parse(fields.toString());
      if (parsedFields.length && !parsedFields.includes("*")) {
        // There is a specific field to find
        results = results.map((item) => {
          const filteredItem: any = {};
          parsedFields.forEach((field: string) => {
            filteredItem[field] = item[field as keyof {}];
          });
          return filteredItem;
        });
      }
    } catch (error) {
      return response.status(400).send(error);
    }
  }
  return response.send(results);
}
