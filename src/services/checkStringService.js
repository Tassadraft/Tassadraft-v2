const checkPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return 'common.password.match';
    } else if (password.length < 8) {
        return 'common.password.length';
    } else if (!password.match(/[a-z]/)) {
        return 'common.password.lowercase';
    } else if (!password.match(/[A-Z]/)) {
        return 'common.password.uppercase';
    } else if (!password.match(/[0-9]/)) {
        return 'common.password.number';
    } else if (!password.match(/[^a-zA-Z0-9]/)) {
        return 'common.password.special-character';
    } else {
        return '';
    }
};

const isValidEmail = (email) => {
    const isValidEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return isValidEmailRegex.test(email);
};

export { checkPassword, isValidEmail };
