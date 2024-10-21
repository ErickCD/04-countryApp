import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit, OnDestroy {
  public countries : Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  private searchRegionSubscription?: Subscription;
  // public initialValue: Region = '';

  constructor(private countriesService: CountriesService) {  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    const initialValue = this.countriesService.cacheStore.byRegion.region;

    if(initialValue !== ''){
      this.selectedRegion = initialValue;
    }
  }

  ngOnDestroy(): void {
    this.searchRegionSubscription?.unsubscribe();
  }

  searchByRegion(term: Region): void {
    this.selectedRegion = term;
    this.searchRegionSubscription = this.countriesService.searchRegion(term)
    .subscribe(
      countries => {
        this.countries = countries;
      }
    )
  }
}
