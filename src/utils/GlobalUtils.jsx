const GlobalUtils = {

    capitaliseFirstLetters: (str) => {
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    },
    replaceSpacesAndSpecialChars: (input) => {
        // Use a regular expression to match spaces and special characters
        return input.replace(/[^\w]/g, '_');
    },
    uuid: () => {
        const timestamp = Date.now().toString(36); // Converts the timestamp to a base-36 string
        const randomChars = Math.random().toString(36).substring(2, 7); // Generates 5 random alphanumeric characters
        return `${timestamp}-${randomChars}`;

    }
}

export default GlobalUtils