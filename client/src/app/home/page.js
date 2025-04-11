import { ArrowRightIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Navbar from '../../../components/Navbar'

const page = () => {
    return (
        <>
            {/* hero section */}

            <div className='bg-[#FFF0E3] h-185 pt-4 '>
                <Navbar  />
                <h1 className='text-5xl text-black text-center mt-21 '>Fashionable, quality, durable and best <br />clothes for everyone</h1>
                <div className='flex justify-center'>
                    <button className=' flex justify-between text-white w-30 items-center bg-[#D99655] py-2 px-2 mt-10 text-sm'>SHOP NOW <ArrowRightIcon className='w-6' /></button>
                </div>
                <div className='flex justify-center gap-20 mt-30'>
                    <div className='bg-[#edbeea] w-50 h-50 mt-20'>
                        <img 
                            src="\images\360_F_439600528_2FWTMQDiXYv6T0qolS57KSxiNbqlhDTa.png" 
                            alt="Image 1" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className='bg-[#B3E140] w-50 h-70'>
                        <img 
                            src="\images\sweater-with-pants-isolated_1218049-13290.png" 
                            alt="Image 1" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className='bg-[#EDCC8B] w-50 h-45 mt-25'>
                        <img 
                            src="\images\freepik__the-style-is-candid-image-photography-with-natural__92589.png" 
                            alt="Image 1" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className='bg-[#84BFE1] w-50 h-70'>
                        <img 
                            src="\images\UltraShortLadiesFitRoyal_510x@2x.webp" 
                            alt="Image 1" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
