import Image from "next/image"
import Link from "next/link"
import { FaArrowRight, FaStar } from "react-icons/fa"


type typeDestaque = {
    tipo: 'colection' | 'destaque',
    backdrop: string,
    title: string,
    overview?: string,
    id: string
}

export default function Destaque ({tipo, backdrop, title, overview, id}: typeDestaque) {

    const ImageUrl = process.env.NEXT_PUBLIC_IMG

    return (
       <Link href={tipo === 'colection' ? `/collection/${id}` : `/movie/${id}`}  style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url('${ImageUrl}original${backdrop}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
       }}
       className="flex flex-col h-[30vh] mb-6 rounded-lg justify-between items-start px-4 py-2 md:h-[45vh] lg:h-[60vh]"
       >
            <div>
                {tipo === 'destaque' && <h1 className="flex items-center gap-2 w-32 px-4 py-1 rounded-full text-yellow-400 font-bold text-lg bg-slate-900 bg-opacity-70"><FaStar /> Em alta!</h1>}
                <h2 className="mt-4 font-bold text-3xl ml-2">{title}</h2>
                <p className="text-sm text-gray-300 mt-2 line-clamp-3">{overview}</p>
            </div>
            <div className="self-end flex font-bold items-center gap-3">
                <p className="font-bold text-lg">Veja mais</p>
                <span className="bg-gray-900 bg-opacity-50 p-2 rounded-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                    <FaArrowRight />
                </span>
            </div>
       </Link>
    )
}