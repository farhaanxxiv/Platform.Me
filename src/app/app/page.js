'use client'
import EnterTagline from "./components/EnterTagline"
import BentoLayout from "./components/BentoLayout"
import SectionEditor from "./components/SectionEditor"
import { SectionEditorProvider } from "@/providers/SectionEditorProvider"
import EditorHeader from "./components/EditorHeader"
import { BentoEditorProvider } from "@/providers/BentoEditorMode"
import { FormEditorProvider } from "@/providers/FormEditorProvider"
import { AuthProvider, useAuth } from "@/providers/AuthProvider"
import { LayoutManagerProvider, useLayoutManager } from "@/providers/LayoutManager"
import { useEffect, useState } from "react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"



import FormSubmissionsLayout from "./components/FormSubmissionsLayout"
import Sidebar from "./components/Sidebar"
import PageSettings from "./components/PageSettings"

export default function App() {

    return (


        <SectionEditorProvider>
            <FormEditorProvider>

                <LayoutEditPage />

            </FormEditorProvider>
        </SectionEditorProvider>

    )

}

function LayoutEditPage() {
    const { loading } = useAuth()
    const { validateLocalAndDBLayouts } = useLayoutManager()
    const [loadingState, setLoadingState] = useState(true)

    async function getState() {
        console.log('call state')
        validateLocalAndDBLayouts()
    }


    useEffect(() => {
        if (!loading) getState()
    }, [loading])



    return (
        <>

            {
                loadingState ?
                    <>
                        <div id="layout_editor_container" className="flex mt-12">
                            <div className="w-full">
                                <PageSettings />
                                <EditorHeader />
                                <BentoLayout />
                            </div>
                        </div>
                        <SectionEditor />
                    </>
                    :
                    <p > <b> Loading State :  </b>(Synchronising Local & DB States)</p>
            }

        </>


    )
} 