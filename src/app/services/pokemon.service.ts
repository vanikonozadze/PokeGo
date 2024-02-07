import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseApiUrl: string = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl);
  }

  onPokemon(id: number): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/' + id);
  }
}
