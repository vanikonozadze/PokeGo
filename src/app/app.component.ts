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

  ngOnInit(): void {}
}
