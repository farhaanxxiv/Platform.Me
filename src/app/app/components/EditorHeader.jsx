import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBentoEditorMode } from "@/providers/BentoEditorMode"
import { useEffect } from "react"
import UserNavbar from "./Navbar"
import { Button } from "@/components/ui/button"
import { useLayoutManager } from "@/providers/LayoutManager"
import { useAuth } from "@/providers/AuthProvider"
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { MdMonitor } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { BiDownArrow, BiUpArrow } from "react-icons/bi"

export default function EditorHeader() {

    const { editorMode, setEditorMode, editorDevice, setEditorDevice } = useBentoEditorMode()
    const { enableSave, setEnableSave, updateLayoutInDB } = useLayoutManager()
    const { user } = useAuth()

    function scrollUp() {
        window.scrollBy({
            top: -250, // Negative value to scroll up
            left: 0,
            behavior: 'smooth' // Smooth scroll effect
        });
    }

    function scrollDown() {
        window.scrollBy({
            top: 250, // Positive value to scroll down
            left: 0,
            behavior: 'smooth' // Smooth scroll effect
        });
    }

    return (
        <>
            <div className="fixed left-4 bottom-4 flex flex-col gap-3 z-[9999]">
                <BiUpArrow onClick={() => scrollUp()} className="hover:bg-[#303030] border-2 border-white bg-black rounded-full p-1.5" size={50} color="white" />
                <BiDownArrow onClick={() => scrollDown()} className="hover:bg-[#303030] border-2 border-white bg-black rounded-full p-1.5" size={50} color="white" />
            </div>
            <div className="shadow-[0px_0px_10px_black] border border-white rounded-bl-xl rounded-tl-xl py-2 fixed right-0 bottom-4 px-3 z-[9997] bg-black flex flex-col  gap-4">


                <div>
                    <Tabs
                        defaultValue="desktop"
                        value={editorDevice}
                        onValueChange={(value) => setEditorDevice(value)}
                        className="">
                        <TabsList className='bg-black border border-[#808080]'>
                            <TabsTrigger value="mobile"><HiOutlineDevicePhoneMobile size={20} color={`${editorDevice == 'mobile' ? 'black' : 'white'}`} /></TabsTrigger>
                            <TabsTrigger value="desktop"><MdMonitor size={20} color={`${editorDevice == 'desktop' ? 'black' : 'white'}`} /> </TabsTrigger>
                        </TabsList>

                    </Tabs>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className='border bg-[#4897ff] border-[#808080] w-fit' onClick={() => { updateLayoutInDB(user.uid) }} disabled={!enableSave}><FaSave /></Button>
                            </TooltipTrigger>
                            <TooltipContent className='bg-black'>
                                <p>Save Layout</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <UserNavbar />
                </div>
            </div>
        </>
    )
}