import { useQuery } from '@tanstack/react-query';
import { getPokemonList, getPokemonDetail } from '../services/pokeApi';

export function usePokemonList(limit = 151) {
  return useQuery({
    queryKey: ['pokemonList', limit],
    queryFn: async () => {
      const list = await getPokemonList(limit);
      // Busca detalhes de cada pokémon em paralelo
      const details = await Promise.all(
        list.results.map(p => getPokemonDetail(p.name))
      );
      return details;
    },
    staleTime: 1000 * 60 * 10, // cache por 10 min
  });
}

export function usePokemonDetail(nameOrId) {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => getPokemonDetail(nameOrId),
    enabled: !!nameOrId,
  });
}