import CryptoJS from 'crypto-js';
import User from './User';

const Layout = {

    generateHash: (json) => {
        // Convert JSON object to a string
        const jsonString = JSON.stringify(json);
        // Create a hash using SHA-256
        const hash = CryptoJS.SHA256(jsonString).toString(CryptoJS.enc.Hex);
        return hash;
    },

    defaultPage: () => {
        const defaultpage = {
            'page_name': null,
            'page_tagline': null

        }
        return defaultpage
    },


    defaultLayout: () => {
        const defaultlayout = []
        return defaultlayout
    },
    getLocalPage: () => {
        let localLayout = localStorage.getItem('layout')
        if (localLayout) localLayout = JSON.parse(localLayout)
        else return false

        let localPage = localStorage.getItem('page')
        if (localPage) localPage = JSON.parse(localPage)
        else return false

        const page_data = {
            page: localPage,
            layout: localLayout
        }

        return page_data
    },

    getLocalHash: async () => {

        return new Promise((res, rej) => {

            let page = localStorage.getItem('page')
            if (!page) page = Layout.defaultPage()
            else page = JSON.parse(page)

            let layout = localStorage.getItem('layout')
            if (!layout) layout = Layout.defaultLayout()
            else layout = JSON.parse(layout)
            console.log('layout :', layout.length);

            const page_json = {
                page: page,
                layout: layout
            }

            const hash = Layout.generateHash(page_json)

            res(hash)

        })

    },
    getDBHash: async (page_data, uid) => {

        if (page_data == undefined) {

            const user = await User.isUser(uid)
            console.log('userLayout :', user);

            if (user != null) {

                const hash = user.last_update
                return hash

            } else {
                return null
            }
        }

    },

    replaceUndefinedWithNull: (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(item => Layout.replaceUndefinedWithNull(item));
        } else if (obj !== null && typeof obj === 'object') {
            return Object.keys(obj).reduce((acc, key) => {
                acc[key] = obj[key] === undefined ? null : Layout.replaceUndefinedWithNull(obj[key]);
                return acc;
            }, {});
        }
        return obj;
    }
}

export default Layout