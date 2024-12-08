
// export async function generateStaticParams() {

import PageClient from "./PageClient";


//     const pagesData = await fetch(`${process.env.URL}/api/pages/`).then(
//         (res) => res.json()
//     )

//     const allSlugs = pagesData.map(item => item.slug);

//     console.log('allSlugs :', allSlugs);

//     const paths = allSlugs.map((userid) => ({
//         params: { userid: userid.toString() },
//     }));

//     return { paths, fallback: 'blocking' }; // Generate on-demand for new pages

// }


export default async function Page({ params }) {
    console.log('params :', params);

    const pageData = await fetch(`${process.env.URL}/api/pages/${params.userid}`).then(
        (res) => res.json()
    )
    
    return (
        <>
            <PageClient initialData={pageData} />
        </>
    )
}