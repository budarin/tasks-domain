import React from 'react';

export const onInput = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.currentTarget.setCustomValidity('');
};

const getMessage = (title: string, min: number, max: number) =>
    `Поле "${title}" должно содержать минимум ${min} символов, исключая спейцсимволы и пробелы, и максимум ${max} символов`;

export const getOnInvalid =
    <T extends HTMLInputElement | HTMLTextAreaElement>(title: string, min: number, max: number) =>
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const element = event.currentTarget as T;

        let errorMessage = '';
        const value = element.value.replace(/\n/gm, '').trim();

        if (!value) {
            errorMessage = `Поле "${title}" обязательно для заполнения`;
        }

        if (element instanceof HTMLInputElement && element.pattern && !new RegExp(element.pattern).test(value)) {
            errorMessage = getMessage(title, min, max);
        }

        if (value && (value.length < min || value.length > max)) {
            errorMessage = getMessage(title, min, max);
        }

        element.setCustomValidity(errorMessage);
    };
