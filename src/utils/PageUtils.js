'use client'


const PageUtils = {
    getPageData: () => {
        const page_data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page_data')) : null;

        return page_data;
    },

    setPageName: (pageName) => {
        const page_data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page_data')) : null;

        if (typeof window !== 'undefined') {
            if (page_data) {
                page_data.page_name = pageName;
                localStorage.setItem('page_data', JSON.stringify(page_data));
            } else {
                const newJSON = {
                    page_name: pageName
                };
                localStorage.setItem('page_data', JSON.stringify(newJSON));
            }
        }
    },
    setPageTitle: (pageTagline) => {
        const page_data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page_data')) : null;

        if (typeof window !== 'undefined') {
            if (page_data) {
                page_data.page_tagline = pageTagline;
                localStorage.setItem('page_data', JSON.stringify(page_data));
            } else {
                const newJSON = {
                    page_tagline: pageTagline
                };
                localStorage.setItem('page_data', JSON.stringify(newJSON));
            }
        } else {
            console.log('noooo')
        }
    },
    getPageName: () => {
        const page_data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page_data')) : null;

        if (typeof window !== 'undefined') {
            const page_data = JSON.parse(localStorage.getItem('page_data'));
            if (page_data) {
                const page_name = page_data.page_name;
                return page_name;
            }
        }
        return null;
    },

    getPageTagline: () => {
        const page_data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page_data')) : null;

        if (page_data) {
            const page_tagline = page_data.page_tagline;
            return page_tagline;
        } else {
            return null;
        }
    },

    isPageDataAvailable: () => {
        const page_data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page_data')) : null;

        if (typeof window !== 'undefined') {
            const page_data = localStorage.getItem('page_data');
            return !!page_data;
        }
        return false;
    }
}

export default PageUtils;
