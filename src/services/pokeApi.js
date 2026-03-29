import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({ baseURL: BASE_URL });

// Busca lista de pokémons com paginação
export const getPokemonList = async (limit = 151, offset = 0) => {
  const { data } = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return data;
};

// Busca detalhes de um pokémon específico (por nome ou ID)
export const getPokemonDetail = async (nameOrId) => {
  const { data } = await api.get(`/pokemon/${nameOrId}`);
  return data;
};

// Busca pokémons por tipo
export const getPokemonByType = async (type) => {
  const { data } = await api.get(`/type/${type}`);
  return data;
};

// Busca todos os tipos disponíveis
export const getAllTypes = async () => {
  const { data } = await api.get('/type');
  return data;
};