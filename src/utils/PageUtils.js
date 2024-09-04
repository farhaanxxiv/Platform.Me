'use client'


const PageUtils = {
    getPageData: () => {
        const page = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page')) : null;

        return page;
    },

    setPageName: (pageName) => {
        const page = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page')) : null;

        if (typeof window !== 'undefined') {
            if (page) {
                page.page_name = pageName;
                localStorage.setItem('page', JSON.stringify(page));
            } else {
                const newJSON = {
                    page_name: pageName
                };
                localStorage.setItem('page', JSON.stringify(newJSON));
            }
        }
    },
    setPageTitle: (pageTagline) => {
        const page = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page')) : null;

        if (typeof window !== 'undefined') {
            if (page) {
                page.page_tagline = pageTagline;
                localStorage.setItem('page', JSON.stringify(page));
            } else {
                const newJSON = {
                    page_tagline: pageTagline
                };
                localStorage.setItem('page', JSON.stringify(newJSON));
            }
        } else {
            console.log('noooo')
        }
    },
    setPageSlug: (pageSlug) => {
        const page = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page')) : null;

        if (typeof window !== 'undefined') {
            if (page) {
                page.page_tagline = pageSlug;
                localStorage.setItem('page', JSON.stringify(page));
            } else {
                const newJSON = {
                    page_tagline: pageSlug
                };
                localStorage.setItem('page', JSON.stringify(newJSON));
            }
        } else {
            console.log('noooo')
        }
    },
    getPageName: () => {
        const page = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page')) : null;
        console.log('page in pageutils:', page);

        // const page = JSON.parse(localStorage.getItem('page'));                       
        if (page) {
            const page_name = page.page_name;
            return page_name;
        }

        console.log('returning null')
        return null;
    },

    getPageTagline: () => {
        const page = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page')) : null;

        if (page) {
            const page_tagline = page.page_tagline;
            return page_tagline;
        } else {
            return null;
        }
    },
    getPageSlug: () => {
        const slug = typeof window !== 'undefined' ? localStorage.getItem('slug') : null;

        if (slug) {
            return slug;
        } else {
            return null;
        }
    },

    isPageDataAvailable: () => {
        const page = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('page')) : null;

        if (typeof window !== 'undefined') {
            const page = localStorage.getItem('page');
            return !!page;
        }
        return false;
    }
}

export default PageUtils;
