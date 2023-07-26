// country-search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';

interface Country {
  name: { common: string };
  capital: string;
}

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.css'],
})
export class CountrySearchComponent implements OnInit {
  searchForm: FormGroup; // Formulario reactivo para la búsqueda
  searchResult: Country[] = [];
  searchError: string | null = null; // Variable para almacenar el mensaje de error

  constructor(private formBuilder: FormBuilder, private countryService: CountryService) {
    // Inicializar el formulario con validaciones de entrada
    this.searchForm = this.formBuilder.group({
      query: ['', Validators.required], // Campo requerido
      queryType: ['name', Validators.required], // Valor predeterminado y campo requerido
    });
  }

  ngOnInit() {}

  // Método para realizar la búsqueda
  search() {
    if (this.searchForm.invalid) {
      this.searchError = 'Debes ingresar un término de búsqueda'; // Mostrar mensaje de error si el formulario es inválido
      this.searchResult = [];
      return;
    }

    const queryControl = this.searchForm.get('query');

    if (!queryControl || queryControl.invalid || !queryControl.touched) {
      this.searchError = 'Debes ingresar un término de búsqueda'; // Mostrar mensaje de error si el control no existe o no ha sido tocado
      this.searchResult = [];
      return;
    }

    const query = queryControl.value;
    const queryType = this.searchForm.get('queryType')?.value;

    // Realizar la búsqueda según el tipo de consulta (name, capital, continent)
    this.countryService.search(queryType, query).subscribe(
      (data) => {
        this.searchResult = data;
        this.searchError = null; // Limpiar mensaje de error si la búsqueda es exitosa
      },
      (error) => {
        console.error(error);
        this.searchError = 'No se encontraron resultados'; // Mostrar mensaje de error si no se encuentran resultados
        this.searchResult = [];
      }
    );
  }

  // Método auxiliar para verificar si mostrar el mensaje de error del control 'query'
  showQueryError(): boolean {
    const queryControl = this.searchForm.get('query');
    return !!queryControl && queryControl.invalid && (queryControl.touched || queryControl.dirty);
  }
}
