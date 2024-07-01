
const FormUtils = {

    generateUniqueId: () => {
        // Get the current timestamp
        const timestamp = Date.now();

        // Function to generate a random alphanumeric character
        function getRandomChar() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            return chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Generate a 5-character alphanumeric string
        let randomString = '';
        for (let i = 0; i < 5; i++) {
            randomString += getRandomChar();
        }

        // Concatenate the components to form the unique ID
        const uniqueId = `form-${timestamp}-${randomString}`;

        return uniqueId;
    }


}



export default FormUtils