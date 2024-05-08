import React from 'react';

export const onInput = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.currentTarget.setCustomValidity('');
};

export const getOnInvalid =
    <T extends HTMLInputElement | HTMLTextAreaElement>(title: string, min: number, max: number) =>
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const element = event.currentTarget as T;

        let errorMessage = '';
        const value = element.value.replace(/\n/gm, '').trim();

        if (!value) {
            errorMessage = `Поле "${title}" обязательно для заполнения`;
        }

        if (value && (value.length < min || value.length > max)) {
            errorMessage = `"${title}" должно содержать от ${min} до ${max} символов, исключая спейцсимволы и пробелы`;
        }

        element.setCustomValidity(errorMessage);
    };
