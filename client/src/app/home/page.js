import { ArrowRightIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Navbar from '../../../components/Navbar'
import Image from 'next/image'

const page = () => {
    return (
        <>
            {/* hero section */}

            <div className='bg-[#FFF0E3] h-185 '>
                <Navbar />
                <div className="text-center mt-16 px-4">
                    <h1 className='text-4xl md:text-5xl font-semibold text-black'>
                        Fashionable, quality, durable and best <br />
                        clothes for everyone
                    </h1>

                    <div className='flex justify-center mt-8'>
                        <button className='flex items-center gap-2 bg-[#D99655] text-white px-6 py-2 rounded-md hover:bg-[#c67d3b] transition'>
                            SHOP NOW
                            <ArrowRightIcon className='w-5 h-5' />
                        </button>
                    </div>
                </div>
                <div className='flex justify-center gap-20 mt-30'>
                    <div className='bg-[#edbeea] w-50 h-50 mt-20'>
                        <Image
                            src="/images/360_F_439600528_2FWTMQDiXYv6T0qolS57KSxiNbqlhDTa.png"
                            alt="Image 1"
                            width={500} // You can change this based on your layout needs
                            height={500} // Optional — just for intrinsic sizing
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className='bg-[#B3E140] w-50 h-70'>
                        <Image
                            src="/images/sweater-with-pants-isolated_1218049-13290.png"
                            alt="Image 2"
                            width={500}
                            height={500}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className='bg-[#EDCC8B] w-50 h-45 mt-25'>
                        <Image
                            src="/images/freepik__the-style-is-candid-image-photography-with-natural__92589.png"
                            alt="Image 3"
                            width={500}
                            height={500}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className='bg-[#84BFE1] w-50 h-70'>
                        <Image
                            src="/images/UltraShortLadiesFitRoyal_510x@2x.webp"
                            alt="Image 4"
                            width={500}
                            height={500}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
