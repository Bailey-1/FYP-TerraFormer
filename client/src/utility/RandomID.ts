const RandomID = () => {
    return Math.random().toString(36).slice(2, 7);
};

export default RandomID;
