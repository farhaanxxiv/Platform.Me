'use client'

import BentoForm from "@/components/app/navbars/BentoElements/BentoForm"
import BentoSocial from "@/components/app/navbars/BentoElements/BentoSocial"
import BentoImage from "@/components/app/navbars/BentoElements/Image"
import MainHeader from "@/components/main/MainHeader"
import useWindowSize from "@/providers/useWindowSize"
import { useEffect, useState } from "react"
import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function Page() {

    const [userLayout, setUserLayout] = useState([])
    const { width, height } = useWindowSize();
    // const width = 500

    useEffect(() => {
        setUserLayout(JSON.parse(localStorage.getItem('layout')))
        console.log(userLayout)
    }, [])


    const ResponsiveGridLayout = WidthProvider(GridLayout);


    return (

        <section>
            <MainHeader />
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
                    })
                }

            </ResponsiveGridLayout >
        </section >
    )
}