import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit, OnDestroy {
  public countries: Country[] = [];
  public initialValue: string = '';
  private searchCountrySubscription?: Subscription;
  public isLoading: boolean = false;

  constructor(private countryService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountries.countries;
    this.initialValue = this.countryService.cacheStore.byCountries.term;
    console.log('initialValue', this.initialValue);
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.searchCountrySubscription?.unsubscribe();
  }


  seachByCountry(term: string): void {
    this.isLoading = true;

    this.searchCountrySubscription = this.countryService
    .searchCountry(term)
    .subscribe((countriesResponse) => {
      this.countries = countriesResponse;
      this.isLoading = false;
    });
  }
}
