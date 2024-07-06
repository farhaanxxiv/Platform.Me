'use client'

import BentoForm from "@/components/app/navbars/BentoElements/BentoForm"
import BentoSocial from "@/components/app/navbars/BentoElements/BentoSocial"
import BentoImage from "@/components/app/navbars/BentoElements/Image"
import MainHeader from "@/components/main/MainHeader"
import useWindowSize from "@/providers/useWindowSize"
import { collection, getDocs, query, where } from "firebase/firestore"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { db } from "../layout"
import Layout from "@/firebase/Layout"

export default function Page() {

    const [userLayout, setUserLayout] = useState(null)
    const [userPage, setUserPage] = useState(null)

    const { width, height } = useWindowSize();
    const [loading, setLoading] = useState(true)
    const pathName = usePathname()

    async function getPageFromSlug() {


        const slug = pathName.substring(1);

        console.log('pathName :', pathName);
        const pagesRef = collection(db, "Pages");
        const pageQuery = query(pagesRef, where("slug", "==", slug));

        const querySnapshot = await getDocs(pageQuery);

        const resultSize = querySnapshot.size
        console.log('querySnapshot :', querySnapshot.size);
        if (resultSize == 0) {
            setLoading(false)
            return
        }

        let page_data
        querySnapshot.forEach((doc) => {
            page_data = doc.data()
        });

        const layout = page_data.layout
        const page = page_data.page

        const cleanLayout = Layout.replaceTrueWithFalse(layout)
        console.log('cleanLayout :', cleanLayout);

        setUserLayout(cleanLayout)
        setUserPage(page)

        setLoading(false)
    }


    useEffect(() => {
        getPageFromSlug()
    }, [])


    const ResponsiveGridLayout = WidthProvider(GridLayout);


    return (

        <section>
            {loading ?
                <p className="font-semibold">Loading...</p>
                : userLayout == null ?
                    <p>No User Found</p>
                    :
                    <>
                        <MainHeader page={userPage} />
                        <ResponsiveGridLayout
                            layout={userLayout}
                            cols={12}
                            rowHeight={30}
                            isDraggable={false}
                            isResizable={false}
                            isBounded={false}
                            isDroppable={false}

                        >


                            {
                                (userLayout.length !== 0 || userLayout == undefined) && userLayout.map((section) => {

                                    let bentoID, bentoGrid

                                    if (width > 700) {
                                        bentoID = section.layout?.desktop.i
                                        bentoGrid = section.layout?.desktop
                                    } else {
                                        bentoID = section.layout?.mobile.i
                                        bentoGrid = section.layout?.mobile
                                    }

                                    // console.log(section.layout?.desktop);
                                    return (

                                        <div id={bentoID} key={bentoID} data-grid={bentoGrid} >
                                            <div className="scale-[0.95] w-full h-full">
                                                {
                                                    section.type == 'image' ?
                                                        <BentoImage img={section} /> :
                                                        section.type == 'form' ?
                                                            <BentoForm form={section} />
                                                            :
                                                            section.type == 'social' ?
                                                                <BentoSocial social={section} />
                                                                : <p>Invalid Bento Type</p>
                                                }
                                            </div>
                                        </div>
                                    );
                                })}

                        </ResponsiveGridLayout >
                    </>
            }

        </section >
    )
}