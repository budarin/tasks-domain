export function capitalizeFirstLetter(str?: string): string | undefined {
    if (!str) {
        return undefined;
    }

    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
