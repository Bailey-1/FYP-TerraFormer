const RandomID = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 5; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length),
        );
    }

    return result;
};

export default RandomID;
