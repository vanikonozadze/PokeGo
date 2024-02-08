import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;

  constructor(private route: ActivatedRoute, private service: PokemonService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.service.onPokemon(id).subscribe({
        next: (response) => {
          this.pokemon = response;
          console.log(response);
        },
      });
    });
  }
}
