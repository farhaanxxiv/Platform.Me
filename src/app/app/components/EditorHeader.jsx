import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBentoEditorMode } from "@/providers/BentoEditorMode"
import { useEffect } from "react"
import UserNavbar from "./Navbar"
import { Button } from "@/components/ui/button"
import { useLayoutManager } from "@/providers/LayoutManager"
import { useAuth } from "@/providers/AuthProvider"


export default function EditorHeader() {

    const { editorMode, setEditorMode, editorDevice, setEditorDevice } = useBentoEditorMode()
    const { enableSave, setEnableSave, updateLayoutInDB } = useLayoutManager()
    const { user } = useAuth()

    return (

        <section className="py-4 border-b-2 border-black ">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <div>
                        <UserNavbar />
                    </div>

                    <div>
                        <Tabs
                            defaultValue="desktop"
                            value={editorDevice}
                            onValueChange={(value) => setEditorDevice(value)}
                            className="">
                            <span className="text-xs font-semibold"> View :&nbsp;</span>
                            <TabsList>
                                <TabsTrigger va lue="mobile">Mobile</TabsTrigger>
                                <TabsTrigger value="desktop">Desktop</TabsTrigger>
                            </TabsList>
                            {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent> */}
                        </Tabs>
                    </div>
                    <Tabs
                        defaultValue="bento"
                        value={editorMode}
                        onValueChange={(value) => setEditorMode(value)}
                        className="">
                        <span className="text-xs font-semibold"> Editing Mode :  &nbsp;</span>
                        <TabsList>
                            <TabsTrigger value="bento">Layout</TabsTrigger>
                            <TabsTrigger value="section">Edit</TabsTrigger>
                        </TabsList>
                        {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent> */}
                    </Tabs>
                </div>
                <Button onClick={() => { updateLayoutInDB(user.uid) }} disabled={!enableSave}>Save Changes</Button>
            </div >
        </section >
    )
}