import fs from 'fs';
import Ajv from 'ajv';

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

fs.writeFileSync('validateData.js', `module.exports = ${validateFunctionSourceCode};`);
