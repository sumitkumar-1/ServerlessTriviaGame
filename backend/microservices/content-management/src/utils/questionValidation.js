const isRequestValid = (requestBody, type) => {
    const allowedKeys = [
        "category",
        "difficulty",
        "question",
        "options",
        "correctAnswer",
        "explanation",
        "points"
    ];

    if (type === "edit") {
        for (const key of Object.keys(requestBody)) {
            if (!allowedKeys.includes(key)) {
                return false;
            }
        }
    } else if (type === "create") {
        for (const key of allowedKeys) {
            if (!requestBody.hasOwnProperty(key)) {
                return false;
            }
        }
    } else {
        return false;
    }

    return true;
};

module.exports = { isRequestValid };