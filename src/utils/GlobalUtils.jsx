const GlobalUtils = {

    capitaliseFirstLetters: (str) => {
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    },
    replaceSpacesAndSpecialChars: (input) => {
        // Use a regular expression to match spaces and special characters
        return input.replace(/[^\w]/g, '_');
    }
}

export default GlobalUtils