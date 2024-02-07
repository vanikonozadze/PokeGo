import { Component } from '@angular/core';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
        this.pokemonArray = pokemons.results.slice(0, 100);
        this.fetchedArray = pokemons.results.slice(0, 100);
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
        console.log(resp);
      },
    });
  }
}
