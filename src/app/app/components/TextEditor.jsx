import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlobalUtils from "@/utils/GlobalUtils";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { currentSelectedSection, currentUserLayout } from "@/states/ui_state"
import { toast } from "@/components/ui/use-toast";
import { useLayoutManager } from "@/providers/LayoutManager";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function TextEditor({ section }) {
    const { userLayout, updateUserLayout } = useLayoutManager()

    const [text, setText] = useState(section.text)
    const [bgColor, setBgColor] = useColor(section.bgColor ? section.bgColor : "rgb(0 0 0)");
    const [textColor, setTextColor] = useColor(section.textColor ? section.textColor : "rgb(255 255 255)");

    function handleChange(e) {
        const newText = e.currentTarget.value
        console.log('newText :', newText);
        setText(newText)
    }

    useEffect(() => {
        console.log()
    }, [bgColor, textColor])

    function updateText() {

        const finalLayout = userLayout.slice()

        for (let i = 0; i < finalLayout.length; i++) {
            if (finalLayout[i].id == section.id) {
                finalLayout[i].text = text
                finalLayout[i].bgColor = bgColor.hex
                finalLayout[i].textColor = textColor.hex
            }
        }

        console.log('Layout After Updating Text', finalLayout)
        updateUserLayout(finalLayout)

    }


    return (

        <div className="space-y-6">
            <div>
                <Label>
                    Enter Text Here
                    <Input
                        onChange={handleChange}
                        value={text}
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Background Color
                    <ColorPicker height={100} hideInput={true} color={bgColor} onChange={setBgColor} />
                </Label>
            </div>
            <div>
                <Label>
                    Text Color
                    <ColorPicker height={100} hideInput={true} color={textColor} onChange={setTextColor} />
                </Label>
            </div>
            <Button onClick={() => updateText()} className='mt-2 ml-auto w-fit block' variant=''>Save</Button>
        </div>
    )
}