import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa'

type movieType = {
    movieId: string,
    title: string,
    poster: string,
    rating: number
}

const CardMovie = ({movieId, title, poster, rating}: movieType) => {

    const MovieURL = process.env.NEXT_PUBLIC_IMG;

  return (
    <Link href={`/movie/${movieId}`} className='relative'>
        <Image src={`${MovieURL}w500/${poster}`} alt={title} width={120} height={160} className='rounded-md' />
        <p className='flex items-center gap-1 absolute bottom-0 right-2.5 z-10 rounded-tl-lg rounded-br-md bg-yellow-400 px-2 text-black'><FaStar /> {rating.toFixed(1)}</p>
    </Link>
  )
}

export default CardMovie