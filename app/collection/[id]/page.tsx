import CardMovie from "@/app/components/CardMovie";
import Image from "next/image";

export default async function Collections({ params }: { params: { id: string } }) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const collectionRoute = process.env.NEXT_PUBLIC_COLLECTION;
  const imageRoute = process.env.NEXT_PUBLIC_IMG;

  const collectionfetch = await fetch(
    `${collectionRoute}${params.id}?language=pt-br&${apiKey}`
  );
  const collection = await collectionfetch.json();

  return (
    <div>
      {/* Background Section */}
      <div
        style={{
          backgroundImage: `linear-gradient(to top, #111827 10%, #00000000 80%), url("${imageRoute}original/${collection.backdrop_path}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex flex-col justify-end min-h-[60vh] w-full text-white"
      >
        <div className="flex flex-col items-center md:flex-row gap-6 p-6">
          {/* Poster */}
          <Image
            src={`${imageRoute}w500${collection.poster_path}`}
            alt={collection.name}
            width={220}
            height={320}
            className="rounded-lg shadow-lg"
          />

          {/* Title and Overview */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">{collection.name}</h2>
            {collection.overview && (
              <p className="text-sm sm:text-base text-zinc-300 mt-2">
                {collection.overview}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Movie Parts */}
      <div className="p-6 bg-gray-900">
        <h3 className="text-xl font-bold text-white mb-4">Filmes na Coleção</h3>
        <div className="flex gap-4 items-center justify-center flex-wrap">
          {collection.parts.map((part: any) => (
            <div key={part.id} className="flex-shrink-0 w-[130px] mx-2 mt-4">
                <CardMovie
                movieId={part.id}
                title={part.title}
                poster={part.poster_path}
                rating={part.vote_average}
                />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
