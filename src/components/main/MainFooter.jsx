import config from "../../../config";

export default function MainFooter() {
    return (
        <section className="pt-24">
            <p className="w-fit mx-auto text-xs text-center text-white p-3 px-4 rounded-full  bg-black">Create Your Own Page at <a className="hover:translate-y-2 transition-all border-b border-solid" href={config.WEBSITE_URL}>{config.DOMAIN_URL}</a> </p>
        </section>
    )
}