const GlobalUtils = {

    capitaliseFirstLetters: (str) => {
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }
}

export default GlobalUtils