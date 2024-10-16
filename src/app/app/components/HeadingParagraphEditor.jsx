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

    function handleChange(e) {
        const newText = e.currentTarget.value
        setHeading(newText)
    }

    function updateHeading() {
        const finalLayout = userLayout.slice()

        for (let i = 0; i < finalLayout.length; i++) {
            if (finalLayout[i].id == section.id) {
                finalLayout[i].heading = heading;
                finalLayout[i].paragraph = paragraphContent;
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

            <RichTextEditor
                content={paragraphContent}
                onChange={(content) => setParagraphContent(content)}
            />

            <Button onClick={() => updateHeading()} className='mt-2 ml-auto w-fit block' variant=''>Save</Button>
        </div>
    )
}
