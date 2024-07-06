import BentoForm from '@/components/app/navbars/BentoElements/BentoForm';
import BentoSocial from '@/components/app/navbars/BentoElements/BentoSocial';
import BentoImage from '@/components/app/navbars/BentoElements/Image';
import { useBentoEditorMode } from '@/providers/BentoEditorMode';
import { useLayoutManager } from '@/providers/LayoutManager';
import { useSectionEditor } from '@/providers/SectionEditorProvider';
import { currentSelectedSection, currentUserLayout } from '@/states/ui_state';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(GridLayout);

const BentoLayout = () => {
    const [defaultLayoutsLoaded, setDefaultLayoutsLoaded] = useState(false)

    const { userLayout, updateUserLayout } = useLayoutManager()

    const [selectedSection, updateSelectedSection] = useAtom(currentSelectedSection)
    const { editorMode, editorDevice } = useBentoEditorMode()
    const { openSectionEditor } = useSectionEditor()
    const router = useRouter();



    function updateUserLayoutAtom(newLayout) {


        const updatedLayout = userLayout


        newLayout.forEach(layout => {

            for (let i = 0; i < updatedLayout.length; i++) {

                if (layout.i == updatedLayout[i].id) {
                    if (editorDevice == 'desktop')
                        updatedLayout[i].layout.desktop = layout
                    else
                        updatedLayout[i].layout.mobile = layout
                }
            }

        });

        updateUserLayout(updatedLayout)


    }

    // useLayoutEffect(() => {
    //     checkIfLocalAndUpdateLayout();
    // }, []);

    // function checkIfLocalAndUpdateLayout() {
    //     const savedLayout = localStorage.getItem('layout');

    //     if (savedLayout) {
    //         updateUserLayout(JSON.parse(savedLayout));
    //     } else {
    //         updateUserLayout([]);
    //     }

    //     setDefaultLayoutsLoaded(true)
    // }

    const onLayoutChange = (newLayout) => {

        console.log('newLayout :', newLayout);
        updateUserLayoutAtom(newLayout)

    };

    function handleSectionClick(section) {

        if (editorMode == 'section') {

            updateSelectedSection(section)
            openSectionEditor()
        }

    }

    useEffect(() => {
        router.refresh()
    }, [editorDevice])

    return (
        <div>
            <ResponsiveGridLayout
                className={`layout ${editorDevice == 'mobile' && 'w-[450px] mx-auto'} transition border-2 border-black border-solid`}
                layout={userLayout}
                onLayoutChange={onLayoutChange}
                cols={12}
                rowHeight={30}
                draggableHandle=".draggable"
                isResizable={editorMode == 'bento' ? true : false}

            >
                {

                    (userLayout.length !== 0 || userLayout == undefined) && userLayout.map((section) => {

                        let bentoID, bentoGrid

                        if (editorDevice == 'desktop') {
                            bentoID = section.layout?.desktop.i
                            bentoGrid = section.layout?.desktop
                        } else {
                            bentoID = section.layout?.mobile.i
                            bentoGrid = section.layout?.mobile
                        }

                        return (

                            <div onClick={() => handleSectionClick(section)} id={bentoID} key={bentoID} className={`${editorMode == 'bento' && 'draggable'} ${selectedSection.id == section.id && 'border-2 border-solid border-black'}`} data-grid={bentoGrid} >
                                {
                                    section.type == 'image' ?
                                        <BentoImage img={section} /> :
                                        section.type == 'form' ?
                                            <BentoForm form={section} /> :
                                            section.type == 'social' ?
                                                <BentoSocial social={section} />
                                                : <p>Invalid Bento Type</p>
                                }
                            </div>
                        );
                    })
                }

            </ResponsiveGridLayout >

            {
                (userLayout.length == 0 || userLayout == undefined)
                &&
                <p className='font-bold text-2xl text-center'>Empty Layout</p>
            }

        </div>

    );
};

export default BentoLayout;
