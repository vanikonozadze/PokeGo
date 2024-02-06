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
  searchItem: string = '';

  constructor(private service: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  fetchPokemons() {
    this.service.getPokemons().subscribe({
      next: (pokemons) => {
        this.pokemonArray = pokemons.results;
        this.fetchedArray = pokemons.results;
      },
      error: (err) => {
        console.log(err);
      },
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
}
