import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseApiUrl: string = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
  constructor(private http: HttpClient) {}

  getPokemons(offset: number, limit: number): Observable<any> {
    const url = `${this.baseApiUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get(url);
  }

  onPokemon(id: number): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/' + id);
  }
}
