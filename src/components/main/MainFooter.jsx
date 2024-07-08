import config from "../../../config";

export default function MainFooter() {
    return (
        <section className="pt-0">
            <p className="w-fit mx-auto text-xs font-medium text-center text-black p-3 px-4 rounded-full border-2 border-solid border-black shadow-[3px_3px_black]">Create Your Own Page at <a className="hover:translate-y-2 transition-all border-b border-solid font-bold" href={config.WEBSITE_URL}>{config.DOMAIN_URL}</a> </p>
        </section>
    )
}