import React from 'react'
import { TiWeatherStormy } from "react-icons/ti";
import { MdMyLocation } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import SearchBox from "./SearchBox";

type Props = {}

export default function Navbar({ }: Props) {
    return (
        <div className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
            <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
                <div className='flex items-center justify-center gap-2'>
                    <h1 className="text-gray-500 text-3xl">Weather Buddy</h1>
                    <TiWeatherStormy className='text-4xl mt-1 text-blue-800' />
                </div>
                <section className='flex items-center gap-2'>
                    <MdMyLocation className='text-3xl opacity-50 hover:opacity-100 cursor-pointer' />
                    <FaLocationDot className='text-3xl' />
                    <p className="text-slate-900/90 text-sm"> India </p>
                    <div id="search">
                        <SearchBox />
                    </div>
                </section>
            </div>
        </div>
    )
}