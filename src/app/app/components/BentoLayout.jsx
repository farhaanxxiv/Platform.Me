import BentoForm from '@/components/app/navbars/BentoElements/BentoForm';
import BentoSocial from '@/components/app/navbars/BentoElements/BentoSocial';
import BentoImage from '@/components/app/navbars/BentoElements/Image';
import { useBentoEditorMode } from '@/providers/BentoEditorMode';
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
    const [userLayout, updateUserLayout] = useAtom(currentUserLayout)
    const [selectedSection, updateSelectedSection] = useAtom(currentSelectedSection)
    const { editorMode, editorDevice } = useBentoEditorMode()
    const { openSectionEditor } = useSectionEditor()
    const router = useRouter();



    function updateUserLayoutAtom(newLayout) {

        console.log('id')

        const updatedLayout = userLayout

        console.log(updatedLayout)

        newLayout.forEach(layout => {

            for (let i = 0; i < updatedLayout.length; i++) {
                console.log('layoutId : ', layout.i, 'updatedLayoutId: ', updatedLayout[i].id)

                if (layout.i == updatedLayout[i].id) {
                    console.log('layoutId : ', layout.i, 'updatedLayoutId: ', updatedLayout[i].id)
                    if (editorDevice == 'desktop')
                        updatedLayout[i].layout.desktop = layout
                    else
                        updatedLayout[i].layout.mobile = layout
                }
            }

        });

        updateUserLayout(updatedLayout)

        localStorage.setItem('layout', JSON.stringify(updatedLayout))

    }

    useLayoutEffect(() => {
        checkIfLocalAndUpdateLayout();
    }, []);

    function checkIfLocalAndUpdateLayout() {
        const savedLayout = localStorage.getItem('layout');

        if (savedLayout) {
            console.log('Saved layout found');
            updateUserLayout(JSON.parse(savedLayout));
        } else {
            console.log('No saved layout found, using default layout');
            updateUserLayout([]);
        }

        setDefaultLayoutsLoaded(true)
    }

    const onLayoutChange = (newLayout) => {

        if (defaultLayoutsLoaded) {
            console.log('Layout updated:', newLayout);
            updateUserLayoutAtom(newLayout)

        }

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
                        console.log('Editor Device While Rendering : ', editorDevice)

                        if (editorDevice == 'desktop') {
                            bentoID = section.layout?.desktop.i
                            bentoGrid = section.layout?.desktop
                        } else {
                            bentoID = section.layout?.mobile.i
                            bentoGrid = section.layout?.mobile
                        }

                        console.log('Bento Grid On Render : ', editorDevice, bentoGrid)

                        // console.log(section.layout?.desktop);
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
