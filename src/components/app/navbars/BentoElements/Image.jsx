import Image from "next/image";

export default function BentoImage({ img }) {

    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    };

    const backgroundStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(20px)',
        transform: 'scale(1.1)', // Slightly enlarge to cover edges
    };

    const foregroundStyle = {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
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
            <div style={containerStyle} className="rounded-3xl border-2 border-solid border-black shadow-[3px_3px_black]">
                <div style={{ ...backgroundStyle, backgroundImage: `url(${img.src})` }}></div>
                <div style={foregroundStyle}>
                    <Image
                        fill={true}
                        src={isValidImageURL(img.src) ? img.src : '/next.svg'}
                        style={{}}
                        className={`${img.cover == undefined || img.cover == '' || img.cover == 'contain' ? `object-contain` : 'object-contain'} `}
                    // `object-contain` : 'object-cover'
                    />
                </div>
            </div >
        </>
    )
}