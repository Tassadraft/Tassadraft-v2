const getBase64Strings = async (photos) => {
    const promises = photos.map(async (photo) => {
        const response = await fetch(photo.uri);
        const blob = await response.blob();

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                resolve(base64String);
            };
            reader.readAsDataURL(blob);
        });
    });
    return (await Promise.all(promises)).filter((string) => string !== undefined);
};

export default getBase64Strings;
