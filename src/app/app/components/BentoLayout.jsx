import BentoForm from '@/components/app/navbars/BentoElements/BentoForm';
import BentoSocial from '@/components/app/navbars/BentoElements/BentoSocial';
import BentoText from '@/components/app/navbars/BentoElements/BentoText';
import BentoImage from '@/components/app/navbars/BentoElements/Image';
import { Button } from '@/components/ui/button';
import { useBentoEditorMode } from '@/providers/BentoEditorMode';
import { useLayoutManager } from '@/providers/LayoutManager';
import { useSectionEditor } from '@/providers/SectionEditorProvider';
import { currentSelectedSection, currentUserLayout } from '@/states/ui_state';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { Edit } from 'lucide-react';
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


        const updatedLayout = userLayout.slice()


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
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (event) => {
        setIsDragging(false);
        setStartPos({ x: event.clientX, y: event.clientY });
    };


    const onLayoutChange = (newLayout) => {

        console.log('newLayout :', newLayout);
        updateUserLayoutAtom(newLayout)

    };

    function handleSectionClick(section) {

        // if (editorMode == 'section') {

        updateSelectedSection(section)
        openSectionEditor()
        // }

    }

    useEffect(() => {
        console.log('editorDevice :', editorDevice);
        router.refresh()
    }, [editorDevice])

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <section className="pt-6 px-0 md:px-24">
            <div>
                <ResponsiveGridLayout
                    className={`layout  ${editorDevice == 'mobile' && 'w-[400px]'} mx-auto transition px-0 border-2 border-black `}
                    layout={userLayout}
                    onLayoutChange={onLayoutChange}
                    cols={12}
                    rowHeight={30}
                    draggableHandle=".draggable"
                    isResizable={editorMode == 'bento' ? true : false}
                    draggableCancel='.bento-edit-btn'


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

                                <div
                                    onMouseDown={stopPropagation}
                                    onTouchStart={stopPropagation}
                                    id={bentoID} key={bentoID} className={`${editorMode == 'bento' && 'draggable'}`} data-grid={bentoGrid} >
                                    <Button className='bento-edit-btn absolute top-3 left-3 z-[10] bg-black rounded-full text-xs p-1 px-2' onClick={() => handleSectionClick(section)}>
                                        Edit
                                    </Button>
                                    <div className='scale-[0.96] w-full h-full'>
                                        {
                                            section.type == 'image' ?
                                                <BentoImage img={section} /> :
                                                section.type == 'form' ?
                                                    <BentoForm form={section} /> :
                                                    section.type == 'social' ?
                                                        <BentoSocial social={section} /> :
                                                        section.type == 'text' ?
                                                            <BentoText text={section} />
                                                            : <p>Invalid Bento Type</p>
                                        }
                                    </div>
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
        </section>

    );
};

export default BentoLayout;
