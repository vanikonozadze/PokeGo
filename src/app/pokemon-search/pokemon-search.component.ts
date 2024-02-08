import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css'],
})
export class PokemonSearchComponent implements OnInit {
  title = 'PokeGo';
  pokemonArray: any[] = [];
  fetchedArray: any[] = [];
  pokemonImageUrlArray: string[] = [];
  searchItem: string = '';

  constructor(private service: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  fetchPokemons() {
    this.service.getPokemons().subscribe({
      next: (pokemons) => {
        this.pokemonArray = pokemons.results.slice(0, 30);
        this.fetchedArray = pokemons.results.slice(0, 30);
        this.fetchPokemonImages();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchPokemonImages() {
    this.pokemonArray.forEach((pokemon, index) => {
      this.service.onPokemon(index + 1).subscribe({
        next: (resp) => {
          this.pokemonArray[index].imageUrl = resp.sprites.front_default;
          this.pokemonArray[index].type = [];
          for (let i = 0; i < resp.types.length; i++) {
            this.pokemonArray[index].type.push(resp.types[i].type.name);
          }
        },
      });
    });
  }

  filterPokemons(): void {
    if (this.searchItem) {
      this.pokemonArray = this.fetchedArray.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(this.searchItem.toLowerCase())
      );
    } else {
      this.pokemonArray = this.fetchedArray;
    }
  }

  selectedPokemon(id: number) {
    this.service.onPokemon(id + 1).subscribe({
      next: (resp) => {
        for (let i = 0; i < resp.types.length; i++) {}
      },
    });
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
