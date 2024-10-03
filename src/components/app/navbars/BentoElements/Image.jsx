import Image from "next/image";
import placeHolder from '../../../../../public/assets/images/placeholder-image.jpg'

export default function BentoImage({ img }) {
    const imageUrl = isValidImageURL(img.src) ? img.src : placeHolder;

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
        backgroundImage: `url(${imageUrl})`, // Use the same image URL for background
    };

    const foregroundStyle = {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    async function isValidImageURL(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' }); // Fetch only headers
            const contentType = response.headers.get('Content-Type');

            // Check if the content type indicates an image
            return contentType.startsWith('image/');
        } catch (error) {
            console.error('Error fetching the URL:', error);
            return false;
        }
    }

    img.cover = img.cover || 'contain';

    return (
        <div style={containerStyle} className="rounded-3xl border-2 border-solid border-black shadow-[3px_3px_black]">
            <div style={backgroundStyle}></div>
            <div style={foregroundStyle}>
                <Image
                    fill={true}
                    src={imageUrl} // Use the same image URL for src
                    className={`object-${img.cover}`} // Set cover style dynamically
                />
            </div>
        </div>
    );
}
