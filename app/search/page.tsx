"use client";

import { useState } from "react";
import CardMovie from "../components/CardMovie";
import Destaque from "../components/Destaque";

const SearchRoute = process.env.NEXT_PUBLIC_SEARCH;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const SearchCollection = process.env.NEXT_PUBLIC_COLLECTION_SEARCH;

export default function SearchPage() {
  const [query, setQuery] = useState(""); // Guarda o valor da busca
  const [results, setResults] = useState([]); // Guarda os resultados da busca
  const [isLoading, setIsLoading] = useState(false); // Indica se está carregando
  const [error, setError] = useState<string | null>(null); // Guarda erros (se houver)
  const [collection, setCollection] = useState([]); // Guarda coleções encontradas

  const handleSearch = () => {
    if (!query.trim()) return; // Evita buscar se o campo de busca estiver vazio ou apenas espaços

    setIsLoading(true);
    setError(null);

    // Requisição de busca de forma síncrona no cliente
    Promise.all([
      fetch(`${SearchRoute}?query=${query}&language=pt-br&${apiKey}`).then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar os filmes.");
        return res.json();
      }),
      fetch(`${SearchCollection}?query=${query}&language=pt-br&${apiKey}`).then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar as coleções.");
        return res.json();
      }),
    ])
      .then(([moviesData, collectionsData]) => {
        setResults(moviesData.results || []);
        setCollection(collectionsData.results || []);
        console.log(collectionsData)
      })
      .catch((err: any) => {
        setError(err.message || "Erro inesperado.");
      })
      .finally(() => {
        setIsLoading(false);
      });

  };

  return (
    <div className="p-4">
      {/* Campo de busca */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome do filme..."
          className="bg-black border-b-2 border-yellow-400 w-full py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-400 text-white px-2 py-2 rounded mt-2 font-bold"
          disabled={isLoading}
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* Resultados da busca */}
      <div className="mb-20">
        {error && <p className="text-red-500">{error}</p>}

        {/* Exibição das coleções */}
        {collection.length > 0 && (
          <div className="mb-6 flex items-center overflow-auto gap-1">
            {collection.map((col: any) => (
            <div className="w-[90vw] flex-shrink-0">
              <Destaque
                key={col.id}
                tipo="colection"
                backdrop={col.backdrop_path}
                title={col.name}
                id={col.id}
                />
            </div>
            ))}
          </div>
        )}

        {/* Exibição dos filmes */}
        {results.length === 0 && !isLoading && <p>Nenhum resultado encontrado.</p>}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result: any) => (
            <li key={result.id} className="w-[130px] m-auto">
              <CardMovie
                movieId={result.id}
                title={result.title || result.name}
                poster={result.poster_path}
                rating={result.vote_average}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
