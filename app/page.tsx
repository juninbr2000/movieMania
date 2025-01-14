import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import CardMovie from "./components/CardMovie";
import Destaque from "./components/Destaque";


async function getMovies (category: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const apiRoute = process.env.NEXT_PUBLIC_API

  const Response = await fetch(`${apiRoute}${category}?language=pt-br&include_adult=false&${apiKey}`)
  const Data = await Response.json()

  return Data.results
}

export default async function Home() {
  const popularMovies = await getMovies("movie/popular")
  const RatedMovies = await getMovies("movie/top_rated")
  const upComing = await getMovies("movie/upcoming")
  const trendingMovies = await getMovies("trending/movie/week")
  const ImageURL = process.env.NEXT_PUBLIC_IMG;

  console.log(trendingMovies)

  return (
    <div className="px-2 py-4">
      <Destaque tipo='destaque' backdrop={trendingMovies[0].backdrop_path} title={trendingMovies[0].title} overview={trendingMovies[0].overview} id={trendingMovies[0].id}/>
      <h2 className="font-bold text-2xl capitalize">Filmes popular</h2>
      <div className="flex flex-row overflow-x-auto space-x-0.5 scrollbar-hide mb-6">
        {popularMovies && popularMovies.map((movies: any) => (
          <div key={movies.id} className="flex-shrink-0 w-[130px] mx-2 mt-4">
            <CardMovie movieId={movies.id} title={movies.title} poster={movies.poster_path} rating={movies.vote_average}/>
          </div>
        ))}
      </div>
      <h2 className="font-bold text-2xl capitalize">Mais avaliados</h2>
      <div className="flex flex-row overflow-x-auto space-x-0.5 scrollbar-hide mb-4">
        {RatedMovies && RatedMovies.map((movies: any) => (
          <div key={movies.id} className="flex-shrink-0 w-[130px] mx-2 mt-4">
            <CardMovie movieId={movies.id} title={movies.title} poster={movies.poster_path} rating={movies.vote_average}/>
          </div>
        ))}
      </div>
      <h2 className="font-bold text-2xl capitalize">Lançamentos</h2>
      <div className="flex flex-row overflow-x-auto space-x-0.5 scrollbar-hide mb-4">
        {upComing && upComing.map((movies: any) => (
          <div key={movies.id} className="flex-shrink-0 w-[130px] mx-2 mt-4">
            <CardMovie movieId={movies.id} title={movies.title} poster={movies.poster_path} rating={movies.vote_average}/>
          </div>
        ))}
      </div>
      <h2 className="font-bold text-2xl capitalize">Tendencias da semana</h2>
      <div className="flex flex-row overflow-x-auto space-x-0.5 scrollbar-hide mb-24">
        {trendingMovies && trendingMovies.map((movies: any) => (
          <div key={movies.id} className="flex-shrink-0 w-[130px] mx-2 mt-4">
            <CardMovie movieId={movies.id} title={movies.title} poster={movies.poster_path} rating={movies.vote_average}/>
          </div>
        ))}
      </div>

    </div>
  );
}
