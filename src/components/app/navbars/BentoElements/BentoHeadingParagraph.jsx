export default function BentoHeadingParagraph({ section }) {
    const heading = section.heading;
    const richParagraph = section.paragraph;

    return (
        <div className="p-5 py-8 border-2 border-black rounded-2xl">
            <h2 className="text-3xl font-semibold">{heading}</h2>
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: richParagraph }}></div>
        </div>
    );
}