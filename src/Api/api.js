import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/";
export const poke = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});
