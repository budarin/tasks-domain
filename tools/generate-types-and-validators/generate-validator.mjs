import fs from 'fs';
import Ajv from 'ajv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ajv = new Ajv({ code: { source: true } });

const schema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        age: { type: 'number', minimum: 0 },
    },
    required: ['name', 'age'],
    additionalProperties: false,
};

const validateFunction = ajv.compile(schema);
const validateFunctionSourceCode = validateFunction.toString();

fs.writeFileSync(path.join(__dirname, 'validate.js'), `module.exports = ${validateFunctionSourceCode};`);
