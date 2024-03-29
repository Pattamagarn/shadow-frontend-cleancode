import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

const Banner = ({ children: banner }) => {
    const autoSlide = false
    const autoSlideInterval = 3000
    const [currentBanner, setCurrentBanner] = useState(0)

    const prev = () => {
        setCurrentBanner((currentBanner) => (currentBanner === 0 ? banner.length - 1 : currentBanner - 1))
    }

    const next = () => {
        setCurrentBanner((currentBanner) => (currentBanner === banner.length - 1 ? 0 : currentBanner + 1))
    }

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [autoSlide])


    return (
        //1152px x 480px
        <div>
            <div className='lg:hidden md:flex sm:hidden relative  max-w-[640px] py-5 mx-auto overflow-hidden max-h-[500px] hidden'>
                <div
                    className='flex transition-transform duration-500 ease-out'
                    style={{ transform: `translateX(-${currentBanner * 100}%)` }}
                >
                    {banner}
                </div>
                <div className='absolute inset-0 flex items-center justify-between p-4'>
                    <button onClick={prev} className='p-1 rounded-full shadow bg-shadow-white/60 text-shadow-grey hover:bg-shadow-white'>
                        <Icon icon={"bxs:left-arrow"} width={40} />
                    </button>
                    <button onClick={next} className='p-1 rounded-full shadow bg-shadow-white/60 text-shadow-grey hover:bg-shadow-white'>
                        <Icon icon={"bxs:right-arrow"} width={40} />
                    </button>

                </div>

                <div className='absolute left-0 right-0 bottom-4'>
                    <div className='flex items-center justify-center gap-2'>
                        {banner.map((_, id) => (
                            <div className={`w-3 h-3 transition-all rounded-full bg-shadow-white ${currentBanner === id ? "p-2" : "bg-opacity-50"}`} key={id} />
                        ))}
                    </div>

                </div>

            </div>
            <div className='relative hidden max-w-[1100px] py-5 mx-auto overflow-hidden max-h-[500px] md:hidden lg:flex sm:hidden'>
                <div
                    className='flex transition-transform duration-500 ease-out'
                    style={{ transform: `translateX(-${currentBanner * 100}%)` }}
                >
                    {banner}
                </div>
                <div className='absolute inset-0 flex items-center justify-between p-4'>
                    <button onClick={prev} className='p-1 rounded-full shadow bg-shadow-white/60 text-shadow-grey hover:bg-shadow-white'>
                        <Icon icon={"bxs:left-arrow"} width={40} />
                    </button>
                    <button onClick={next} className='p-1 rounded-full shadow bg-shadow-white/60 text-shadow-grey hover:bg-shadow-white'>
                        <Icon icon={"bxs:right-arrow"} width={40} />
                    </button>

                </div>

                <div className='absolute left-0 right-0 bottom-4'>
                    <div className='flex items-center justify-center gap-2'>
                        {banner.map((_, id) => (
                            <div className={`w-3 h-3 transition-all rounded-full bg-shadow-white ${currentBanner === id ? "p-2" : "bg-opacity-50"}`} key={id} />
                        ))}
                    </div>

                </div>

            </div>

            <div className='relative  max-w-[450px] py-5 mx-auto overflow-hidden max-h-[500px] md:hidden lg:hidden sm:flex'>
                <div
                    className='flex transition-transform duration-500 ease-out'
                    style={{ transform: `translateX(-${currentBanner * 100}%)` }}
                >
                    {banner}
                </div>
                <div className='absolute inset-0 flex items-center justify-between p-4'>
                    <button onClick={prev} className='p-1 rounded-full shadow bg-shadow-white/60 text-shadow-grey hover:bg-shadow-white'>
                        <Icon icon={"bxs:left-arrow"} width={40} />
                    </button>
                    <button onClick={next} className='p-1 rounded-full shadow bg-shadow-white/60 text-shadow-grey hover:bg-shadow-white'>
                        <Icon icon={"bxs:right-arrow"} width={40} />
                    </button>

                </div>

                <div className='absolute left-0 right-0 bottom-4'>
                    <div className='flex items-center justify-center gap-2'>
                        {banner.map((_, id) => (
                            <div className={`w-3 h-3 transition-all rounded-full bg-shadow-white ${currentBanner === id ? "p-2" : "bg-opacity-50"}`} key={id} />
                        ))}
                    </div>

                </div>

            </div>
        </div>

    )
}

export default Banner;