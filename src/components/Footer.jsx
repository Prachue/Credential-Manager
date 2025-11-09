import React from 'react'

const Footer = () => {
    return (
        <div className='flex items-center flex-col justify-around bg-slate-800 w-full'>
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-700'> &lt;</span>
                <span className='text-white'>CRed</span>
                <span className='text-green-700'> OP/&gt;</span>
            </div>
            <div className='flex gap-2 justify-center text-white text-xl items-center cursor-pointer font-semibold  hover:font-bold'>Created with <img className='w-10 h-10 py-[1px]' src="/icons/heart.png" alt="" srcset="" />By Prachyot Kumar</div>
        </div>
    )
}

export default Footer