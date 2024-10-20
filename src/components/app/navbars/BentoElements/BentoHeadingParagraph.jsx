import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BentoHeadingParagraph({ section }) {
    const heading = section.heading;
    const richParagraph = section.paragraph;
    const buttonText = section.button_text;
    const buttonLink = section.button_link;

    return (
        <div className="p-5 py-8 border-2 border-black rounded-2xl">
            <h2 className="text-3xl font-semibold">{heading}</h2>
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: richParagraph }}></div>

            {

                (buttonLink != undefined && buttonLink != null && buttonLink != '') &&

                <Link target='_blank' href={buttonLink} className='block ml-auto w-fit'>
                    <Button className='block ml-auto w-fit'>
                        {(buttonText != null && buttonText != '') ? buttonText : 'Open'}
                    </Button>
                </Link>
                                                                                                
            }

        </div >
    );
}