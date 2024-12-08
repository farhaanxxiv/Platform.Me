// app/[userid]/PageClient.js
'use client'

import { useState, useEffect, useLayoutEffect } from "react"
import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import BentoForm from "@/components/app/navbars/BentoElements/BentoForm"
import BentoSocial from "@/components/app/navbars/BentoElements/BentoSocial"
import BentoImage from "@/components/app/navbars/BentoElements/Image"
import MainHeader from "@/components/main/MainHeader"
import MainFooter from "@/components/main/MainFooter"
import BentoText from "@/components/app/navbars/BentoElements/BentoText"
import BentoSection from "@/components/app/navbars/BentoElements/BentoSection"
import { RxHamburgerMenu } from "react-icons/rx";
import GlobalUtils from "@/utils/GlobalUtils"

const ResponsiveGridLayout = WidthProvider(GridLayout);

export default function PageClient({ initialData }) {
    const [userLayout, setUserLayout] = useState(initialData.layout || null)
    const [userPage, setUserPage] = useState(initialData.page || null)
    const [loading, setLoading] = useState(false)
    const [sections, setSections] = useState([])
    const [innerWidth, setInnerWidth] = useState(0)
    const [navbarOpen, setNavbarOpen] = useState(false)
    const [pageUserUID, setPageUserUID] = useState(initialData.userid || null)
 
    useLayoutEffect(() => {
        setInnerWidth(window.innerWidth)
    }, [])

    useEffect(() => {

        if (userLayout) {
            const newSections = userLayout
                .filter(section => section.type === 'section')
                .map(section => GlobalUtils.replaceSpacesAndSpecialChars(section.heading));
            setSections(newSections);
        } 

        console.log('userLayout :', userLayout);

    }, [userLayout]);

    function toggleNavbar() {
        setNavbarOpen(!navbarOpen)
    }

    const bgStyles = {
        background: 'rgb(0,0,0)',
        background: '-moz-linear-gradient(49deg, rgba(0,0,0,1) 0%, rgba(26,26,26,1) 21%, rgba(15,15,15,1) 64%, rgba(27,27,27,1) 100%)',
        background: '-webkit-linear-gradient(49deg, rgba(0,0,0,1) 0%, rgba(26,26,26,1) 21%, rgba(15,15,15,1) 64%, rgba(27,27,27,1) 100%)',
        background: 'linear-gradient(49deg, rgba(0,0,0,1) 0%, rgba(26,26,26,1) 21%, rgba(15,15,15,1) 64%, rgba(27,27,27,1) 100%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#1b1b1b",GradientType=1)'
    };


    return (
        <div style={bgStyles}>
            <section className="pt-12 px-0 md:px-32 overflow-x-hidden relative">
                {sections.length != 0 &&
                    <div className={`rounded-tl-xl p-4 border-solid border-2 z-[9999] bg-white border-black  fixed bottom-0 right-0`} onClick={toggleNavbar}><RxHamburgerMenu /></div>
                }

                <div>
                    {loading ? (
                        <p className="font-semibold">Loading...</p>
                    ) : userLayout == null ? (
                        <p>No User Found</p>
                    ) : (
                        <>
                            <MainHeader page={userPage} />
                            <ResponsiveGridLayout
                                className="overflow-hidden"
                                layout={userLayout}
                                cols={12}
                                rowHeight={30}
                                isDraggable={false}
                                isResizable={false}
                                isBounded={false}
                                isDroppable={false}
                                autoSize={true}
                            >
                                {userLayout.map(section => {
                                    const bentoID = innerWidth > 767 ? section.layout?.desktop.i : section.layout?.mobile.i;
                                    const bentoGrid = innerWidth > 767 ? section.layout?.desktop : section.layout?.mobile;

                                    return (
                                        <div className="w-[100dvw]" id={bentoID} key={bentoID} data-grid={bentoGrid}>
                                            <div className="scale-[0.96] w-full h-full lg:hover:rotate-2 transition-all">
                                                {section.type === 'image' ? (
                                                    <BentoImage img={section} />
                                                ) : section.type === 'form' ? (
                                                    <BentoForm form={section} page_user_id={pageUserUID} />
                                                ) : section.type === 'social' ? (
                                                    <BentoSocial social={section} />
                                                ) : section.type === 'text' ? (
                                                    <BentoText text={section} />
                                                ) : section.type === 'section' ? (
                                                    <BentoSection section={section} />
                                                ) : (
                                                    <p>Invalid Bento Type</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </ResponsiveGridLayout>
                        </>
                    )}
                </div>
                {
                    sections.length != 0 &&
                    <div className={`fixed transition-all w-full h-[100dvh] left-0 ${navbarOpen ? 'top-0' : 'top-[100%]'}`}>
                        <div className="z-[9999] w-full h-full relative transition">
                            <div onClick={toggleNavbar} className={`absolute backdrop-blur-sm top-0 left-0 right-0 bottom-0 z-[9999] w-full h-full transition bg-[#00000099] ${navbarOpen ? 'opacity-1' : 'opacity-0'}`}></div>
                            <div className="absolute bottom-0 z-[9999] bg-white w-full py-16 md:py-24">
                                <h5 className="font-semibold text-3xl mb-6 text-center">Navigate To</h5>
                                <div className="flex gap-4 flex-wrap justify-center">
                                    {sections.map(section => (
                                        <a className="bg-black text-white rounded-3xl px-3 py-1" key={section} onClick={toggleNavbar} href={`#${section}`}>{section}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </section>
            <MainFooter />
        </div>
    );
}