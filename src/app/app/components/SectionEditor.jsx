import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { useSectionEditor } from "@/providers/SectionEditorProvider"
import ImageEditor from "./ImageEditor"
import FormEditor from "./FormEditor"
import { useAtom } from "jotai"
import { currentSelectedSection, currentUserLayout } from "@/states/ui_state"
import SocialEditor from "./SocialEditor"


export default function SectionEditor() {

    const [userLayout, updateCurrentLayout] = useAtom(currentUserLayout)
    const [userSelectedSection, updateUserSelectedSection] = useAtom(currentSelectedSection)

    const { sectionEditorOpen, toggleSectionEditor, closeSectionEditor } = useSectionEditor()


    function deleteSection(sectionID) {

        // ID to be deleted
        const copyLayout = userLayout

        // Filtering out the JSON object with the specific ID
        const layoutAfterDeletion = copyLayout.filter(obj => obj.id !== sectionID);

        updateCurrentLayout(layoutAfterDeletion)
    }

    return (
        <>
            <Sheet className=' overflow-y-scroll ' open={sectionEditorOpen} onOpenChange={toggleSectionEditor}>
                <SheetContent className='py-4 overflow-y-scroll '>

                    <SheetTitle className='uppercase'>{userSelectedSection.type}</SheetTitle>
                    <SheetDescription className='text-black'>
                        {
                            userSelectedSection.type == 'image' ?
                                <ImageEditor section={userSelectedSection} />
                                : userSelectedSection.type == 'form' ?
                                    <FormEditor section={userSelectedSection} />
                                    : userSelectedSection.type == 'social' ?
                                        <SocialEditor section={userSelectedSection} />
                                        : <p>No Section Selected</p>
                        }


                        <Button
                            onClick={() => { deleteSection(userSelectedSection.id); closeSectionEditor() }}
                            variant='destructive'
                            className='w-full mt-3'>Delete Section</Button>

                    </SheetDescription>
                </SheetContent>
            </Sheet>

        </>
    )

}