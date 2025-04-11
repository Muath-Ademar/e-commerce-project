import { ArrowRightIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Navbar from '../../../components/Navbar'
import Image from 'next/image'

const page = () => {
    return (
        <>
            {/* hero section */}

            <div className='bg-[#FFF0E3] h-174.5 '>
                <Navbar />
                <div className="text-center mt-16 px-4">
                    <h1 className='text-4xl md:text-5xl font-semibold text-black'>
                        Fashionable, quality, durable and best <br />
                        clothes for everyone
                    </h1>

                    <div className='flex justify-center mt-18'>
                        <button className='flex items-center gap-2 bg-[#D99655] text-white px-6 py-2 rounded-md hover:bg-[#c67d3b] transition'>
                            SHOP NOW
                            <ArrowRightIcon className='w-5 h-5' />
                        </button>
                    </div>
                </div>
                <div className='flex justify-center gap-20 mt-20'>
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

            {/* Featured Collection */}
            <div className='h-auto mx-12 my-15'>
                <h1 className='text-center text-black font-semibold text-3xl mb-5'>Featured Collection</h1>
                <p className='text-center text-gray-600 mb-8 text-base'>
                    Browse through our top categories for every style and season.
                </p>
                <div className='grid grid-cols-4 gap-12'>
                    {[
                        {
                            src: '/images/1_b68e6977-de25-4e06-a361-c46195beced9.jpg',
                            category: 'Shoes'
                        },
                        {
                            src: '/images/EVERYTRACKSUIT3_e13b895c-4342-4631-a98b-b4281115fdda_600x.webp',
                            category: 'Tracksuits'
                        },
                        {
                            src: '/images/10e85528101b48bb8ab19da432a30738.webp',
                            category: 'Tracksuit bootoms'
                        },
                        {
                            src: '/images/23228282-3.avif',
                            category: 'Shorts'
                        },
                    ].map((item, index) => (
                        <div key={index} className='text-center'>
                            <div className='h-130 w-105 overflow-hidden'>
                                <img
                                    src={item.src}
                                    alt={item.category}
                                    className='w-full h-full object-fill hover:scale-110 transition-transform duration-300'
                                />
                            </div>
                            <h2 className='text-lg font-medium mt-3 text-black'>{item.category}</h2>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center mt-5'>
                    <button className='text-[#D99655] border border-[#D99655] px-6 py-2 w-48 hover:bg-[#D99655] hover:text-white transition'>
                        View More
                    </button>
                </div>
            </div>
                    

        </>
    )
}

export default page
