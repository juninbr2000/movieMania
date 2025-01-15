import CardMovie from "@/app/components/CardMovie";
import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaClock, FaStar, FaArrowRight, FaPlus } from "react-icons/fa";


export default async function moviePage({ params }: {params: Promise<{ id: string }>}) {

  const { id } = await params

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;
  const imageRoute = process.env.NEXT_PUBLIC_IMG;

  const movieResponse = await fetch(`${apiRoute}${id}?language=pt-br&${apiKey}`);
  const movie = await movieResponse.json();

  const getRecomends = await fetch(`${apiRoute}${id}/recommendations?language=pt-br&include_adults=false&${apiKey}`)
  const recommendations = await getRecomends.json()

  const getCredits = await fetch(`${apiRoute}${id}/credits?language=pt-br&${apiKey}`)
  const credits = await getCredits.json()

  const getProviders = await fetch(`${apiRoute}${id}/watch/providers?${apiKey}`)
  const providers = await getProviders.json()

  console.log(providers)
  console.log(movie);

  return (
    <div>
      {/* Background Image */}
      <div
         style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 100%), url("${imageRoute}original/${movie.backdrop_path}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]"
      ></div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center md:items-end mt-[-11em] px-4 py-2">
        {/* Poster */}
        <Image
          src={`${imageRoute}w780/${movie.poster_path}`}
          alt={movie.title}
          width={200}
          height={260}
          className="rounded shadow-md w-[200px] sm:w-[220px] md:w-[240px] lg:w-[220px]"
        />

        {/* Movie Details */}
        <div className="text-center md:text-left">
          <div className="mb-2">
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">{movie.title}</h1>
            <h3 className="text-sm sm:text-lg text-zinc-500">{movie.tagline}</h3>
          </div>

          {/* Movie Metadata */}
          <div className="text-zinc-500 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm sm:text-base">
            <p className="flex items-center gap-1">
              <FaCalendar /> {movie.release_date.split("-", 1)}
            </p>
            <p className="flex items-center gap-1">
              <FaClock /> {movie.runtime} min
            </p>
            <p className="flex items-center gap-1">
              <FaStar /> {movie.vote_average.toFixed(1)}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            {movie && movie.genres.map((genero: any) => (
                <p key={genero.id} className="flex gap-1 items-center border-yellow-400 border px-3 py-1 rounded-xl text-sm">
                    {genero.name}
                    <FaPlus />
                </p>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="px-4 py-6 flex flex-col gap-4">
            <h2 className="font-bold text-xl">Descrição</h2>
            <p>{movie.overview}</p>
        </div>

        <div className="flex justify-around mb-10 mt-4">
            <div>
                <h3 className="font-semibold text-lg">Orçamento</h3>
                <p>{movie.budget.toLocaleString('pt-br', {style: 'currency', currency: 'USD'})}</p>
            </div>

            <div>
                <h3 className="font-semibold text-lg">Receita</h3>
                {movie.revenue.toLocaleString('pt-br', {style: 'currency', currency: 'USD'})}
            </div>
        </div>
      </div>
      
      <h2 className="font-bold text-xl ml-3">Elenco</h2>
      <div className="flex flex-row overflow-x-auto space-x-0.5 scrollbar-hide mb-6">
        {credits && credits.cast.map((actor : any) => (
          <div key={actor.id} className="flex-shrink-0 w-[130px] mx-2 mt-4">
            <Image src={`${imageRoute}original${actor.profile_path}`} alt={actor.name} width={100} height={140} className="rounded" />
            <h3 className="font-bold">{actor.name}</h3>
            <p className="text-sm text-gray-500">{actor.character}</p>
          </div>
        ))}
      </div>

      <div className='flex items-center justify-around w-full flex-wrap mt-5'>
        <h2 className="w-full px-3 font-bold text-xl">Diponivel em:</h2>
        {providers && providers.results.BR && providers.results.BR.flatrate.map((assi: any) => (
          <div key={assi.provider_id} className="flex flex-col items-center justify-center mb-5 mt-3">
            <Image src={`${imageRoute}w500${assi.logo_path}`} alt={assi.provider_name} width={50} height={50} className="rounded" />
            <p className="text-sm text-gray-500">{assi.provider_name}</p>
          </div>
        ))}
      </div>

        {movie.belongs_to_collection && <Link href={`/collection/${movie.belongs_to_collection.id}`}
        style={{
            backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url("${imageRoute}original${movie.belongs_to_collection.backdrop_path}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
        className="w-full h-[30vh] flex items-end justify-end px-5 py-3"
    	>
            <p className="flex items-center font-bold text-xl gap-2">
                {movie.belongs_to_collection.name} 
                <span className="bg-opacity-50 bg-black block p-2 rounded-full border-yellow-400 text-yellow-400 border">
                    <FaArrowRight />
                </span>
            </p>
        </Link>}

        {recommendations && <div>
            <h2 className="font-bold text-xl mt-7">Filmes Recomendados </h2>
            <div className="flex flex-row overflow-x-auto space-x-0.5 scrollbar-hide mb-28">
                {recommendations.results.map((rec: any) => (
                    <div key={rec.id} className="flex-shrink-0 w-[130px] mx-2 mt-4">
                        <CardMovie movieId={rec.id} title={rec.title} poster={rec.poster_path} rating={rec.vote_average} />
                    </div>
                ))}   
            </div>
        </div>}
    </div>
  );
}
