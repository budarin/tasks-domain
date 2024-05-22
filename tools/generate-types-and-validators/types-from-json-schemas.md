Для генерации типов из json-схем нужно выполнить команду

```cmd
json2ts -i schema.json -o interface.ts
```

AJV сам по себе не генерирует TypeScript файлы с функциями валидации для использования в качестве отдельных модулей напрямую. Однако, AJV может быть использован в вашем коде для создания функций валидации в рантайме, то есть во время выполнения вашего приложения.

Если вы хотите сгенерировать TypeScript или JavaScript файлы с функциями валидации, которые можно импортировать и использовать как модули, вам потребуется какой-то дополнительный инструмент или скрипт, который будет использовать AJV для генерации этих файлов.

Например, вы можете написать Node.js скрипт, который использует AJV для компиляции схем и создания файлов с функциями валидации. Вот пример такого скрипта:

```js
const fs = require('fs');
const Ajv = require('ajv');
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
```

После выполнения этого скрипта у вас будет файл validateData.js, который экспортирует функцию валидации. Вы можете импортировать эту функцию в другие части вашего приложения и использовать её для валидации данных.

Однако, если вы ищете решение "из коробки", которое выполняет подобные задачи, typescript-json-validator может быть более подходящим выбором, поскольку он предназначен для создания файлов с функциями валидации на основе JSON Schema и TypeScript типов.
