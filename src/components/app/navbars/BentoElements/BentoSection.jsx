export default function BentoSection({ section }) {

    const heading = section.heading

    return (

        <div className="h-full w-full mt-auto relative">
            <h1 className="bg-black text-white rounded-xl px-3 py-3 absolute bottom-0 mt-auto m-0 h-fit text-2xl md:text-5xl border-white border-solid border-2 shadow-[3px_3px_black] font-semibold">{heading}</h1>
        </div>

    )
}