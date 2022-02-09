/* eslint-disable*/
import { useEffect, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';

import { PokemonDetailsResponse } from '../interfaces/pokemonInterfaces';


export const usePokemonDetails = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonDetailsResponse>({} as PokemonDetailsResponse);

  const loadPokemon = async () => {
    const resp = await pokemonApi.get<PokemonDetailsResponse>(`https://pokeapi.co/api/v2/pokemon/${ id }`);
    setPokemon(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {
    isLoading,
    pokemon,
  };
};
