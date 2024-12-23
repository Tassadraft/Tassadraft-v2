const slugify = (str = '') => str.toLowerCase().replace(/ /g, '-').replace(/\./g, '');

export default slugify;
