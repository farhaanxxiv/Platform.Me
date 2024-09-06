import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlobalUtils from "@/utils/GlobalUtils";
import { useAtom } from "jotai";
import { useState } from "react";
import { currentSelectedSection, currentUserLayout } from "@/states/ui_state"
import { toast } from "@/components/ui/use-toast";
import { useLayoutManager } from "@/providers/LayoutManager";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { useSectionEditor } from "@/providers/SectionEditorProvider";
export default function SectionSectionEditor({ section }) {
    const { userLayout, updateUserLayout } = useLayoutManager()
    const { closeSectionEditor } = useSectionEditor()


    const [heading, setHeading] = useState(section.heading)



    function handleChange(e) {
        const newText = e.currentTarget.value
        console.log('newText :', newText);
        setHeading(newText)
    }

    function updateHeading() {

        const finalLayout = userLayout.slice()

        for (let i = 0; i < finalLayout.length; i++) {
            if (finalLayout[i].id == section.id) {
                finalLayout[i].heading = heading

            }
        }

        console.log('Layout After Updating Heading of Section', finalLayout)
        updateUserLayout(finalLayout)
        closeSectionEditor()

    }


    return (

        <div className="">

            <Label>
                Enter Heading Here
                <Input
                    onChange={handleChange}
                    value={heading}
                />
            </Label>

            <Button onClick={() => updateHeading()} className='mt-2 ml-auto w-fit block' variant=''>Save</Button>



        </div>
    )
}