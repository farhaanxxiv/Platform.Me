import Image from "next/image";

export default function BentoImage({ img }) {

    function isValidImageURL(url) {
        const imageURLPattern = /\.(jpeg|jpg|gif|png|webp|svg)$/i;
        try {
            const parsedUrl = new URL(url);
            return imageURLPattern.test(parsedUrl.pathname);
        } catch (err) {
            return false;
        }
    }
    img.cover = 'cover'

    console.log('Rendering Bento Image')


    return (
        <>
            <Image
                fill={true}
                src={isValidImageURL(img.src) ? img.src : '/next.svg'}
                className={`${img.cover == undefined || img.cover == '' || img.cover == 'contain' ? 'object-contain' : 'object-cover'} rounded-3xl`}
            />
        </>
    )
}