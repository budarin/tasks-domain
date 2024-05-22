module.exports = function validate10(
    data,
    { instancePath = '', parentData, parentDataProperty, rootData = data } = {},
) {
    let vErrors = null;
    let errors = 0;
    if (errors === 0) {
        if (data && typeof data == 'object' && !Array.isArray(data)) {
            let missing0;
            if ((data.name === undefined && (missing0 = 'name')) || (data.age === undefined && (missing0 = 'age'))) {
                validate10.errors = [
                    {
                        instancePath,
                        schemaPath: '#/required',
                        keyword: 'required',
                        params: { missingProperty: missing0 },
                        message: "must have required property '" + missing0 + "'",
                    },
                ];
                return false;
            } else {
                const _errs1 = errors;
                for (const key0 in data) {
                    if (!(key0 === 'name' || key0 === 'age')) {
                        validate10.errors = [
                            {
                                instancePath,
                                schemaPath: '#/additionalProperties',
                                keyword: 'additionalProperties',
                                params: { additionalProperty: key0 },
                                message: 'must NOT have additional properties',
                            },
                        ];
                        return false;
                        break;
                    }
                }
                if (_errs1 === errors) {
                    if (data.name !== undefined) {
                        const _errs2 = errors;
                        if (typeof data.name !== 'string') {
                            validate10.errors = [
                                {
                                    instancePath: instancePath + '/name',
                                    schemaPath: '#/properties/name/type',
                                    keyword: 'type',
                                    params: { type: 'string' },
                                    message: 'must be string',
                                },
                            ];
                            return false;
                        }
                        var valid0 = _errs2 === errors;
                    } else {
                        var valid0 = true;
                    }
                    if (valid0) {
                        if (data.age !== undefined) {
                            let data1 = data.age;
                            const _errs4 = errors;
                            if (errors === _errs4) {
                                if (typeof data1 == 'number' && isFinite(data1)) {
                                    if (data1 < 0 || isNaN(data1)) {
                                        validate10.errors = [
                                            {
                                                instancePath: instancePath + '/age',
                                                schemaPath: '#/properties/age/minimum',
                                                keyword: 'minimum',
                                                params: { comparison: '>=', limit: 0 },
                                                message: 'must be >= 0',
                                            },
                                        ];
                                        return false;
                                    }
                                } else {
                                    validate10.errors = [
                                        {
                                            instancePath: instancePath + '/age',
                                            schemaPath: '#/properties/age/type',
                                            keyword: 'type',
                                            params: { type: 'number' },
                                            message: 'must be number',
                                        },
                                    ];
                                    return false;
                                }
                            }
                            var valid0 = _errs4 === errors;
                        } else {
                            var valid0 = true;
                        }
                    }
                }
            }
        } else {
            validate10.errors = [
                {
                    instancePath,
                    schemaPath: '#/type',
                    keyword: 'type',
                    params: { type: 'object' },
                    message: 'must be object',
                },
            ];
            return false;
        }
    }
    validate10.errors = vErrors;
    return errors === 0;
};
