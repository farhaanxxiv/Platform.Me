'use client'
import { user_company } from "@/states/user_state"
import { useAtom } from "jotai"
import EnterTagline from "./components/EnterTagline"
import Header from "./components/Header"
import UserNavbar from "./components/Navbar"
import BentoLayout from "./components/BentoLayout"
import SectionEditor from "./components/SectionEditor"
import { SectionEditorProvider } from "@/providers/SectionEditorProvider"
import EditorHeader from "./components/EditorHeader"
import { BentoEditorProvider } from "@/providers/BentoEditorMode"
import { FormEditorProvider } from "@/providers/FormEditorProvider"
import { useSession } from "next-auth/react"

export default function App() {

    const [pageName, setPageName] = useAtom(user_company)
    const { data: session, status } = useSession();

    console.log('Login Status : ', session, status)

    return (
        <>
            <BentoEditorProvider>
                <SectionEditorProvider>
                    <FormEditorProvider>
                        <Header />

                        {
                            pageName != '' &&
                            <EnterTagline />
                        }
                        <EditorHeader />

                        <section>

                            <SectionEditor />

                            <BentoLayout />
                        </section>
                    </FormEditorProvider>
                </SectionEditorProvider>
            </BentoEditorProvider>
        </>
    )
} 