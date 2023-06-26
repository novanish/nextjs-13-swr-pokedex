import useSWR from "swr";
import * as PokemonApi from "@/network/pokemon-api";
import { AxiosError } from "axios";

export function usePokemon(name: string) {
  return useSWR(name, async () => {
    try {
      return await PokemonApi.getPokemon(name);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404)
        return null;

      throw error;
    }
  });
}
