import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
// import { tap } from 'rxjs/operators';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  //Guarda en el local storage
  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  //Carga desde local storage
  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }


  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(() => of([])),
      // delay(2000)
    )
  }

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
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries =>
        this.cacheStore.byCapital = {term, countries}
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountry(term: string) : Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries =>
        this.cacheStore.byCountries = {term, countries}
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion(region: string) : Observable<Country[]>
  {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(regions =>
        this.cacheStore.byRegion = {region: <Region>region, countries: regions}
      ),
      tap(() => this.saveToLocalStorage())
    );
  }


}
