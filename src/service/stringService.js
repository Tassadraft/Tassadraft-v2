const capitalizeFirstChar = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const raw = (str) => {
    return str.replaceAll('\n', '<br>');
};

export { capitalizeFirstChar, raw };
