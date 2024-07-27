import 'toastify-js/src/toastify.css';
import Toastify from 'toastify-js';

const successToastStyle = {
    background: 'linear-gradient(to right, #00b09b, #96c93d)',
};

const errorToastStyle = {
    background: 'linear-gradient(to right, #ff5f6d, #ffc371)',
};

const warningToastStyle = {
    background: 'linear-gradient(to right, #f09819, #edde5d)',
};

const showToast = (text, status = 'success', duration = 5000) => {
    console.log(text);
    let style = successToastStyle;
    if (status === 'error') {
        style = errorToastStyle;
    } else if (status === 'warning') {
        style = warningToastStyle;
    }

    Toastify({
        text,
        duration,
        style,
    }).showToast();
}

const storeToast = (text, status = 'success', duration = 5000) => {
    const storedToast = localStorage.getItem('toasts');
    let toasts = [];
    if (storedToast) {
        toasts = JSON.parse(storedToast);
    }
    toasts.push({ text, status, duration });
    localStorage.setItem('toasts', JSON.stringify(toasts));
}

const showStoredToasts = () => {
    const storedToast = localStorage.getItem('toasts');
    if (storedToast) {
        const toasts = JSON.parse(storedToast);
        toasts.forEach((toast) => {
            showToast(toast.text, toast.status, toast.duration);
        });
        localStorage.removeItem('toasts');
    }
}

export { showToast, storeToast, showStoredToasts };
