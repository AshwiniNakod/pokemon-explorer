"use client";
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
    const pathname = usePathname()
    const parts = pathname.split("/");
    const id = parts[parts.length - 1]; 
    console.log("id:",id); 
    const[pokemon,setPokemon] = useState([])
    const [activeSection, setActiveSection] = useState("stats"); // Default section
    const typeColors = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      grass: "bg-green-500",
      electric: "bg-yellow-400",
      ice: "bg-cyan-400",
      fighting: "bg-orange-600",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-indigo-400",
      psychic: "bg-pink-500",
      bug: "bg-lime-500",
      rock: "bg-gray-600",
      ghost: "bg-indigo-700",
      dragon: "bg-purple-700",
      dark: "bg-gray-800",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
    };
     async function fetchPokemons() {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await res.json();
            // console.log("result:",data.sprites.front_default)
            data.abilities.map((e,i)=>{
              // console.log(e.ability.name)
             
            })
            data.moves.map((e,i)=>{
              // console.log(e.ability.name)
              // console.log("moves:",e.move.name)
            })
            data.stats.map((e,i)=>{
              // console.log(e.ability.name)
              // console.log("stats:",e)
            })
            
            setPokemon(data);
          }
          useEffect(() => {
            fetchPokemons();
          },[id])
          console.log("pokemon:",pokemon)
        return (
          
          <div className="min-h-screen p-5 text-center">
           <div className="p-4 rounded shadow hover:bg-gray-200 text-center cursor-pointer">
              <p className="text-lg font-bold mb-2">
                {pokemon?.name
                  ? pokemon.name.toUpperCase() 
                  : "Loading..."}
              </p>

              <div className="flex justify-around mb-4">
              {["stats", "abilities", "types", "moves"].map((section) => (
                <button
                  key={section}
                  className={`px-4 py-2 rounded-md text-white transition ${
                    activeSection === section ? "bg-blue-500" : "bg-gray-400"
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
      </div>
            { activeSection === "abilities" && (<div className="border border-gray-300 p-4 rounded-md">
                  <h2 className="text-lg font-bold mb-2">Abilities</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {pokemon?.abilities?.map((ability, index) => (
                      <div key={index} className="bg-gray-100 p-2 rounded-md text-center capitalize">
                        {ability.ability.name}
                      </div>
                    ))}
                  </div>
                </div>)}
            {activeSection === "moves" &&( <div className= "max-h-30 overflow-y-auto border border-gray-300 p-2" >
              <h2 className="text-lg font-bold mb-2">Moves</h2>
                <ul>
                  {pokemon?.moves?.map((move, index) => (
                    <li key={index} className="py-1">{move.move.name}</li>
                  ))}
                </ul>
            </div>)}
            { activeSection === "stats" &&(<div className="border border-gray-300 p-4 rounded-md">
                <h2 className="text-lg font-bold mb-2">Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  {pokemon?.stats?.map((stat, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded-md text-center capitalize">
                      <span className="font-semibold">{stat.stat.name}</span>: {stat.base_stat}
                    </div>
                  ))}
                </div>
              </div>)}
            {activeSection === "types" &&(<div className="border border-gray-300 p-4 rounded-md">
              <h2 className="text-lg font-bold mb-2">Types</h2>
              <div className="flex gap-2">
                {pokemon?.types?.map((typeObj, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1 text-white rounded-md capitalize ${typeColors[typeObj.type.name] || "bg-gray-400"}`}
                  >
                    {typeObj.type.name}
                  </span>
                ))}
              </div>
            </div>)}
      </div>
    </div>
        );
}

export default page
