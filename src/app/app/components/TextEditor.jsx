import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlobalUtils from "@/utils/GlobalUtils";
import { useAtom } from "jotai";
import { useState } from "react";
import { currentSelectedSection, currentUserLayout } from "@/states/ui_state"
import { toast } from "@/components/ui/use-toast";
import { useLayoutManager } from "@/providers/LayoutManager";

export default function TextEditor({ section }) {
    const { userLayout, updateUserLayout } = useLayoutManager()

    const [text, setText] = useState(section.text)

    function handleChange(e) {
        const newText = e.currentTarget.value
        console.log('newText :', newText);
        setText(newText)
    }

    function updateText() {

        const finalLayout = userLayout.slice()

        for (let i = 0; i < finalLayout.length; i++) {
            if (finalLayout[i].id == section.id) {
                finalLayout[i].text = text
            }
        }

        console.log('Layout After Updating Text', finalLayout)
        updateUserLayout(finalLayout)

    }


    return (

        <div className="">

            <Label>
                Enter Text Here
                <Input
                    onChange={handleChange}
                    value={text}
                />
            </Label>

            <Button onClick={() => updateText()} className='mt-2 ml-auto w-fit block' variant=''>Save Text</Button>
        </div>
    )
}