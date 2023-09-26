export interface PokemonCardResponse {
  name: string;
  url: string;
}

export interface PokemonCardInformation extends PokemonCardResponse {
  id: number;
}

export interface PokemonsResponse {
  data: PokemonCardResponse[];
  count: number;
  hasNext: boolean;
}