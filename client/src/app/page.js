import { ArrowRightIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Image from 'next/image'

export default function Home() {
return (
        <>
            {/* hero section */}

            <div className='bg-[#FFF0E3] h-174.5 pt-[65px]'>
                
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
                            src="/images/696334e4-db0a-4d8a-a847-27b776fd096f-removebg-preview.png"
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
                            src="/images/UltraShortLadiesFitRoyal_510x@2x.webp"
                            alt="Image 3"
                            width={500}
                            height={500}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className='bg-[#84BFE1] w-50 h-70'>
                        <Image
                            src="/images/freepik__the-style-is-candid-image-photography-with-natural__92589.png"
                            alt="Image 4"
                            width={500}
                            height={500}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Featured Collection */}
            <div className='h-auto mx-42 my-15'>
                <h1 className='text-center text-black font-semibold text-3xl mb-5'>Featured Collection</h1>
                <p className='text-center text-gray-600 mb-8 text-base'>
                    Browse through our top categories for every style and season.
                </p>
                <div className='grid grid-cols-4'>
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
                            <div className='h-120 w-95 overflow-hidden'>
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
            <div className="w-full border-b border-b-[#504C48]-500 my-4"></div>

            {/* new arrivals section */}

            <div className='h-auto mx-70 my-15'>
                <h1 className='text-center text-black font-semibold text-3xl mb-5'>Our 2025 new arrivals</h1>
                <p className='text-center text-gray-600 mb-8 text-base'>
                    Discover the latest trends just dropped for the new year.
                </p>
                <div className='grid grid-cols-3 gap-6'>
                    {[
                        {
                            src: '/images/man-posing-stairs-while-wearing-athletic-wear_23-2148773866.jpg',
                            category: 'Performance Running Set | $79.99'
                        },
                        {
                            src: '/images/vertical-shot-handsome-male-sportswear-posing-front-camera_665346-149586.jpg',
                            category: 'ProFit Training Hoodie | $59.99'
                        },
                        {
                            src: '/images/portrait-young-soccer-player.jpg',
                            category: 'Adidas football Tracksuit | $49.99'
                        },

                    ].map((item, index) => (
                        <div key={index} className='text-center'>
                            <div className='h-130 w-100 overflow-hidden'>
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

            {/*limited time offer section*/}
            <div className='bg-[#1E1C1A] h-147 w-full '>
                <div className='pt-16 flex items-center justify-around gap-12'>
                    <div className=" text-white p-6 space-y-2 font-poppins">
                        <p className="text-sm tracking-wide">1 June - 10 June 2022</p>

                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2">
                            LIMITED TIME OFFER
                            <span className="text-[#D99655] text-2xl">✨</span>
                        </h1>

                        <h2 className="text-lg md:text-xl font-medium">
                            Get 20% off on every product
                        </h2>

                        <p className="text-sm md:text-base text-gray-300">
                            Spend minimal $100 get 30% off voucher code for your next purchase
                        </p>
                    </div>
                    <button className='flex items-center gap-2 bg-[#D99655] text-white px-6 py-2 rounded-md hover:bg-[#c67d3b] transition'>
                        SHOP NOW
                        <ArrowRightIcon className='w-5 h-5' />
                    </button>
                </div>
                <div className='flex justify-center space-x-8 mt-25 items-end'>
                    <div className='bg-[#F5F3F6] h-60 w-40 flex items-center justify-center transform transition duration-300 hover:rotate-6'>
                        <Image src='/images/88a5c5aa-9b25-4fa3-a8c2-5c8dfaff8696-removebg-preview.png' alt='Shoe 1' height={200} width={200} className='object-contain' />
                    </div>
                    <div className='bg-[#F5F3F6] h-48 w-40 mt-10 flex items-center justify-center transform transition duration-300 hover:rotate-6 '>
                        <Image src='/images/sport-jacket-clothing-removebg-preview.png' alt='Shoe 2' height={200} width={200} className='object-contain' />
                    </div>
                    <div className='bg-[#F5F3F6] h-60 w-40 flex items-center justify-center transform transition duration-300 hover:rotate-6 '>
                        <Image src='/images/apoc-mabttrn20001-grm-a_1-removebg-preview.png' alt='Shoe 3' height={200} width={200} className='object-contain' />
                    </div>
                    <div className='bg-[#F5F3F6] h-48 w-40 mt-10 flex items-center justify-center transform transition duration-300 hover:rotate-6 '>
                        <Image src='/images/71bqflNC9ZL._SS1000_.png' alt='Shoe 4' height={200} width={200} className='object-contain' />
                    </div>
                    <div className='bg-[#F5F3F6] h-60 w-40 flex items-center justify-center transform transition duration-300 hover:rotate-6 '>
                        <Image src='/images/WhiteHoodie.png' alt='Shoe 5' height={200} width={200} className='object-contain' />
                    </div>
                    <div className='bg-[#F5F3F6] h-48 w-40 mt-10 flex items-center justify-center transform transition duration-300 hover:rotate-6 '>
                        <Image src='/images/Adobe Express - file.png' alt='Shoe 6' height={200} width={200} className='object-contain' />
                    </div>
                </div>



            </div>
            {/* trending brands section */}
            <div className='mt-30 mb-45'>

                <div className='text-center'>
                    <h1 className='text-black text-2xl md:text-4xl font-extrabold tracking-tight'>OUR TRENDING BRANDS</h1>
                </div>
                <div className='flex justify-center gap-4 mt-9'>
                    <div className='w-60 h-45 bg-[#F6F6F8]'><Image src='/images/nike-4-logo-png-transparent.png' alt='Shoe 1' height={200} width={200} className='object-contain mx-5' /></div>
                    <div className='w-60 h-45 bg-[#F6F6F8]'><Image src='/images/adidas-logo.png' alt='Shoe 1' height={200} width={200} className='object-contain mx-5' /></div>
                    <div className='w-60 h-45 bg-[#F6F6F8]'><Image src='/images/Reebok-Logo-black-white.png' alt='Shoe 1' height={200} width={200} className='object-contain mx-5' /></div>
                    <div className='w-60 h-45 bg-[#F6F6F8] flex items-center'><Image src='/images/Puma-logo-PNG-Transparent-Background.png' alt='Shoe 1' height={200} width={200} className='object-contain mx-5' /></div>
                    <div className='w-60 h-45 bg-[#F6F6F8]'><Image src='/images/Under-Armour-Logo.png' alt='Shoe 1' height={200} width={200} className='object-contain mx-5' /></div>
                </div>
            </div>

            {/* visited our instagram section */}
            <div className="mt-30 bg-[#FFF0E3] pt-10 h-210">
                <div className="text-black text-center gap-11 mr-4 mt-10">
                    <h1 className="font-extrabold tracking-tight text-3xl">VISIT OUR INSTAGRAME</h1>
                    <p className="underline">@akg_fashion</p>
                </div>

                <div className="flex justify-center space-x-7 mt-14">
                    {/* Left Image (Tall + Narrow) */}
                    <div className="relative w-[370px] h-[409px] mt-[153px]">
                        <Image
                            src="/images/assets_task_01jrngt03aefnr3rzxmmx075p1_img_0 1.png"
                            alt="football boots"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Right Image (Wide + Short) */}
                    <div className="relative w-[770px] h-[562px]">
                        <Image
                            src="/images/Rectangle 22.png"
                            alt="tracksuites"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>



        </>
    )
}

