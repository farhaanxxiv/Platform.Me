export default function MainHeader({ page }) {

    return (

        <section className="py-4 px-0 top-12 px-4 left-0 right-0  ">
            <div className="space-y-4 gap-1">
                <h1 className="bg-white w-fit p-2 border-black border-solid border rounded-xl shadow-[2px_2px_black] my-auto leading-normal font-bold text-2xl md:text-4xl">{page.page_name}</h1>
                <h4 className="bg-white w-fit p-2 border-black border-solid border rounded-xl shadow-[2px_2px_black] text-md font-semibold my-auto">{page.page_tagline}</h4>
            </div>
        </section>
    )

}

