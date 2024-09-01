'use client'
import EnterTagline from "./components/EnterTagline"
import Header from "./components/Header"
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

export default function App() {

    return (

        <AuthProvider>
            <LayoutManagerProvider>
                <BentoEditorProvider>
                    <SectionEditorProvider>
                        <FormEditorProvider>

                            <LayoutEditPage />

                        </FormEditorProvider>
                    </SectionEditorProvider>
                </BentoEditorProvider>
            </LayoutManagerProvider>
        </AuthProvider>
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

                        <Header />

                        <Tabs
                            defaultValue="layout"
                            className="">
                            <div className="px-20">

                                <TabsList>
                                    <TabsTrigger value="layout">Layout</TabsTrigger>
                                    <TabsTrigger value="form-submissions">Form Submissions</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="layout">
                                <EditorHeader />
                                <BentoLayout />
                            </TabsContent>
                            <TabsContent value="form-submissions">
                                <FormSubmissionsLayout />
                            </TabsContent>
                        </Tabs>


                        <SectionEditor />


                    </>
                    :
                    <p > <b> Loading State :  </b>(Synchronising Local & DB States)</p>
            }

        </>


    )
} 