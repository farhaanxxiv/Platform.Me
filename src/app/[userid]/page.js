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
import MainFooter from "@/components/main/MainFooter"
import BentoText from "@/components/app/navbars/BentoElements/BentoText"

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
        <>

            <section className="pt-32 px-0 md:px-24">
                <div>
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

                                            if (width > 767) {
                                                bentoID = section.layout?.desktop.i
                                                bentoGrid = section.layout?.desktop
                                            } else {
                                                bentoID = section.layout?.mobile.i
                                                bentoGrid = section.layout?.mobile
                                            }

                                            // console.log(section.layout?.desktop);
                                            return (

                                                <div id={bentoID} key={bentoID} data-grid={bentoGrid} >
                                                    <div className="scale-[0.96] w-full h-full lg:hover:rotate-2 transition-all">
                                                        {
                                                            section.type == 'image' ?
                                                                <BentoImage img={section} /> :
                                                                section.type == 'form' ?
                                                                    <BentoForm form={section} />
                                                                    :
                                                                    section.type == 'social' ?
                                                                        <BentoSocial social={section} />
                                                                        :
                                                                        section.type == 'text' ?
                                                                            <BentoText text={section} />
                                                                            : <p>Invalid Bento Type</p>
                                                        }
                                                    </div>
                                                </div>
                                            );
                                        })}

                                </ResponsiveGridLayout >
                            </>
                    }
                </div>
            </section >

            <MainFooter />
        </>
    )
}