import React from 'react';

export const onInput = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.currentTarget.setCustomValidity('');
};

const getMessage = (title: string, min: number, max: number) =>
    `Поле "${title}" должно содержать минимум ${min} и максимум ${max} символов`;

export const getOnInvalid =
    <T extends HTMLInputElement | HTMLTextAreaElement>(title: string, min: number, max: number) =>
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const element = event.currentTarget as T;

        let errorMessage = '';
        const value = element.value.replace(/\n/gm, '').trim();

        if (!element.validity.patternMismatch) {
            errorMessage = `Поле "${title}" должно начинаться с минимум ${min} символов, исключая спейцсимволы и пробелы`;
        }

        if (!value) {
            errorMessage = `Поле "${title}" обязательно для заполнения`;
        }

        if (value && (value.length < min || value.length > max)) {
            errorMessage = getMessage(title, min, max);
        }

        element.setCustomValidity(errorMessage);
    };
