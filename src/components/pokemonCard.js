// components/PokemonCard.js
import Link from "next/link";

export default function PokemonCard({ pokemon ,urls}) {
    // console.log("CurrentPokemonUrl:",pokemon)
  console.log(urls)
    const id = urls.split("/").filter(Boolean).pop();
    console.log("id:",id); 

  return (
    <Link key={pokemon.name} 
    href={`/detailsPage/${id}`}
    >
      <div className="p-4 rounded shadow hover:bg-gray-200 text-center cursor-pointer border-1 whitespace-normal		">
        <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} className="w-20 h-20 mx-auto" />
        <p className="mt-2 font-bold">{pokemon.name.toUpperCase()}</p>
      </div>
     </Link>
  );
}
