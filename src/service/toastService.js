import 'toastify-js/src/toastify.css';
import Toastify from 'toastify-js';

const successToastStyle = {
    background: 'linear-gradient(to right, #00b09b, #96c93d)',
    borderRadius: '10px',
};

const errorToastStyle = {
    background: 'linear-gradient(to right, #ff5f6d, #ffc371)',
    borderRadius: '10px',
};

const warningToastStyle = {
    background: 'linear-gradient(to right, #f09819, #edde5d)',
    borderRadius: '10px',
};

const showToast = (text, status = 'success', duration = 5000) => {
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
};

export { showToast };
