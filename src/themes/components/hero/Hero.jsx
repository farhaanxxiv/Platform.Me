export default function Hero() {

    /*
    __args
    theme - it will have colors
    button - button styling
        

    /*

    /*
    gradient-placement
    pulsating-gradient
    
    */

    const pulsating_gradient = true

    const primaryColor = '#000000'
    const secondaryColor = '#ff8723'

    const alpha = '40'  //opacity of gradient

    const background = {
        background: `radial-gradient(circle at 50% 0%, ${secondaryColor}${alpha},${primaryColor},${primaryColor});`
    }

    const btnPrimary = ''


    return (
        <section className='min-h-[100vh] relative text-white' style={background}>

            <div className="text-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <h1 className=" rounded border-[#505050] font-bold text-5xl md:text-7xl">We Do Things Amazingly</h1>
                <p className="text-lg md:text-xl font-base mt-6">Explore hero gradient designs for inspiration</p>
                <div className="mt-10 flex flex-col md:flex-row justify-center gap-3">
                    <button style={{ backgroundColor: secondaryColor }} className={`text-black font-semibold py-1 px-6`}>Learn More</button>
                    <button style={{ backgroundColor: 'white' }} className={`text-black font-semibold py-1 px-6`}>Documentataion</button>

                </div>

            </div>


        </section>
    )

}