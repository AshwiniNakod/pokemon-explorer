"use client";
import { useEffect, useState } from "react";
import PokemonCard from 'components/pokemonCard';


export default function Home() {
  const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState("");
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null)

    console.log("pokemons:",pokemons)
  async function fetchPokemons() {
    try {
      const result = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await result.json();
      // const allUrls = data.results.map((onePokemon) => onePokemon.url); // Collect URLs first

      const detailResponsesData = await Promise.all(
        data.results.map(async(currPokemon)=>{
          const res = await fetch(currPokemon.url)
          const data = await res.json();
          return { data, url: currPokemon.url };            
        })
      )
      console.log("detailResponsesData",detailResponsesData)

      setPokemons(detailResponsesData);
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(error)
    }
  }
useEffect(() => {
      fetchPokemons();
  },[])
  
  if (loading) {
    return(
      <div>
        <h1>Loadding...</h1>
      </div>
    )
  }
  if (error) {
    return(
      <div>
        <h1>{error.message}</h1>
      </div>
    )
  }
  const filteredPokemons = pokemons.filter((p) =>
    // console.log("P:",p.data.name)
    p.data.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className=''>
          <h1 className="text-3xl font-bold text-center p-0.5">
            Pokemon list
          </h1>
          <input
            type="text"
            placeholder="Search Pokémon"
            className="block  border p-1 rounded-md mx-auto m-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          
         <div className="grid grid-cols-3 gap-4  s-4 p-8 m-2 ">
         {filteredPokemons.map((pokemon) => (
                  <PokemonCard key= {pokemon.data.name} pokemon={pokemon.data} urls={pokemon.url}/>
            ))}
         </div>
        </div>
  );
}
