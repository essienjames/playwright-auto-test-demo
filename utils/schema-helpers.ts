import Ajv from 'ajv';
import addFormats from "ajv-formats"
import { readFileSync } from 'fs';
import * as path from 'path';

const ajv = new Ajv();
addFormats(ajv); // enables support for formats like "date-time"

// Helper function to load schema from fixtures
const loadSchema = (schemaName: string) => {
    return JSON.parse(readFileSync(path.join(__dirname, '../fixtures', `${schemaName}-schema.json`), 'utf-8'));
};

// Function to validate response with a given schema
export const validateSchema = (schemaName: string, data: any): boolean => {
    const schema = loadSchema(schemaName);
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        console.error(`Schema validation failed for ${schemaName}:`, validate.errors);
    }
    return valid;
};
