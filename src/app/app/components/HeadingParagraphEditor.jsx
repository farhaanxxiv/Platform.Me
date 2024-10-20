import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useLayoutManager } from "@/providers/LayoutManager";
import { useSectionEditor } from "@/providers/SectionEditorProvider";
import RichTextEditor from "@/components/app/RichTextEditor";

export default function HeadingParagraphEditor({ section }) {

    const { userLayout, updateUserLayout } = useLayoutManager()
    const { closeSectionEditor } = useSectionEditor()

    const [heading, setHeading] = useState(section.heading)
    const [paragraphContent, setParagraphContent] = useState(section.paragraph || '');
    const [buttonLink, setButtonLink] = useState(section.button_link)
    const [buttonText, setButtonText] = useState(section.button_text)

    function handleChange(e) {
        const newText = e.currentTarget.value
        setHeading(newText)
    }

    function handleButtonText(e) {
        const newText = e.currentTarget.value
        setButtonText(newText)
    }

    function handleButtonLink(e) {
        const newLink = e.currentTarget.value
        setButtonLink(newLink)
    }


    function updateHeading() {
        const finalLayout = userLayout.slice()

        for (let i = 0; i < finalLayout.length; i++) {
            if (finalLayout[i].id == section.id) {
                finalLayout[i].heading = heading;
                finalLayout[i].paragraph = paragraphContent;
                finalLayout[i].button_link = buttonLink;
                finalLayout[i].button_text = buttonText;

            }
        }

        updateUserLayout(finalLayout)
        closeSectionEditor()
    }

    useEffect(() => {
        console.log('paragraphContent :', paragraphContent);

    }, [paragraphContent])

    return (
        <div className="">
            <Label>
                Enter Heading Here
                <Input
                    onChange={handleChange}
                    value={heading}
                />
            </Label>


            <Label>
                Enter Button Link
                <Input
                    onChange={handleButtonLink}
                    value={buttonLink}
                />
            </Label>

            <Label>
                Enter Button Text (optional)
                <Input
                    onChange={handleButtonText}
                    value={buttonText}
                />
            </Label>

            <RichTextEditor
                content={paragraphContent}
                onChange={(content) => setParagraphContent(content)}
            />

            <Button onClick={() => updateHeading()} className='mt-2 ml-auto w-fit block' variant=''>Save</Button>
        </div>
    )
}
