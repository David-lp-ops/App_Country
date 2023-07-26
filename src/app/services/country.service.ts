import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) {}

  // Método para realizar la búsqueda de países por nombre, capital o continente
  search(queryType: string, query: string): Observable<any> {
    switch (queryType) {
      case 'name':
        return this.searchByName(query);
      case 'capital':
        return this.searchByCapital(query);
      case 'continent':
        return this.searchByContinent(query);
      default:
        return new Observable(); // Manejo de consulta inválida (opcional)
    }
  }

  // Métodos de búsqueda por nombre, capital y continente (como en ejemplos anteriores)
  searchByName(name: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'name/' + name);
  }

  searchByCapital(capital: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'capital/' + capital);
  }

  searchByContinent(continent: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'region/' + continent);
  }
}
