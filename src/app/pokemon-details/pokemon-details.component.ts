import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;
  default_button: boolean = true;
  shiny_button: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.service.onPokemon(id).subscribe({
        next: (response) => {
          this.pokemon = response;
        },
      });
    });
  }

  toggleDefault(): void {
    if (this.default_button === true) {
      alert('It is already in default form');
    } else {
      this.default_button = !this.default_button;
      this.shiny_button = !this.shiny_button;
    }
  }

  toggleShiny(): void {
    if (this.shiny_button === true) {
      alert('It is already in shiny form');
    } else {
      this.shiny_button = !this.shiny_button;
      this.default_button = !this.default_button;
    }
  }

  loadPokemonDetails(id: number): void {
    this.service.onPokemon(id).subscribe({
      next: (response) => {
        this.pokemon = response;
      },
    });
  }

  goToNextPokemon(): void {
    let nextPokemonId = Number(this.route.snapshot.params['id']) + 1;
    if (nextPokemonId === 1001) {
      nextPokemonId = 1;
    }
    this.router.navigate(['pokemon', nextPokemonId]);
  }

  goToPreviousPokemon(): void {
    let previousPokemonId = Number(this.route.snapshot.params['id']) - 1;
    if (previousPokemonId === 0) {
      previousPokemonId = 1000;
    }
    this.router.navigate(['pokemon', previousPokemonId]);
  }
}
