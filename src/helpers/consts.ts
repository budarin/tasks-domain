export const onInput = (event: Event) => {
    (event.currentTarget as HTMLObjectElement).setCustomValidity('');
};

export const getOnInvalid =
    <T extends HTMLInputElement>(title: string, min: number, max: number) =>
    (event: Event) => {
        const element = event.currentTarget as T;
        const errorMessage = !element.value
            ? `Поле "${title}" обязательно для заполнения`
            : `"${title}" должно содержать от ${min} до ${max} символов`;

        element.setCustomValidity(errorMessage);
    };
