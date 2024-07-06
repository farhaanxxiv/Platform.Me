export default function MainHeader({ page }) {

    return (

        <section className="py-4 px-6 fixed top-0 left-0 right-0 border-b border-[#c0c0c0] z-[9999] bg-[#ffffff55] backdrop-blur-md ">
            <div className="flex gap-1">
                <h1 className="my-auto leading-normal font-semibold">{page.page_name}</h1>
                <h4 className="text-xs my-auto">{page.page_tagline}</h4>
            </div>
        </section>
    )

}

