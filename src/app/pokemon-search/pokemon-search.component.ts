import { Component, OnInit, HostListener } from '@angular/core';
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
  offset = 0;
  limit = 40;
  loading = false;

  totalItems: number = 1000;
  itemsPerPage: number = 50;
  currentPage: number = 1;

  constructor(private service: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.loading
    ) {
      this.fetchPokemons();
    }
  }

  fetchPokemons() {
    this.loading = true;
    this.service.getPokemons(this.offset, this.limit).subscribe({
      next: (pokemons) => {
        this.pokemonArray = pokemons.results.slice(0, 1000);
        this.fetchedArray = pokemons.results.slice(0, 1000);
        this.offset += this.limit;
        this.loading = false;
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

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return this.pokemonArray.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
