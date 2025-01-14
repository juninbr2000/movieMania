import Link from 'next/link'
import React from 'react'
import { FaHome, FaSearch } from 'react-icons/fa'
import { BiMoviePlay } from 'react-icons/bi'

const Navbar = () => {
  return (
    <nav className='fixed bottom-5 flex items-center justify-between z-30 left-[50%] translate-x-[-50%] bg-gray-800 bg-opacity-50 backdrop-blur-md px-8 py-3 rounded-full w-[90vw]'>
        <div>
            <Link href={'/'} className='flex flex-row items-center mr-20'>
                <span className='text-4xl text-yellow-400'>
                <BiMoviePlay />
                </span>
                <p className='text-xl font-bold'>FilMania</p>
            </Link>
        </div>
        <div className='flex gap-8 items-center justify-center'>
            <Link href={'/'} className='flex flex-col items-center'>
                <span  className='text-2xl'>
                    <FaHome /> 
                </span>
                <p className='font-light text-sm'>Inicio</p>
            </Link>
            <Link href={'/search'} className='flex flex-col items-center'>
                <span  className='text-2xl'>
                    <FaSearch /> 
                </span>
                <p className='font-light text-sm'>Buscar</p>
            </Link>  
        </div>
    </nav>
  )
}

export default Navbar