import { Pokemon, PokemonPage } from "@/models/Pokemon";
import { axiosInstance } from "./axiosInstance";

export async function getPokemon(name: string) {
  const delay = Math.random() * 2000;

  await new Promise((r) => setTimeout(r, delay));

  const response = await axiosInstance.get<Pokemon>("/pokemon/" + name);
  console.log(name, response.data);
  return response.data;
}

export async function getPokemonPage(page: number) {
  const pageSize = 12;
  const response = await axiosInstance.get<PokemonPage>(
    `/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`
  );
  return response.data;
}

export async function setNickname(pokemon: Pokemon, nickname: string) {
  return { ...pokemon, name: nickname };
}
