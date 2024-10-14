import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';
// import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  serchCountryByAlphaCode(alphaCode: string) : Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${alphaCode}`;

    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(error => {
        console.log('Error:', error);
        return of(null); // Al tener un error, devolvemos un arreglo vacío de tipo observable
      })
    );
  }

  searchCapital(term: string) : Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error => {
        console.log('Error:', error);
        return of([]); // Al tener un error, devolvemos un arreglo vacío de tipo observable
      })
    );
  }

  searchCountry(term: string) : Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;

    return this.http.get<Country[]>(url)
    .pipe(
      catchError( error => {
        console.log('Error => ', error);
        return of([]);
      })
    )
  }

  searchRegion(region: string) : Observable<Country[]>
  {
    const url = `${this.apiUrl}/region/${region}`;

    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error => {
        console.log('Error => ', error);

        return of([]);
      })
    )
  }


}
